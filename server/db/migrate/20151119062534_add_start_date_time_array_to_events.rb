class AddStartDateTimeArrayToEvents < ActiveRecord::Migration
  def change
    add_column :events, :start_date_time_array, :string, array:true, default: []
  end
end
