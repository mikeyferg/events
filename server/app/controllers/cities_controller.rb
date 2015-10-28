require 'date'
class CitiesController < ApplicationController
  def index
    if params['slug']
      redirect_to city_path params['slug']
    else
      @cities = City.all
    end

  end

  def show
    @city = find_city

    @events = @city.events.where({ date_only: Date.today..6.months.from_now })

  end


  private
  def find_city
    City.friendly.find(params[:id])
  end
  def city_params
    params.require(:city).permit(:name, :nickname)
  end
end
