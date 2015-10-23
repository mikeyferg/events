class AddCityIdToVenues < ActiveRecord::Migration
  def change
    add_column :venues, :city_id, :string
    add_column :venues, :integer, :string
  end
end
