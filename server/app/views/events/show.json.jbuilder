json.event do
  json.partial! @event
  json.event_times @event.event_times.pluck :start_time
  json.tags @event.tags.pluck :id
  json.users @event.users.pluck :id
  json.venue_name @event.venue.name unless @event.venue.nil?
  json.city @event.city.id
  json.venue @event.venue.id
end

json.city { json.partial! @event.city}

json.set! :tags do
  json.array! @event.tags, :id, :name, :slug
end

json.set! :users do
  json.array! @event.users, :id, :name, :email, :image_url, :oauth_token, :uid, :slug
end

unless @event.venue.nil?
  json.venue { json.partial! @event.venue}
end
