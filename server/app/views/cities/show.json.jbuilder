json.city do |json|
  json.(@city, :id, :name, :nickname, :slug)
  json.events_ids @city.events.paginate(:page => params[:page], :per_page => 5).pluck :id
end

json.included{json.events @city.events.paginate(:page => params[:page], :per_page => 5), :id, :name}
