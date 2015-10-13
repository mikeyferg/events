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
    respond_to do |format|
      format.html
      format.json { render json: {
        city: @city
        }
       }
     end
  end

  private
  def find_city
    City.find(params[:id])
  end
end
