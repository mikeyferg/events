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
#  date_only          :string
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  city_id            :integer
#  slug               :string
#  time_only          :time
#

require 'open-uri'
class Event < ActiveRecord::Base
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  after_create :update_image, only: :image_url

  def slug_candidates
  [
    :name,
    [:name, :venue],
    [:name, :venue, :date_only],
    [:name, :id]
  ]
  end

  attr_accessor :image

  #associates attribute :image with a file attachment
  has_attached_file :image, styles: {
    small: "64x64",
    med: "200x200",
    large: "400x400"
  }
  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

  belongs_to :city
  has_many :user_events
  has_many :users, through: :user_events

  def update_image
    # binding.pry
    if !self['image_url'].nil?
      url = self['image_url']
      new_image = URI.parse(url)
      self.update_attribute(:image, new_image)
    end
  end


end
