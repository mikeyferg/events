class AddGenericTimeToEvents < ActiveRecord::Migration
  def change
    add_column :events, :generic_time, :string
  end
end
