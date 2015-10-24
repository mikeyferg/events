json.venue do |json|
  json.(@venue, :id, :name, :address, :image_url, :slug, :city_id, :image)
    #json.event_ids @city.events.paginate(:page => params[:page], :per_page => 5).pluck :id
    json.events @venue.events.pluck :id
    json.city @venue.city
end


json.events @venue.events, :id, :name, :start_time, :end_time, :summary, :image_url, :image, :address, :cost, :source_url, :page_url, :end_date, :date_only, :time_only, :featured, :city_id, :venue_id, :schedule

json.city @venue.city, :id, :name, :nickname, :slug
