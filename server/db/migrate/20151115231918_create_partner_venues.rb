class CreatePartnerVenues < ActiveRecord::Migration
  def change
    create_table :partner_venues do |t|
      t.integer :partner_id
      t.integer :venue_id

      t.timestamps null: false
    end
  end
end
