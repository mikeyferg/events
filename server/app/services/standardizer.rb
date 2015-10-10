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

  puts date_splitter("Thu Oct 29")

end
