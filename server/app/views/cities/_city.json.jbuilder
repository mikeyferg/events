json.set! :city do
  json.array! @city_array_format, :id, :name, :nickname, :slug
end