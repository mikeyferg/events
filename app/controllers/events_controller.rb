class EventsController < ApplicationController
skip_before_filter :verify_authenticity_token
require 'kimono.rb'
#require 'paperclip.rb'
#include Paperclip
  def index
    @events = Event.all
    # @events.each do |event|
    #   update_image(event)
    # end
    #@events_kimono = JSON.parse(Kimono.get_events)
  #  @event_test = Kimono.get_event_details(@events_kimono['results']['collection1'][1])
  #  @event_script = Kimono.create_events
    respond_to do |format|
      format.html
      format.json { render json: {
        event: @events,
        events_kimono: @events_kimono
        }
       }
    end
  end

  def show
    @event = find_event
    #update_image(@event)

    @users = @event.users
    @users_id_array = @users.collect(&:id)
    respond_to do |format|
      format.html
      format.json { render json: {
        event: @event,
        users: @users,
        users_id_array: @users_id_array
        }
       }
    end
  end

  def new
    @event = Event.new
    respond_to do |format|
      format.html
      format.json { render json: {
        event: @event
        }
       }
    end
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to event_path(@event)
    else
      render 'new'
    end
  end

  def edit
    @event = find_event
  end

  def update
    @event = find.event
    if @event.update_attributes(event_params)
      redirect_to event_path(@event)
    else
      render 'new'
    end
  end

  def destroy
    @event = find_event
    @event.destroy
    redirect_to events_path
  end

  # def add_image(event)
  #   #binding.pry
  #   if event.image.blank?
  #     event.image = URI.parse('http://www.wired.com/wp-content/uploads/2015/02/Dog-3-600x450.jpg')
  #   else
  #     update_image(event)
  #   end
  # end

  def update_image(event)
    #event.image.destroy
    new_image = URI.parse('http://otowndogrescue.com/wp-content/uploads/2013/09/foster-dog.jpg')
    event.update_attribute(:image, new_image)
  end
  private
  def find_event
    Event.find(params[:id])
  end
  def event_params
    params.require(:event).permit(:name, :start_time, :end_time, :venue, :summary, :image_url, :image, :address, :cost, :source_url, :end_date, :start_date, :generic_time)
  end
end
