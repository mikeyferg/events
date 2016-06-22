require 'mechanize'
namespace :scrape do
  desc 'Import events from sfstation.com'
  task sfstation: :environment do

    def process_time(time)
      time.downcase!
      time.gsub!('  ', ' ')
      time.gsub!('noon', '12am')
      time.gsub!(' am', 'am')
      time.gsub!(' pm', 'pm')

      # Find the first number in string
      first_number = time[/\d+/]
      return nil unless first_number
      return "#{first_number.to_i - 12}pm" if first_number.to_i > 12

      # Find next character after founded number
      position_of_number = time.index(first_number)
      next_symbol = time[(position_of_number + first_number.size)]

      # Detect H:MM time
      if next_symbol == ':'
        minutes = time[/:\d+/]
        first_number = "#{first_number}#{minutes}" if minutes

        # Remove all characters except numbers and letters
        time.tr('^a-z0-9:', '')
      else
        # Remove all characters except numbers and letters
        time.tr('^a-z0-9', '')
      end

      # Find two next characters after founded number
      position_of_number = time.index(first_number)
      next_two_symbols = time[(position_of_number + first_number.size)..(position_of_number + first_number.size + 1)]

      if %w(pm am).include?(next_two_symbols)
        "#{first_number}#{next_two_symbols}"
      else
        nil
      end
    end

    agent = Mechanize.new
    calendar_date = Date.current
    base_url = 'http://sfstation.com'

    90.times do
      puts "Parsing: #{calendar_date}"
      page = agent.get("http://www.sfstation.com/calendar/#{calendar_date.strftime('%m-%d-%Y')}")

      loop do
        page.search('a.summary').each do |link|
          source_url = base_url + link.attributes['href'].value.encode('UTF-8')

          # Event params
          event_params = {}
          start_date_time_array = []
          event_page = agent.get(source_url) rescue next
          event_params[:source_url] = source_url
          event_params[:name]       = event_page.at('#listingDetails').at('h1').text
          event_params[:summary]    = event_page.at('#listingDescription').text

          if event_params[:name].present?
            event_params[:name] = event_params[:name].encode(Encoding.find('UTF-8'),
                                                             {invalid: :replace, undef: :replace, replace: ''})
          end

          if event_params[:summary].present?
            event_params[:summary] = event_params[:summary].encode(Encoding.find('UTF-8'),
                                                                   {invalid: :replace, undef: :replace, replace: ''})
          end

          if event_page.at('#mainImage').present?
            event_params[:image_url] = base_url + event_page.at('#mainImage').at('img').attributes['src'].value
          end

          # Schedule params
          if event_page.search('td.dates').present?
            schedule = event_page.search('td.dates').first.search('div.ESL01').xpath('text()')

            schedule.each do |datetime|
              datetime = datetime.text.split('(')

              if datetime[1].include?('noon')
                datetime[1] = '12am'
              end

              time = process_time(datetime[1])
              start_date_time_array << DateTime.parse(datetime[0] + ' ' + time) if time.present?
            end

            event_params[:schedule] = schedule.text
          end

          # Venue params
          venue_address = event_page.search('li.mapBusinessAddress').first.at('span.address').text.delete("\n").strip
          venue_name    = event_page.search('li.mapBusinessAddress').first.at('a.businessName').text.delete("\n").strip
          venue_page    = agent.get(base_url + event_page.search('a.businessName')
                                                   .first.attributes['href'].value) rescue venue_page = nil

          if venue_address.present?
            venue_address = venue_address.encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
          end

          if venue_name.present?
            venue_name = venue_name.encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
          end

          if venue_page.present? && venue_page.at('#mainImage').present?
            venue_image_url = base_url + venue_page.at('#mainImage').at('img').attributes['src'].value
          else
            venue_image_url = nil
          end

          event_params[:venue] = Venue.find_or_create_venue(venue_name, venue_address,
                                                            event_params[:city_id], venue_image_url)
          event_params[:address] = venue_address

          # Default value (check app/admin/sfstation.rb line 14)
          event_params[:city_id] = 1

          # Searching event details in table
          tags = nil
          event_params[:end_date] = nil
          event_params[:end_time] = nil
          event_params[:cost] = nil
          event_page.at('#listingVitals').search('dt').each do |dt|
            case dt.text.split(' ').first
            when 'When'
              end_date_array = dt.next_element.text.split(' ')[0..2]
              event_params[:end_date] = end_date_array.join(' ')
            when 'Time'
              event_params[:end_time] = dt.next_element.text
              time = process_time(event_params[:end_time])
              event_params[:time_only] = Time.parse(time) if time.present?
            when 'Cost'
              event_params[:cost] = dt.next_element.text.delete("\n")
              event_params[:cost].blank? ? nil : event_params[:cost] # Return nil if the line is blank
            when 'Tags'
              tags = dt.next_element.text.split(',')
            end
          end
          event_params[:date_only] = Date.parse(event_params[:end_date].to_s) if event_params[:end_date].present?
          if event_params[:end_date].present? && event_params[:time_only].present?
            event_params[:start_date_time] = DateTime.parse(event_params[:end_date] + ' ' + event_params[:time_only].to_s)
            start_date_time_array << event_params[:start_date_time]
          end
          event_params[:start_date_time_array] = start_date_time_array

          # Skip if event time can't be known
          next if start_date_time_array.blank?

          # Parse cost to integer if 'cost' not nil
          if event_params[:cost] && event_params[:cost] != 'Free'
            event_params[:cost_integer] = Event.cost_integer_parser(event_params[:cost].delete("\n"))
          end

          # Create event
          event = Event.find_or_initialize_by(source_url: event_params[:source_url])
          event.assign_attributes(event_params)

          if event.save
            # Adding event times
            start_date_time_array.each do |datetime|
              event.event_times.create(start_time: datetime)
            end

            # Adding event tags
            tags.each do |tag|
              tag = tag.delete("\n")
              tag.strip!

              tag_entry = Tag.find_or_create_tag(tag)
              event.event_tags.find_or_create_by(tag_id: tag_entry.id)
              Event.add_parent_tags(tag_entry, event)
            end
          end
        end

        pagination_links = page.at('div#listingPagination').search('a')
        if pagination_links.present? && pagination_links.last.text.include?('Next')
          page = agent.get(base_url + page.at('div#listingPagination').search('a').last.attributes['href'].value) rescue break
        else
          break
        end
      end

      calendar_date = calendar_date.next
    end
  end
end
