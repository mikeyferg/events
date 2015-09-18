class CreateUserEvents < ActiveRecord::Migration
  def change
    create_table :user_events do |t|
      t.integer :user_id
      t.string :event_id
      t.string :integer

      t.timestamps null: false
    end
  end
end
