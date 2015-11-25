# json.events @events
#
# json.event do |json|
#   json.(@event, :id, :name, :end_time, :summary, :image_url, :address, :cost, :source_url, :end_date, :date_only, :time_only, :start_date_time, :featured, :city_id, :venue_id, :schedule, :slug)
#       json.venue_name. @event.venue.name if !@event.venue.nil?
#
#
# end


json.events @events.each do |event|
    json.(event, :id, :name, :end_time, :summary, :image_url, :address, :cost, :cost_integer, :source_url, :featured, :city_id, :venue_id, :schedule, :slug)
        json.venue_name event.venue.name if !event.venue.nil?
        json.event_times event.event_times.pluck :start_time
end
