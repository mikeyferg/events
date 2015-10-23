# == Schema Information
#
# Table name: venues
#
#  id                 :integer          not null, primary key
#  name               :string
#  address            :string
#  image_url          :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  slug               :string
#  city_id            :string
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

require 'paperclip.rb'
class Venue < ActiveRecord::Base
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  after_create :update_image, only: :image_url
  #after_save :update_image, only: :image_url

  def slug_candidates
  [
    :name,
    [:name, :address],
    [:name, :id]
  ]
  end
  has_many :events
  belongs_to :city

  def self.find_or_create_venue(venue, address)
    Venue.where(name: venue).first_or_create
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

  def update_image
    if self['image_url'].nil?
      self['image_url'] = "https://s3.amazonaws.com/event-images.eventcoyote/default/venue.jpg"
    end
      url = self['image_url']
      new_image = URI.parse(url)
      self.update_attribute(:image, new_image)
  end
end
