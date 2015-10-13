class AddCityEventsToCity < ActiveRecord::Migration
  def change
    add_column :cities, :city_events, :text, array:true, default: []
  end
end
