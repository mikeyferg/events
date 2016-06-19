require 'mechanize'
namespace :scrape do
  desc 'Import events from sfstation.com'
  task import_from_sfstation: :environment do

    def process_time(time)
      time.downcase!
      time.gsub!('  ', ' ')
      time.gsub!('noon', '12am')

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
    page = agent.get('http://www.sfstation.com/calendar')
    main_domain = 'http://sfstation.com'
    page.search('a.summary').each do |link|
      # Event params
      event_params = {}
      start_date_time_array = []
      event_params[:source_url] = main_domain + link.attributes['href'].value.encode('UTF-8')
      event_page = agent.get(event_params[:source_url])
      event_params[:name] = event_page.at('#listingDetails').at('h1').text
      event_params[:summary] = event_page.at('#listingDescription').text
      if event_page.at('#mainImage').present?
        event_params[:image_url] = main_domain + event_page.at('#mainImage').at('img').attributes['src'].value
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
      venue_page = agent.get(main_domain + event_page.search('a.businessName').first.attributes['href'].value)
      venue_name = venue_page.at('#listingDetails').at('h1').text
      if venue_page.at('#mainImage').present?
        venue_image_url = main_domain + venue_page.at('#mainImage').at('img').attributes['src'].value
      end
      venue_address = venue_page.at('dt:contains("Where")').next_element.text
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
            event_params[:cost] = dt.next_element.text.delete('\n')
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

      # Parse cost to integer if 'cost' not nil
      if event_params[:cost] && event_params[:cost] != 'Free'
        event_params[:cost_integer] = Event.cost_integer_parser(event_params[:cost].delete('\n'))
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
          event.tags.find_or_create_by(name: tag)
        end
      end
    end
  end
end
