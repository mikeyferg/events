class CitiesController < ApplicationController
  def index
    @cities = City.all
    # @city_events = []
    # @cities.each do |city|
    #   @city_events << city.city_events
    # end
    respond_to do |format|
      format.html
      format.json { render json: {
        cities: @cities
        }
       }
    end
  end
  def show
    @city = find_city
    @events = @city.events
    respond_to do |format|
      format.html
      format.json { render json: {
        city: @city,
        events: @events
        }
       }
     end
  end

  private
  def find_city
    City.friendly.find(params[:id])
  end
end
