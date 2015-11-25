# == Schema Information
#
# Table name: event_times
#
#  id         :integer          not null, primary key
#  start_time :datetime
#  event_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class EventTime < ActiveRecord::Base
  belongs_to :event
end
