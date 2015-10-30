json.city do |json|
  json.(@city, :id, :name, :nickname, :slug)
  # json.events @events.order(:date_only).page(params[:page]).per(10).pluck :id
end
# json.events @events.order(:date_only).page(params[:page]).per(10), :id, :name, :start_time, :end_time, :summary, :image_url, :image, :address, :cost, :source_url, :page_url, :end_date, :date_only, :time_only, :featured, :city_id, :venue_id, :schedule
# json.partial! 'events/events', events: @city.events
