class MakeTimeOnlyNullable < ActiveRecord::Migration
  def change
    change_column_null :events, :time_only, true
  end
end
