class ChangeGenericDateName < ActiveRecord::Migration
  def change
    rename_column :events, :generic_date, :start_date
  end
end
