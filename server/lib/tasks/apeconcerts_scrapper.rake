namespace :scrape do
  desc 'Import events from apeconcerts.com'
  task import_from_apeconcerts: :environment do
    require 'mechanize'

    agent = Mechanize.new
    page = agent.get('http://www.apeconcerts.com/events')
    page.at('aside.tm_upcoming_events-class').search('li').each do |li|
      event_params = {}
      event_params[:source_url] = li.at('a').attributes['href'].value
      event_page = agent.get(event_params[:source_url])
      # Checking event location to be San Francisco
      next if event_page.at('div.venue-location').xpath('div//span[@itemprop="addressLocality"]').text != 'San Francisco'
      # Event params
      event_params[:name] = event_page.at('h2.show-title').text
      event_params[:summary] = event_page.at('div.bio').text
      event_params[:image_url] = "http:#{event_page.at('img.wp-post-image').attributes['src'].value}"

      # Setting event cost params
      if event_page.at('div.more-information').search('p:contains("$")').present?
        event_params[:cost] = event_page.at('div.more-information').search('p:contains("$")').text.split(' ').first
        event_params[:cost_integer] = Event.cost_integer_parser(event_params[:cost])
      else
        event_params[:cost] = nil
        event_params[:cost_integer] = nil
      end

      # Event datetime params
      event_params[:start_date_time] = DateTime.parse(event_page.at('div.single-date-show').attributes['content'].value)
      event_params[:end_date] = event_page.at('div.single-date-show').text
      event_params[:date_only] = Date.parse(event_params[:end_date])
      event_params[:end_time] = event_page.at('div.time-show').text.split(' ').last
      event_params[:time_only] = Time.parse(event_page.at('div.single-date-show').attributes['content'].value)

      # Default value (check app/admin/sfstation.rb line 14)
      event_params[:city_id] = 1

      # Venue params
      venue_name = event_page.at('div.venue-location').at('span').text
      venue_address = event_page.at('div.venue-location')
                          .xpath('div//span[@itemprop="addressLocality"]').text + ', ' +
                      event_page.at('div.venue-location')
                          .xpath('div//span[@itemprop="addressRegion"]').text
      event_params[:venue] = Venue.find_or_create_venue(venue_name, venue_address, event_params[:city_id], nil)
      event_params[:address] = venue_address

      # Create event
      event = Event.find_or_initialize_by(source_url: event_params[:source_url])
      event.assign_attributes(event_params)
      event.save
    end
  end
end