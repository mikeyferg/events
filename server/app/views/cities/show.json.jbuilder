json.city do |json|
  json.(@city, :id, :name, :nickname, :slug)
# <<<<<<< HEAD
#   # json.events @events.order(:date_only).page(params[:page]).per(10).pluck :id
# =======
# <<<<<<< HEAD
#   json.events @events.order(:date_only).page(params[:page]).pluck :id
# =======
#   # json.events @events.order(:date_only).page(params[:page]).per(10).pluck :id
# >>>>>>> 2f45962c694d3e9bc37b832cbb3b6e7fd9d41498
# >>>>>>> rsh-production
end
# json.events @events.order(:date_only).page(params[:page]).per(10), :id, :name, :start_time, :end_time, :summary, :image_url, :image, :address, :cost, :source_url, :page_url, :end_date, :date_only, :time_only, :featured, :city_id, :venue_id, :schedule
# json.partial! 'events/events', events: @city.events
