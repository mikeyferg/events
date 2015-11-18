require 'event.rb'

module Ape

  def self.add_event(hash)
    if hash[:date_only].nil? || hash[:time_only].nil? || hash[:name].nil?
      nil
    elsif Ape.date_splitter(hash[:date_only]).nil? || Ape.start_time_regex(hash[:time_only]).nil?
      nil
    elsif hash[:address].nil? && hash[:venue].nil?
      nil
    else
      name = hash[:name].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
      #for date_only and time_only attributes
        #sfstation specific
      date_only = Ape.date_splitter(hash[:date_only])
      time_only = Time.parse(Ape.start_time_regex(hash[:time_only])) rescue nil
      city_id = 1
      #for combining date and time to create start_date_time
        date_array = hash[:date_only].split(" ")
        time = Ape.start_time_regex(hash[:time_only])
      start_date_time = date_time_combiner(date_array, time)

      address = hash[:address].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''}) unless hash[:address].nil?
      venue = hash[:venue].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''}) unless hash[:venue].nil?
      summary = hash[:summary].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''}) unless hash[:summary].nil?
      image_url = hash[:image_url]
      cost = hash[:cost]
      source_url = hash[:event_url]
      tags = ["music concert show"]


      event = Event.create_update_event(name, date_only, time_only, city_id,
        venue: venue || nil,
        image_url: image_url,
        summary: summary || nil,
        address: address || nil,
        cost: cost,
        source_url: source_url,
        date_only: date_only,
        city_id: city_id,
        tags: tags,
        start_date_time: start_date_time,
        featured: true
      )

    end
  end


  #-----------------sfstation date normalizers---------------------
    def self.date_splitter(date)

      date_array = date.split
      month = Ape.month_conversion(date_array[1])
      day = date_array[2].to_i
      year = date_array[3].to_i
      Date.new(year, month, day)
    end

    def self.month_conversion(month)
      case month
      when "January"
        1
      when "February"
        2
      when "March"
        3
      when "April"
        4
      when "May"
        5
      when "June"
        6
      when "July"
        7
      when "August"
        8
      when "September"
        9
      when "October"
        10
      when "November"
        11
      when "December"
        12
      else
        ""
      end
    end
#----------------------------------------------------
#sfstation time normalizers --------------------------------------

def self.start_time_regex(time)
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
end
#-----------------------------------------
  def self.date_time_combiner(date, time)
    Time.parse(date[0] + " " + date[2] + " " + date[1] + " " + time + " "+ Time.now.year.to_s)
  end



end
