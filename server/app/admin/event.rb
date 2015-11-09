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
    column :image_url
    column :source_url
    column :address
    column :cost
    column :featured
    column :city
    column :tags
    column :schedule
    actions
end

  active_admin_importable do |model, hash|
    if hash[:date_only].nil? || hash[:time_only].nil?
      next
    elsif date_splitter(hash[:date_only]).nil?
      next
    elsif time = start_time_regex(hash[:time_only]).nil?
      next
    else
      name = hash[:name].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
      #for date_only and time_only attributes
      date_only = date_splitter(hash[:date_only])
      time_only = Time.parse(start_time_regex(hash[:time_only])) rescue nil
      city_id = 1
      #for combining date and time to create start_date_time
        date_array = hash[:date_only].split(" ")
        time = start_time_regex(hash[:time_only])
      start_date_time = date_time_combiner(date_array, time)
      address = hash[:address].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
      venue = hash[:venue].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
      summary = hash[:summary].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
      image_url = hash[:image_url]
      # :page_url => nil
      address = hash[:address].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
      cost = hash[:cost]
      source_url = hash[:event_url]
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
      event = Event.create_update_event(name, date_only, time_only, city_id,
        venue: venue,
        image_url: image_url,
        summary: summary,
        address: address,
        cost: cost,
        source_url: source_url,
        date_only: date_only,
        city_id: city_id,
        tags: tags,
        schedule: schedule,
        start_date_time: start_date_time
      )
      if schedule.length > 0 && schedule[0] != "Event has passed"
        schedule.each do |instance|
          date = date_regex(instance)
          time = start_time_regex(instance)
          if date == "Mon Feb 29"
            next
          elsif date.nil? || time.nil?
            next
          else
            date_only = date_splitter(date)
            time_only = Time.parse(start_time_regex(time)) rescue nil
            date_array = date.split(" ")
        
            start_date_time = date_time_combiner(date_array, time)
            event = Event.create_update_event(name, date_only, time_only, city_id,
              venue: venue,
              image_url: image_url,
              summary: summary,
              address: address,
              cost: cost,
              source_url: source_url,
              date_only: date_only,
              city_id: city_id,
              tags: tags,
              schedule: schedule,
              start_date_time: start_date_time
            )
          end
        end
      end
     end
  end


  #-----------------sfstation date normalizers---------------------
    def date_splitter(date)
      if date.include? "passed"
        nil
      elsif date.include? "No Date"
        nil
      else
        date_array = date.split
        month = month_conversion(date_array[1])
        day = date_array[2].to_i
        Date.new(Time.now.year, month, day)
      end
    end
    def month_conversion(month)
      case month
      when "Jan"
        1
      when "Feb"
        2
      when "Mar"
        3
      when "Apr"
        4
      when "May"
        5
      when "Jun"
        6
      when "Jul"
        7
      when "Aug"
        8
      when "Sep"
        9
      when "Oct"
        10
      when "Nov"
        11
      when "Dec"
        12
      else
        ""
      end
    end
#----------------------------------------------------
#sfstation time normalizers --------------------------------------

def start_time_regex(time)
  if time.nil?
    nil
  else
    time_match = time.match(/(?i)([0-2]?\d?(?::[0-5]\d)?)([ap]m)?\s?(?=-)(?:-\s?[0-2]?\d?(?::[0-5]\d)?\s?([ap]m))|([0-2]?\d?(?::[0-5]\d)?)\s?([ap]m)/)
    if time_match.blank? || ((time_match[1].nil? || time_match[2].nil?) && (time_match[1].nil? || time_match[3].nil?) && (time_match[4].nil? || time_match[5].nil?))
      nil
    else
      time_regex = time_match.captures
      if time_regex[0].nil?
        time_regex[3] + time_regex[4]
      elsif time_regex[1].nil?
        time_regex[0] + time_regex[2]
      else
        time_regex[0] + time_regex[1]
      end
    end
  end
  # Time.parse(time) rescue nil
end
#-----------------------------------------
#sfstation schedule normalizerså
  def date_time_combiner(date, time)
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
