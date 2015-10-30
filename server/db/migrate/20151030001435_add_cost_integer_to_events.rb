class AddCostIntegerToEvents < ActiveRecord::Migration
  def change
    add_column :events, :cost_integer, :integer
  end
end
