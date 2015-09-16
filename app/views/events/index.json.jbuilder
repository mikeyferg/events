json.events @events do |event|
  json.name event.name
  json.start_time event.start_time
  json.end_time event.end_time
  json.venue event.venue
  json.summary event.summary
  json.image_url event.image_urle
end
