class EventsController < ApplicationController
skip_before_filter :verify_authenticity_token
require 'kimono.rb'
  def index
    # @events = Event.all
    @events = Event.paginate(:page => params[:page], :per_page => 5)
    # @city = City.find_by_nickname(params[:city_nickname])
    # @events = @city.events

    respond_to do |format|
      format.html
      format.json { render json: {
        events: @events
        }
       }
    end
  end

  def show
    @event = find_event
    @users = @event.users
    @users_id_array = @users.collect(&:id)
    @tags = @event.tags
    @tags_id_array = @tags.collect(&:id)
    respond_to do |format|
      format.html
      format.json { render json: {
        event: @event,
        users: @users,
        users_id_array: @users_id_array,
        tags: @tags,
        tags_id_array: @tags_id_array
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

  # def update_image(event)
  #   #event.image.destroy
  #   new_image = URI.parse('http://otowndogrescue.com/wp-content/uploads/2013/09/foster-dog.jpg')
  #   event.update_attribute(:image, new_image)
  # end
  private
  def find_event
    Event.friendly.find(params[:id])
    #Event.find(params[:id])
  end
  def event_params
    params.require(:event).permit(:name, :start_time, :end_time, :summary, :image_url, :image, :address, :cost, :source_url, :page_url, :end_date, :date_only, :time_only, :featured, :city_id, :venue_id, :tag_id, :schedule)
  end
end
