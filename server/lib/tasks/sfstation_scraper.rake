namespace :scrape do
  desc 'Import events from sfstation.com'
  task import_from_sfstation: :environment do
    require 'mechanize'

    agent = Mechanize.new
    page = agent.get('http://www.sfstation.com/calendar')
    main_domain = 'http://sfstation.com'
    page.search('a.summary').each do |link|
      # Event params
      event_params = {}
      event_params[:source_url] = main_domain + link.attributes['href'].value
      event_page = agent.get(event_params[:source_url])
      event_params[:name] = event_page.at('#listingDetails').at('h1').text
      event_params[:summary] = event_page.at('#listingDescription').text
      if event_page.at('#mainImage').present?
        image_url = main_domain + event_page.at('#mainImage').at('img').attributes['src'].value
      end

      # Schedule params
      if event_page.search('td.dates').present?
        event_params[:schedule] = event_page.search('td.dates').first.search('div.ESL01').xpath('text()')
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
            event_params[:end_date] = dt.next_element.text.delete('\n').split('(').first
          when 'Time'
            event_params[:end_time] = dt.next_element.text.delete('\n')
            event_params[:time_only] = event_params[:end_time]
          when 'Cost'
            event_params[:cost] = dt.next_element.text.delete('\n')
            event_params[:cost].blank? ? nil : event_params[:cost] # Return nil if the line is blank
          when 'Tags'
            tags = dt.next_element.text.split(',')
        end
      end
      event_params[:date_only] = Date.parse(event_params[:end_date].to_s) if event_params[:end_date].present?

      # Parse cost to integer if 'cost' not nil
      if event_params[:cost] && event_params[:cost] != 'Free'
        event_params[:cost_integer] = Event.cost_integer_parser(event_params[:cost].delete('\n'))
      end

      # Create event
      event = Event.find_or_initialize_by(source_url: event_params[:source_url])
      event.load_image_from_url(image_url) if image_url && event.image_url.blank?
      event.assign_attributes(event_params)
      event.image_url = event.image.url
      event.save

      # Adding event tags
      tags.each do |tag|
        event.tags.find_or_create_by(name: tag)
      end
    end
  end
end
