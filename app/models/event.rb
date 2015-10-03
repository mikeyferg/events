# == Schema Information
#
# Table name: events
#
#  id                 :integer          not null, primary key
#  name               :string
#  start_time         :string
#  end_time           :string
#  venue              :string
#  summary            :text
#  image_url          :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  address            :string
#  cost               :string
#  source_url         :string
#  end_date           :string
#  start_date         :string
#  generic_time       :text
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Event < ActiveRecord::Base
# validates :name, presence: true
# validates :start_time, presence: true
# #validates :end_time, presence: true
# #validates :venue, presence: true
# validates :address, presence: true
# validates :summary, presence: true
# validates :image_url, presence: true

# associates attribute :image with a file attachment
has_attached_file :image, styles: {
  small: "64x64",
  med: "200x200",
  large: "400x400"
}

# Validate the attached image is image/jpg, image/png, etc
validates_attachment :image, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png", "image/gif"] }





  has_many :user_events
  has_many :users, through: :user_events
end
