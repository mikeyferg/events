json.events @events.each do |event|
  json.partial! event
  json.venue_name event.venue.name unless event.venue.nil?
  json.event_times event.event_times.pluck :start_time
end
