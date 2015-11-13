# == Schema Information
#
# Table name: users
#
#  id                 :integer          not null, primary key
#  name               :string
#  image_url          :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  provider           :string
#  uid                :string
#  oauth_token        :string
#  oauth_expires_at   :datetime
#  email              :string
#  slug               :string
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

require 'paperclip.rb'
class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  # after_create :update_image, only: :image_url

  def slug_candidates
  [
    :name,
    [:name, :id]
  ]
  end
  has_many :user_events
  has_many :events, through: :user_events

  def self.from_omniauth(auth)
    #binding.pry
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid      = auth.uid
      user.name     = auth.info.name
      user.image    = auth.info.image
      user.email    = auth.info.email
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save
    end
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
      self['image_url'] = "https://s3.amazonaws.com/event-images.eventcoyote/default/user.jpg"
    end
      url = self['image_url']
      new_image = URI.parse(url)
      self.update_attribute(:image, new_image)
      image_url = self.image.url
      self.update_attribute(:image_url, image_url)
  end
end
