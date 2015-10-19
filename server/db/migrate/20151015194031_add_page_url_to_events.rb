class AddPageUrlToEvents < ActiveRecord::Migration
  def change
    add_column :events, :page_url, :string
  end
end
