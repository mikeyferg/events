require 'rest_client'


module Kimono
  def self.get_events
    response = RestClient.get 'http://www.kimonolabs.com/api/at0751ki?apikey=iJRD8FG2WwbpPHc4vhPobo5THBJNBvyt'
    #response = RestClient::Request.execute(:url => 'https://www.kimonolabs.com/api/at0751ki?apikey=iJRD8FG2WwbpPHc4vhPobo5THBJNBvyt', :method => :get, :verify_ssl => false)
  end

  def self.create_events
    response = JSON.parse(Kimono.get_events)
    events = response['results']['collection1']

    events.each do |event|
      #binding.pry
      get_event_details(event)
    end
  end

  def self.get_event_details(event)
    #binding.pry
    name = event['name'] if event['name']

    venue = event['venue']['text'] if event.has_key?('venue') && event['venue'].has_key?('text')
    image_url = event['image_url'] if event.has_key?('image_url')
    summary = event['description'] if event.has_key?('description')
    address = event['address'] if event.has_key?('address')
    cost = event['cost'] if event.has_key?('cost')
    source_url = event['source_url']['href'] if event.has_key?('source_url')  && event['source_url'].has_key?('href')
    start_date = event['start_date'] if event.has_key?('start_date')
    generic_time = event['start_time'] if event.has_key?('start_time')
    create_update_event(event, name, generic_time, venue, image_url, summary, address, cost, source_url, start_date)

  end

  def self.create_update_event(event, name, generic_time, venue, image_url, summary, address, cost, source_url, start_date)
    current_event = Event.find_by(name: name)
    if current_event
      current_event.update(name: name, generic_time: generic_time, venue:venue, image_url: image_url, summary: summary, address: address, cost:cost, source_url: source_url, start_date: start_date)
    else
      Event.create(name: name, generic_time:generic_time, venue:venue, image_url: image_url, summary: summary, address: address, cost:cost, source_url: source_url, start_date: start_date)
    end
  end

end
