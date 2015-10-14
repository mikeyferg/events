class UpdateTimeColumnName < ActiveRecord::Migration
  def change
    rename_column :events, :generic_time, :time_only
    rename_column :events, :start_date, :date_only
  end
end
