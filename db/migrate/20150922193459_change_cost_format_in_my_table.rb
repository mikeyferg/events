class ChangeCostFormatInMyTable < ActiveRecord::Migration
  def change
    change_column :events, :cost, :string
  end
end
