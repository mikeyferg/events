require 'date'
class CitiesController < ApplicationController

  def index
    if params['slug']
      @city = find_city_by_slug
      render :show
    else
      @cities = City.all
    end

  end

  def show
    @city = find_city
    # @events = @city.events.where({ date_only: Date.today..6.months.from_now })
  end


  private
  def find_city
    City.friendly.find(params[:id])
  end
  def find_city_by_slug
    City.friendly.find(params[:slug])
  end
  def city_params
    params.require(:city).permit(:name, :nickname)
  end
end
