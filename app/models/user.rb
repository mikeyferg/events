# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  name       :string
#  pic_url    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ActiveRecord::Base
  validates :name, presence: true
  validates :pic_url, presence: true

  has_many :user_events
  has_many :events, through: :user_events
end
