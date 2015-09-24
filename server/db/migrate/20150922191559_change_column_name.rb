class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :events, :generic_time, :end_date
  end
end
