json.event do |json|
  json.(@event, :id, :name, :start_time, :end_time, :summary, :image, :address, :cost, :source_url, :page_url, :end_date, :date_only, :time_only, :featured, :city_id, :venue_id, :schedule)
    json.venue @event.venue.id
    json.city @event.city.id
    json.tags @event.tags.pluck :id
    json.users @event.users.pluck :id
end

venue_array_format = [ @event.venue ]
json.set! :venue do
  json.array! venue_array_format, :id, :name, :address, :image
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
  json.array! @event.users, :id, :name, :email, :image, :oauth_token, :uid
end
