class RemoveCityEventsFromCities < ActiveRecord::Migration
  def change
    remove_column :cities, :city_events, :text
  end
end
