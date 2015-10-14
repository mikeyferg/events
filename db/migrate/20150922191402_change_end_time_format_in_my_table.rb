class ChangeEndTimeFormatInMyTable < ActiveRecord::Migration
  def change
    change_column :events, :end_time, :string
  end
end
