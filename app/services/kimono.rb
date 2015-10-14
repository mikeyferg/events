require 'rest_client'
require 'paperclip.rb'
require 'standardizer.rb'

module Kimono
  def self.get_events
    response = RestClient.get 'http://www.kimonolabs.com/api/at0751ki?apikey=iJRD8FG2WwbpPHc4vhPobo5THBJNBvyt'
    #response = RestClient::Request.execute(:url => 'https://www.kimonolabs.com/api/at0751ki?apikey=iJRD8FG2WwbpPHc4vhPobo5THBJNBvyt', :method => :get, :verify_ssl => false)
  end

  def self.create_events
    response = JSON.parse(Kimono.get_events)
    events = response['results']['collection1']
    events.each do |event|
      get_event_details(event)
    end
  end

  def self.get_event_details(event)
    name = event['name'] if event['name']
    venue = event['venue']['text'] if event.has_key?('venue') && event['venue'].has_key?('text')
    image_url = event['image_url'] if event.has_key?('image_url')
    summary = event['description'] if event.has_key?('description')
    address = event['address'] if event.has_key?('address')
    cost = event['cost'] if event.has_key?('cost')
    source_url = event['source_url']['href'] if event.has_key?('source_url')  && event['source_url'].has_key?('href')
    date_only = Standardizer.date_splitter(event['date_only']) if event.has_key?('date_only')
    time_only = Standardizer.start_time_regex(event['time_only']) if event.has_key?('time_only')
    start_time = Standardizer.date_time(date_only, time_only) if event.has_key?('time_only') && event.has_key?('date_only')
    city_id = 1
    event = create_update_event(event, name, generic_time, start_time, venue, image_url, summary, address, cost, source_url, start_date, city_id)
    update_image(event)
    city = City.find(city_id)
    city.city_events_will_change!
    city.city_events << event['id']
    city.save

  end

  def self.create_update_event(event, name, time_only, start_time, venue, image_url, summary, address, cost, source_url, date_only, city_id)
    current_event = Event.find_by(name: name)
    if current_event.nil?
      event = Event.create(
        name: name,
        time_only: time_only,
        start_time: start_time,
        venue: venue,
        image_url: image_url,
        summary: summary,
        address: address,
        cost: cost,
        source_url: source_url,
        date_only: date_only,
        city_id: city_id
      )
    else
      current_event.update(name: name, time_only: time_only, start_time: start_time, venue: venue, image_url: image_url, summary: summary, address: address, cost:cost, source_url: source_url, date_only: date_only, city_id: city_id)
      current_event
    end
  end

  # def self.update_image(event)
  #   if !event['image_url'].nil?
  #     url = event['image_url']
  #     new_image = URI.parse(url)
  #     event.update_attribute(:image, new_image)
  #   end
  # end

end
