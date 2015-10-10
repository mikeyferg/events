class CitiesController < ApplicationController
  def index
    @cities = City.all
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
    @city_events = @city.events
    respond_to do |format|
      format.html
      format.json { render json: {
        city: @city,
        city_events: @city_events
        }
       }
     end
  end

  private
  def find_city
    City.find(params[:id])
  end
end
