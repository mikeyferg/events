class FixColumnName < ActiveRecord::Migration
  def change
    rename_column :users, :pic_url, :image
  end
end
