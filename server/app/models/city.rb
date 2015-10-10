# == Schema Information
#
# Table name: cities
#
#  id         :integer          not null, primary key
#  name       :string
#  nickname   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class City < ActiveRecord::Base
  has_many :events
end
