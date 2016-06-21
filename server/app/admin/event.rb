ActiveAdmin.register Event do
  require 'tag.rb'

  filter :name
  filter :image_url
  filter :source_url
  filter :created_at
  filter :updated_at

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

    column :start_date_time_array do |event|
      event.start_date_time_array.map do |datetime|
        DateTime.parse(datetime).to_s(:short) rescue nil
      end.compact.join(', ')
    end

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
