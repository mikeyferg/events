class EventsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  require 'kimono.rb'
  def index
    if params['slug']
      @event = find_event_by_slug
      render :show
    elsif params[:limit]
      @events = Event.includes(:event_times).references(:event_times)
        .where({ "event_times.start_time": Time.now.utc..6.months.from_now })
        .distinct
        .sort_by { rand}
        .take(3)
    elsif params[:featured]
      @events = Event.includes(:event_times).references(:event_times)
        .where({ "event_times.start_time": Time.now.utc..6.months.from_now })
        .where({featured: true})
        .distinct
        .sort_by { rand }
        .take(2)
    else
      @events = Event.includes(:event_times).references(:event_times)
        .joins(:tags)
        .where({ "event_times.start_time": Time.now.utc..6.months.from_now })
        .distinct
        .by_tag(params[:category])
        .by_date_range(params[:date_range])
        .by_cost(params[:free], params[:cost])
        .by_night_only(params[:night_only]) #add this for night_only?
        .page(params[:page]).per(27)
        .sort_by { rand}
    end
  end

  def show
    @event = find_event
    if stale?(etag: @event, last_modified: @event.updated_at)
      respond_to do |format|
        format.html # show.html.erb
        format.json { render json: @company }
      end
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

  def import_from_apeconcerts
    system 'rake scrape:apeconcerts'
    redirect_to '/admin/events'
  end

  def import_from_sfstation
    system 'rake scrape:sfstation'
    redirect_to '/admin/events'
  end

private
def find_event
  Event.friendly.find(params[:id])
  #Event.find(params[:id])
end
def find_event_by_slug
  Event.friendly.find(params[:slug])
end
def event_params
  params.require(:event).permit(:name, :start_time, :end_time, :summary, :image_url, :image, :address, :cost, :cost_integer, :source_url, :page_url, :end_date, :date_only, :time_only, :featured, :city_id, :venue_id, :schedule, :start_date_time, :start_date_time_array)
end
end
