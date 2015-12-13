json.venue do |json|
  json.partial! @venue
  json.city @venue.city.id
  json.events @events.pluck :id
end

json.city { json.array! [@venue.city], partial: 'cities/city', as: :city }

#json.events { json.array! @events, partial: 'events/event', as: :event }

json.events @events.each do |event|
  json.partial! event
  json.venue_name event.venue.name unless event.venue.nil?
  json.event_times event.event_times.pluck :start_time
end
