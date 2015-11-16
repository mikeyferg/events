class CreatePartnerEvents < ActiveRecord::Migration
  def change
    create_table :partner_events do |t|
      t.integer :partner_id
      t.integer :event_id

      t.timestamps null: false
    end
  end
end
