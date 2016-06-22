require 'mechanize'

namespace :scrape do
  desc 'Import events from apeconcerts.com'
  task apeconcerts: :environment do
    agent = Mechanize.new
    page = agent.get('http://www.apeconcerts.com/')

    page.search('div.entry').each do |div|
      event_params = {}
      event_params[:source_url] = div.at('a').attributes['href'].value
      event_page = agent.get(event_params[:source_url])

      # Checking event location to be San Francisco
      next if event_page.at('div.venue-location').xpath('div//span[@itemprop="addressLocality"]').text != 'San Francisco'

      # Event params
      event_params[:name]      = event_page.at('h2.show-title').text
      event_params[:summary]   = event_page.at('div.bio').text
      event_params[:image_url] = "http:#{event_page.at('img.wp-post-image').attributes['src'].value}"
      event_params[:featured]  = true

      if event_params[:name].present?
        event_params[:name] = event_params[:name].encode(Encoding.find('UTF-8'),
                                                         {invalid: :replace, undef: :replace, replace: ''})
      end

      if event_params[:summary].present?
        event_params[:summary] = event_params[:summary].encode(Encoding.find('UTF-8'),
                                                               {invalid: :replace, undef: :replace, replace: ''})
      end

      # Setting event cost params
      if event_page.at('div.more-information').search('p:contains("$")').present?
        event_params[:cost] = event_page.at('div.more-information').search('p:contains("$")').text.split(' ').first
        event_params[:cost_integer] = Event.cost_integer_parser(event_params[:cost])
      else
        event_params[:cost] = nil
        event_params[:cost_integer] = nil
      end

      # Event datetime params
      event_params[:start_date_time_array] = []
      event_params[:start_date_time] = DateTime.parse(event_page.at('div.single-date-show').attributes['content'].value)
      event_params[:start_date_time_array] << event_params[:start_date_time].to_s if event_params[:start_date_time].present?

      # Skip if event time can't be known
      next if event_params[:start_date_time_array].blank?

      event_params[:end_date] = event_page.at('div.single-date-show').text
      event_params[:date_only] = Date.parse(event_params[:end_date])
      event_params[:end_time] = event_page.at('div.time-show').text.split(' ').last
      event_params[:time_only] = Time.parse(event_page.at('div.single-date-show').attributes['content'].value)

      # Default value (check app/admin/sfstation.rb line 14)
      event_params[:city_id] = 1

      # Venue params
      venue_name = event_page.at('div.venue-location').at('span').text
      location = event_page.at('div.venue-location').xpath('div//span[@itemprop="addressLocality"]').text
      region = event_page.at('div.venue-location').xpath('div//span[@itemprop="addressRegion"]').text
      venue_address = "#{location}, #{region}"

      if venue_address.present?
        venue_address = venue_address.encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
      end

      if venue_name.present?
        venue_name = venue_name.encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
      end

      event_params[:venue] = Venue.find_or_create_venue(venue_name, venue_address, event_params[:city_id], nil)
      event_params[:address] = venue_address

      # Apeconcerts tags
      tags = ['live music', 'nightlife', 'show', 'bars/clubs']

      # Create event
      event = Event.find_or_initialize_by(source_url: event_params[:source_url])
      event.assign_attributes(event_params)
      if event.save
        # Create event time
        event.event_times.create(start_time: event_params[:start_date_time])

        # Adding event tags
        tags.each do |tag|
          tag_entry = Tag.find_or_create_tag(tag)
          event.event_tags.find_or_create_by(tag_id: tag_entry.id)
          Event.add_parent_tags(tag_entry, event)
        end
      end
    end
  end
end
