json.event do |json|
  json.(@event, :id, :name, :end_time, :summary, :image_url, :address, :cost, :cost_integer, :source_url, :start_date_time, :start_date_time_array, :featured, :city_id, :venue_id, :schedule, :slug)
      json.venue @event.venue.id if !@event.venue.nil?
      json.city @event.city.id
      json.tags @event.tags.pluck :id
      json.users @event.users.pluck :id

end

if !@event.venue.nil?
  venue_array_format = [ @event.venue ]
  json.set! :venue do
    json.array! venue_array_format, :id, :name, :address, :image_url, :slug
  end
else
    json.set! :venue do
      json.array! nil
    end

end
@city_array_format = [ @event.city ]
# json.set! :city do
#   json.array! city_array_format, :id, :name, :nickname, :slug
# end
json.partial! 'cities/city'

json.set! :tags do
  json.array! @event.tags, :id, :name, :slug
end

json.set! :users do
  json.array! @event.users, :id, :name, :email, :image_url, :oauth_token, :uid, :slug
end
