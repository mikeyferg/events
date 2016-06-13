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
    image_url = main_domain + event_page.at('#mainImage').at('img').attributes['src'] if event_page.at('#mainImage').present?

    # Schedule params
    schedule = event_page.search('td.dates').first.search('div.ESL01').xpath('text()') if event_page.search('td.dates').present?

    # Venue params
    venue_page = agent.get(main_domain + event_page.search('a.businessName').first.attributes['href'].value)
    venue_name = venue_page.at('#listingDetails').at('h1').text
    venue_image_url = main_domain + venue_page.at('#mainImage').at('img').attributes['src'] if venue_page.at('#mainImage').present?
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
        when 'Tags'
          tags = dt.next_element.text.split(",")
      end
    end

    # Create event
    event = Event.create(
        name: name,
        source_url: source_url,
        summary: summary,
        image_url: image_url,
        city_id: city_id,
        end_date: end_date,
        address: venue_address,
        end_time: end_time,
        cost: cost,
        schedule: schedule,
        venue: Venue.find_or_create_venue(venue_name, venue_address, city_id, venue_image_url)
    )

    # Adding event tags
    tags.each do |tag|
      event.tags.find_or_create_by(name: tag)
    end
  end
end