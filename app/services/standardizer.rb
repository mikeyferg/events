module Standardizer

  require 'date'
  require 'time'
  require 'active_support/time'

  def self.month_conversion(month)
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

  def self.date_splitter(date)
    if date.include? "passed"
      date = "Tue Sep 1"
    end
    date_array = date.split
    month = month_conversion(date_array[1])
    day = date_array[2].to_i
    Date.new(Time.now.year, month, day)
  end

  def self.start_time_regex(time)
    time_regex = time[/(?i)[0-2]?\d(?::[0-5]\d)?\s*[ap]m/]
    if time_regex.nil?
      time = "12:00am"
    else
      time = time_regex
    end
    Time.parse(time)
  end

  def self.date_time(date, time)
    DateTime.new(date.year, date.month, date.day, time.hour, time.min)
  end

end