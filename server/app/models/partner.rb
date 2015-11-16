# == Schema Information
#
# Table name: partners
#
#  id           :integer          not null, primary key
#  name         :string
#  email        :string
#  image_url    :string
#  organization :string
#  type         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  slug         :string
#

class Partner < ActiveRecord::Base
  has_many :partner_events
  has_many :events, through: :partner_events

  has_many :partner_venues
  has_many :venues, through: :partner_venues

  # slug creation
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  def slug_candidates
  [
    :name,
    [:name, :organization],
    [:name, :organization, :id],
  ]
  end
end
