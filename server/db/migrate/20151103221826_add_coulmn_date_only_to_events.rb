class AddCoulmnDateOnlyToEvents < ActiveRecord::Migration
  def change
    add_column :events, :date_only, :date
  end
end
