class ChangeDataTypeForTimeOnly < ActiveRecord::Migration
  def change
    change_column :events, :time_only,  :string
  end
end
