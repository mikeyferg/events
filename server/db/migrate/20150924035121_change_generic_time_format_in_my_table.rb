class ChangeGenericTimeFormatInMyTable < ActiveRecord::Migration
  def change
    change_column :events, :generic_time, :text
  end
end
