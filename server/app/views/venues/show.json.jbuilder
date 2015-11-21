json.venue do |json|
  json.(@venue, :id, :name, :address, :image_url, :slug, :city_id, :image)
    json.events @venue.events.where({ start_date_time: Time.now.utc..6.months.from_now }).limit( 20 ).order(:start_date_time).pluck :id
    json.city @venue.city.id
end


#json.events @venue.events.where({ start_date_time: Time.now.utc..6.months.from_now }).limit( 20 ).order(:start_date_time), :id, :name, :start_date_time, :slug, :end_time, :summary, :image_url, :address, :cost, :cost_integer, :source_url, :page_url, :end_date, :date_only#, time_only, :featured, :city_id, :venue_id, :schedule, @venue.name

json.events @venue.events.where({ start_date_time: Time.now.utc..6.months.from_now }).limit( 20 ).order(:start_date_time).each do |event|
  json.event do |json|
    json.(event, :id, :name, :start_date_time, :slug, :end_time, :summary, :image_url, :address, :cost, :cost_integer, :source_url, :page_url, :end_date, :featured, :city_id, :venue_id, :schedule)
      json.venue_name @venue.name
  end
end

@city_array_format = [ @venue.city ]


json.partial! 'cities/city'
