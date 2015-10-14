class KimonosWebhooksController < ApplicationController
  skip_before_filter :verify_authenticity_token
  #protect_from_forgery :except => :create
  require 'kimono.rb'
  require 'open-uri'
  def create
    render nothing: true
    Kimono.create_events
  end
end
