class AddPaperclipToVenue < ActiveRecord::Migration
  def change
    add_attachment :venues, :image
  end
end
