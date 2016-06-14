desc 'Import events from apeconcerts.com'
task import_from_apeconcerts: :environment do
  require 'mechanize'

  agent = Mechanize.new
  page = agent.get('http://www.apeconcerts.com/events')
  page.at('aside.tm_upcoming_events-class').search('li').each do |li|
    event_link = li.at('a').attributes['href'].value
    event_page = agent.get(event_link)
    # Checking event location to be San Francisco
    if event_page.at('div.venue-location').xpath('div//span[@itemprop="addressLocality"]').text == 'San Francisco'
      # Event params
      name = event_page.at('h2.show-title').text
      summary = event_page.at('div.bio').text
      image_url = "http:#{event_page.at('img.wp-post-image').attributes['src'].value}"

      # Setting event cost params
      if event_page.at('div.more-information').search('p:contains("$")').present?
        cost = event_page.at('div.more-information').search('p:contains("$")').text.split(" ").first
        cost_integer = Event.cost_integer_parser(cost)
      else
        cost = nil
        cost_integer = nil
      end

      # Event time params
      start_date_time = event_page.at('div.single-date-show').attributes['content'].value
      end_date = event_page.at('div.single-date-show').text
      end_time = event_page.at('div.time-show').text.split(" ").last

      # Default value (check app/admin/sfstation.rb line 14)
      city_id = 1

      # Venue params
      venue_name = event_page.at('div.venue-location').at('span').text
      venue_address = event_page.at('div.venue-location')
                          .xpath('div//span[@itemprop="addressLocality"]').text + ', ' +
                      event_page.at('div.venue-location')
                          .xpath('div//span[@itemprop="addressRegion"]').text

      # Event params hash
      event_params = {
          name: name,
          source_url: event_link,
          summary: summary,
          image_url: image_url,
          city_id: city_id,
          address: venue_address,
          end_date: end_date,
          end_time: end_time,
          start_date_time: start_date_time,
          cost: cost,
          cost_integer: cost_integer,
          venue: Venue.find_or_create_venue(venue_name, venue_address, city_id, nil)
      }

      # Create event
      Event.create(event_params)
    end
  end
end