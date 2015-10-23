ActiveAdmin.register Event do
require 'tag.rb'

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
      column :page_url
      column :address
      column :cost
      column :source_url
      column :slug
      column :featured
      column :city
      column :tags
      column :schedule
      actions
  end

  active_admin_importable do |model, hash|
    unless hash[:name].nil?
      name = hash[:name].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
    else
      name = nil
    end
    unless hash[:address].nil?
      address = hash[:address].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
    else
      address = nil
    end
    date_only = Event.date_splitter(hash[:date_only])
    time_only = Event.start_time_regex(hash[:time_only])
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
    page_url = hash[:page_url]
    unless hash[:address].nil?
      address = hash[:address].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
    else
      address = nil
    end
    cost = hash[:cost]#.encode(Encoding.find('UTF-8'), {invalidexit!: :replace, undef: :replace, replace: ''})
    source_url = nil
    city_id = 1

      tags = hash[:tags].split(" ")

    unless hash[:schedule].nil?
      schedule = hash[:schedule].split(");")
    else
      schedule = []
    end
    event = Event.create_update_event(hash, name, time_only, venue, image_url, page_url, summary, address, cost, source_url, date_only, city_id, tags, schedule)
    # tags = hash[:tags].split(" ")
    if schedule.length > 0 && schedule[0] != "Event has passed"
      schedule.each do |date|
        # binding.pry
        if !date.include? "Feb 29"
          date_only = Event.date_splitter(date)
        else
          date_only = "Feb 28"
        end
        event = Event.create_update_event(hash, name, time_only, venue, image_url, page_url, summary, address, cost, source_url, date_only, city_id, tags, schedule)
      end
    end

  end


end
