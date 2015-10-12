module Standardizer

  require 'date'
  require 'time'
  require 'active_support/time'
# def date_split(date)
#   date.split
# end
#
# date_array = date_split("Thu Oct 29")
#
# day_abbrev = date_array[0]
# day_of_week = case day_abbrev
# when "Mon"
#   "Monday"
# when "Tue"
#   "Tuesday"
# when "Wed"
#   "Wednesday"
# when "Thu"
#   "Thursday"
# when "Fri"
#   "Friday"
# else
#   ""
# end
#
#
#
#
# month_abbrev = date_array[1]
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
#
# day = date_array[2]
#
# puts day_of_week, month, day


  def self.date_splitter(date)
    date_array = date.split
    # DateTime.strptime(date_array[2] + date_array[1], '%d %b')
    #binding.pry
    Date.new(Time.now.year, month_conversion(date_array[1]), date_array[2].to_i)
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
