json.city do |json|
  json.(@city, :id, :name, :nickname, :slug)
    #json.event_ids @city.events.paginate(:page => params[:page], :per_page => 5).pluck :id
    json.events @events.page(params[:page]).per(10).pluck :id
    #json.events @city.events.order(name: :desc).pluck :id
end

#json.events @city.events.paginate(:page => params[:page], :per_page => 5), :id, :name

# json.events @city.events.page(params[:page]).per(10), :id, :name, :start_time, :end_time, :summary, :image_url, :image, :address, :cost, :source_url, :page_url, :end_date, :date_only, :time_only, :featured, :city_id, :venue_id, :schedule
json.events @events.order(:date_only).page(params[:page]).per(10), :id, :name, :start_time, :end_time, :summary, :image_url, :image, :address, :cost, :source_url, :page_url, :end_date, :date_only, :time_only, :featured, :city_id, :venue_id, :schedule

#json.meta,
