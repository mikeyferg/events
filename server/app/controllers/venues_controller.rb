class VenuesController < ApplicationController

  def index
    if params['slug']
      @venue = find_venue_by_slug
      @events = Event.joins(:event_times)
        .where({ "event_times.start_time": Time.now.utc..6.months.from_now })
        .where("venue_id": @venue.id)
        .limit( 20 )

      render :show
    else
      @venues = Venue.all
    end
  end

  def show
    @venue = find_venue
    @events = @venue.events
  end

  def new
    @venue = Venue.new
    @events = @venue.events
    respond_to do |format|
      format.html
      format.json { render json: {
        event: @event
        }
       }
    end
  end

  def create
    @venue = Venue.new
    if @venue.save
      redirect_to venue_path(@venue)
    else
      render 'new'
    end
  end

  def edit
    @venue = find_venue
  end

  def update
    @venue = find_venue
    if @venue.update_attributes(venue_params)
      redirect_to venue_path(@venue)
    else
      render 'new'
    end
  end
  def destroy
    @venue = find_venue
    @venue.destroy
    redirect_to venues_path
  end



  private
  def find_venue
    Venue.friendly.find(params[:id])
  end
  def find_venue_by_slug
    Venue.friendly.find(params[:slug])
  end
  def venue_params
    params.require(:venue).permit(:name, :address, :city_id, :image_url, :image)
  end
end
