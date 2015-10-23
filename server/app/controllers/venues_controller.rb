class VenuesController < ApplicationController

  def index
    @venues = Venue.all
    respond_to do |format|
      format.html
      format.json { render json: {
        venues: @venues
        }
       }
    end
  end
  def show
    @venue = find_venue
    respond_to do |format|
      format.html
      format.json { render json: {
        venue: @venue
        }
       }
    end
  end
    def new
      @venue = Venue.new
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
  def venue_params
    params.require(:venue).permit(:name, :address, :image_url, :image)
  end
end
