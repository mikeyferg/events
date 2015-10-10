module Standardizer
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
# month = case month_abbrev
# when "Jan"
#   "January"
# when "Feb"
#   "February"
# when "Mar"
#   "March"
# when "Apr"
#   "April"
# when "May"
#   "May"
# when "Jun"
#   "June"
# when "Jul"
#   "July"
# when "Aug"
#   "August"
# when "Sep"
#   "September"
# when "Oct"
#   "October"
# when "Sep"
#   "September"
# when "Oct"
#   "October"
# when "Nov"
#   "November"
# when "Dec"
#   "December"
# else
#   ""
# end
#
# day = date_array[2]
#
# puts day_of_week, month, day
require 'date'

  def self.date_splitter(date)
    date_array = date.split
    DateTime.strptime(date_array[2] + date_array[1], '%d %b')
  end

  def self.start_time_regex(time)
    time[/(?i)[0-2]?\d(?::[0-5]\d)?\s*[ap]m/]
  end

  # input = "7:30 pm -9 pm Lorem Ipsum is simply dummy text. 9pm-10pm Lorem Ipsum is simply dummy text"
  # puts input[/(?i)[0-2]?\d(?::[0-5]\d)?\s*[ap]m/]
end



# time = "7:30 pm -9 pm Lorem Ipsum is simply dummy text. 9pm-10pm Lorem Ipsum is simply dummy text"
# start_time_regex(time)
