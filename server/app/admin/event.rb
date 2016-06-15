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

  # Import buttons
  sidebar :Sfstation do
    button_to 'Import from Sfstation.com', '/admin/events/import_from_sfstation',
              method: :post, confirm: 'Are you sure?'
  end

  sidebar :Apeconcerts do
    button_to 'Import from Apeconcerts.com', '/admin/events/import_from_apeconcerts',
              method: :post, confirm: 'Are you sure?'
  end

  # Import methods
  collection_action :import_from_sfstation, method: :post do
    system 'rake scrape:import_from_sfstation'
    redirect_to admin_events_path,
                notice: 'Import from Sfstation.com has been successfully completed!'
  end

  collection_action :import_from_apeconcerts, method: :post do
    system 'rake scrape:import_from_apeconcerts'
    redirect_to admin_events_path,
                notice: 'Import from Apeconcerts.com has been successfully completed!'
  end
end
