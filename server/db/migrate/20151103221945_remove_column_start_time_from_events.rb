class RemoveColumnStartTimeFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :start_time
  end
end
