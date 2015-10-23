class RenameImageinUsersToImageUrl < ActiveRecord::Migration
  def change
    rename_column :users, :image, :image_url
  end
end
