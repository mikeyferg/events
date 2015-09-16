class EventsController < ApplicationController
  include JSONAPI::ActsAsResourceController
  # def show
  #   event = Event.find(1)
  #   JSONAPI::ResourceSerializer.new(EventResource).serialize_to_hash(EventResource.new(event))
  # end
end
