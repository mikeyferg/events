class CreatePartners < ActiveRecord::Migration
  def change
    create_table :partners do |t|
      t.string :name
      t.string :email
      t.string :image_url
      t.string :organization
      t.string :type

      t.timestamps null: false
    end
  end
end
