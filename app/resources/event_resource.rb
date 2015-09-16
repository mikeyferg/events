class EventResource < JSONAPI::Resource
  attributes :name, :start_time, :end_time, :venue, :summary, :image_url
end
