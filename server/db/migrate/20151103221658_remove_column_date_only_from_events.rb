class RemoveColumnDateOnlyFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :date_only
    
  end
end
