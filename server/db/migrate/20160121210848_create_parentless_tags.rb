class CreateParentlessTags < ActiveRecord::Migration
  def change
    create_table :parentless_tags do |t|
      t.string :name
      
      t.timestamps null: false
    end
  end
end
