# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  name             :string
#  image            :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  provider         :string
#  uid              :string
#  oauth_token      :string
#  oauth_expires_at :datetime
#  email            :string
#

class User < ActiveRecord::Base
  # validates :name, presence: true
  # validates :pic_url, presence: true

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
end
