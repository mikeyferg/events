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
      column :date_only
      column :time_only
      column :start_date_time
      column :venue
      # column :summary
      column :image_url
      column :source_url
      column :address
      column :cost
      column :featured
      column :city
      column :tags
      # column :schedule
      actions
  end

  active_admin_importable do |model, hash|
    if hash[:date_only].nil? || hash[:time_only].nil? #|| hash[:date_only].include? "passed" || hash[:date_only].include? "No Date"
      next
    elsif Event.date_splitter(hash[:date_only]).nil?
      next
    else
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

      #for date_only and time_only attributes
      date_only = Event.date_splitter(hash[:date_only])
      time_only = Time.parse(Event.start_time_regex(hash[:time_only])) rescue nil
      #for combining date and time to create start_date_time
        date_array = hash[:date_only].split(" ")
        time = Event.start_time_regex(hash[:time_only])
      start_date_time = date_time_combiner(date_array, time)


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
      # page_url = hash[:pageurl]
      page_url = nil
      unless hash[:address].nil?
        address = hash[:address].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
      else
        address = nil
      end
      cost = hash[:cost]#.encode(Encoding.find('UTF-8'), {invalidexit!: :replace, undef: :replace, replace: ''})
      unless hash[:event_url].nil?
        source_url = hash[:event_url]
      else
        source_url = nil
      end
      city_id = 1
      if hash[:tags].nil?
        tags = ["fun"]
      else
        tags = hash[:tags].split(" ")
      end
      unless hash[:schedule].nil?
        schedule = hash[:schedule].split(");")
      else
        schedule = []
      end

      event = Event.create_update_event(hash, name, time_only, venue, image_url, page_url, summary, address, cost, source_url, date_only, city_id, tags, schedule, start_date_time)

      if schedule.length > 0 && schedule[0] != "Event has passed"
        schedule.each do |instance|
          date = date_regex(instance)
          time = Event.start_time_regex(instance)
          if date == "Mon Feb 29"
            next
          elsif date.nil? || time.nil?
            next
          else
            date_only = Event.date_splitter(date)
            time_only = Time.parse(Event.start_time_regex(time)) rescue nil

            date_array = date.split(" ")
            time = Event.start_time_regex(time)
            start_date_time = date_time_combiner(date_array, time)
      
            event = Event.create_update_event(hash, name, time_only, venue, image_url, page_url, summary, address, cost, source_url, date_only, city_id, tags, schedule, start_date_time)
          end

        end
      end
    end
  end

  def date_time_combiner(date, time)
    # binding.pry
    Time.parse(date[0] + " " + date[2] + " " + date[1] + " " + time + " "+ Time.now.year.to_s)
  end

  def date_regex(date)

    date_match = date[/(?i)(mon|tue|wed|thu|fri|sat|sun)\s*(jan|feb|mar|apr|may|jun|jul|sep|oct|nov|dec)\s*\d*/]
    if date_match.blank?
        nil
    else
      date_match
    end
  end



end
