# == Schema Information
#
# Table name: events
#
#  id         :integer          not null, primary key
#  name       :string
#  start_time :datetime
#  end_time   :datetime
#  venue      :string
#  summary    :text
#  image_url  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  address    :string
#  cost       :integer
#

class Event < ActiveRecord::Base
# validates :name, presence: true
# validates :start_time, presence: true
# #validates :end_time, presence: true
# #validates :venue, presence: true
# validates :address, presence: true
# validates :summary, presence: true
# validates :image_url, presence: true





  has_many :user_events
  has_many :users, through: :user_events
end
