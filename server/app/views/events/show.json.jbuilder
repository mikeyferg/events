json.event do |json|
  json.(@event, :id, :name, :start_time, :end_time, :summary, :image_url, :image, :address, :cost, :source_url, :page_url, :end_date, :date_only, :time_only, :featured, :city_id, :venue_id, :schedule)
    json.venue @event.venue.id
    json.city @event.city.id
    json.tags @event.tags.pluck :id
    json.users @event.users.pluck :id
end



json.venue @event.venue, :id, :name, :address, :image_url, :image
json.city @event.city, :id, :name, :nickname, :slug
json.tags @event.tags, :id, :name, :slug
json.users @event.users, :id, :name, :email, :image, :oauth_token, :uid
