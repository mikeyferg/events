require 'date'
class CitiesController < ApplicationController
  def index
    @cities = City.all

    # respond_to do |format|
    #   format.html
    #   format.json { render json: {
    #     cities: @cities
    #     }
    #    }
    # end
  end

  def show
    @city = find_city
    # @city = find_city.page(params[:page])

    # start_date = Date.today
    # end_date = 6.months.from_now
    # dates = (start_date..end_date)
    @events = @city.events.where({ date_only: Date.today..6.months.from_now })
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
