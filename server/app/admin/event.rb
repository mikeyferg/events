ActiveAdmin.register Event do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if resource.something?
#   permitted
# end
controller do
  def find_resource
    scoped_collection.where(slug: params[:id]).first!
  end
end

  index do
      column :name
      column :date_only
      column :time_only
      column :venue
      column :summary
      column :image_url
      column :address
      column :cost
      column :source_url
      column :slug
      column :featured
      column :city
      actions
  end

  active_admin_importable do |model, hash|
    # hash[:date_only] = Standardizer.date_splitter(hash[:date_only])
    # hash[:time_only] = Standardizer.start_time_regex(hash[:time_only])
    # hash[:summary] = hash[:summary].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
    unless hash[:name].nil?
      name = hash[:name].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
    else
      name = nil
    end
    date_only = Standardizer.date_splitter(hash[:date_only])
    time_only = Standardizer.start_time_regex(hash[:time_only])
  #  binding.pry
    unless hash[:venue].nil?
      venue = hash[:venue].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
    else
      venue = nil
    end
    unless hash[:summary].nil?
      summary = hash[:summary].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
    else
      summary = nil
    end
    image_url = hash[:image_url]
    unless hash[:address].nil?
      address = hash[:address].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
    else
      address = nil
    end
    cost = hash[:cost]#.encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
    source_url = nil
    city_id = 1
    event = Kimono.create_update_event(hash, name, time_only, venue, image_url, summary, address, cost, source_url, date_only, city_id)
    city = City.find(city_id)
    city.city_events_will_change!
    city.city_events << event['id']
    city.save
    #model.create!(hash)
  end


end
