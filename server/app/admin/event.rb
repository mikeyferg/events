ActiveAdmin.register Event do
require 'tag.rb'

controller do
  def find_resource
    scoped_collection.where(slug: params[:id]).first!
  end
end

index do
    column :id
    column :name
    column :venue
    column :image_url
    column :source_url
    column :address
    column :cost
    column :featured
    column :city
    column :tags
    column :start_date_time_array
    actions
end

  active_admin_importable do |model, hash|
    def page_url(hash, page)
      case page
      when "sfstation.com"
          SfStation.add_event(hash)
      when "Another Planet Entertainment"
          Ape.add_event(hash)
      else
          nil
      end
    end
    page_url(hash, hash[:page].to_s)
   end

end
