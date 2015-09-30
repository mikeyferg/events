class KimonosWebhooksController < ApplicationController
  skip_before_filter :verify_authenticity_token
  #protect_from_forgery :except => :create
  require 'kimono.rb'

#  Kimono.create_events
  def create
    render nothing: true
    Kimono.create_events
  end
end
