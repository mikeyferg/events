class RemoveIntegerFromVenues < ActiveRecord::Migration
  def change
    remove_column :venues, :integer, :string
  end
end
