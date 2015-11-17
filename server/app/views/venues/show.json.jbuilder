json.venue do |json|
  json.(@venue, :id, :name, :address, :image_url, :slug, :city_id, :image)
    json.events @venue.events.where({ start_date_time: Time.now.utc..6.months.from_now }).limit( 20 ).pluck :id
    json.city @venue.city.id
end


json.events @venue.events.where({ start_date_time: Time.now.utc..6.months.from_now }).limit( 20 ), :id, :name, :start_date_time, :slug, :end_time, :summary, :image_url, :address, :cost, :source_url, :page_url, :end_date, :date_only, :time_only, :featured, :city_id, :venue_id, :schedule

@city_array_format = [ @venue.city ]
# json.set! :city do
#   json.array! city_array_format, :id, :name, :nickname, :slug
# end

json.partial! 'cities/city'
