class AddGenericDateToEvents < ActiveRecord::Migration
  def change
    add_column :events, :generic_date, :string
  end
end
