json.partner do |json|
  json.(@partner, :id, :name, :email, :image_url, :organization, :type)
    # json.venues @partner.venues
    # json.events @partner.events

end

#  venue_array_format = [ @event.venue ]
# json.set! :venue do
#   json.array! venue_array_format, :id, :name, :address, :image_url, :slug
# end
# @city_array_format = [ @event.city ]
#
#  json.partial! 'cities/city'

json.set! :venues do
  json.array! @partner.venues, :id, :name, :slug
end

json.set! :events do
  json.array! @partner.events, :id, :name, :image_url
end
