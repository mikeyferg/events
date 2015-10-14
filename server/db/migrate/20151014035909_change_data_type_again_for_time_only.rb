class ChangeDataTypeAgainForTimeOnly < ActiveRecord::Migration
  def change
    remove_column :events, :time_only
    add_column :events, :time_only, :time
  end


end
