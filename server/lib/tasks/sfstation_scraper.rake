desc 'Import events from sfstation.com'
task import_from_sfstation: :environment do
  require 'mechanize'

  agent = Mechanize.new
  page = agent.get('http://www.sfstation.com/calendar')
  main_domain = "http://sfstation.com"
  page.search('a.summary').each do |link|
    # Event params
    source_url = main_domain + link.attributes['href'].value
    event_page = agent.get(source_url)
    name = event_page.at('#listingDetails').at('h1').text
    summary = event_page.at('#listingDescription').text
    if event_page.at('#mainImage').present?
      image_url = main_domain + event_page.at('#mainImage').at('img').attributes['src']
    end

    # Schedule params
    if event_page.search('td.dates').present?
      schedule = event_page.search('td.dates').first.search('div.ESL01').xpath('text()')
    end

    # Venue params
    venue_page = agent.get(main_domain + event_page.search('a.businessName').first.attributes['href'].value)
    venue_name = venue_page.at('#listingDetails').at('h1').text
    if venue_page.at('#mainImage').present?
      venue_image_url = main_domain + venue_page.at('#mainImage').at('img').attributes['src']
    end
    venue_address = venue_page.at('dt:contains("Where")').next_element.text

    # Default value (check app/admin/sfstation.rb line 14)
    city_id = 1

    # Searching event details in table
    tags = nil
    end_date = nil
    end_time = nil
    cost = nil
    event_page.at('#listingVitals').search('dt').each do |dt|
      case dt.text
        when 'When'
          end_date = dt.next_element.text
        when 'Time'
          end_time = dt.next_element.text
        when 'Cost'
          cost = dt.next_element.text
          cost.blank? ? nil : cost # Return nil if the line is blank
        when 'Tags'
          tags = dt.next_element.text.split(",")
      end
    end

    # Parse cost to integer if 'cost' not nil
    cost_integer = Event.cost_integer_parser(cost.split(" ").first) if cost.present? && cost != 'Free'

    # Event params hash
    event_params = {
        name: name,
        source_url: source_url,
        summary: summary,
        image_url: image_url,
        city_id: city_id,
        end_date: end_date,
        address: venue_address,
        end_time: end_time,
        cost: cost,
        cost_integer: cost_integer,
        schedule: schedule,
        venue: Venue.find_or_create_venue(venue_name, venue_address, city_id, venue_image_url)
    }

    # Create event
    event = Event.find_or_initialize_by(source_url: source_url)
    event.assign_attributes(event_params)
    event.save

    # Adding event tags
    tags.each do |tag|
      event.tags.find_or_create_by(name: tag)
    end
  end
end