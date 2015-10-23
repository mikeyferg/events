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
    @events = @city.events
    # respond_to do |format|
    #   format.html
    #   format.jbuilder {
    #     city: @city,
    #     include: @city.events
    #
    #    }
    #  end
  end


  private
  def find_city
    City.friendly.find(params[:id])
  end
  def city_params
    params.require(:city).permit(:name, :nickname)
  end
end
