json.events @events.each do |event|
<<<<<<< HEAD
    json.(event, :id, :name, :end_time, :summary, :image_url, :address, :cost, :cost_integer, :source_url, :end_date, :featured, :city_id, :venue_id, :schedule, :slug)
        json.venue_name event.venue.name if !event.venue.nil?
        json.event_times event.event_times.pluck :start_time
=======
  json.partial! event
  json.venue_name event.venue.name unless event.venue.nil?
  json.event_times event.event_times.pluck :start_time
>>>>>>> 92297bc1b97d6d984fd3c59c09f92d62cf6918e4
end
