class RemoveVenueFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :venue, :string
  end
end
