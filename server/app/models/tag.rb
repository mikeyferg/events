# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  slug       :string
#

class Tag < ActiveRecord::Base
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  def slug_candidates
  [
    [:name],
    [:name, :id]
  ]
  end
  has_many :event_tags
  has_many :events, through: :event_tags

  def self.find_or_create_tag(tag_name)
    tag_downcase = tag_name.downcase
    unless tag_downcase == 'new' || tag_downcase == 'edit' || tag_downcase == 'index' || tag_downcase == 'session' || tag_downcase == 'logout' || tag_downcase == 'users' || tag_downcase == 'admin' || tag_downcase == 'stylesheets' || tag_downcase == 'assets' || tag_downcase == 'javascripts' || tag_downcase == 'images'
      Tag.where(name: tag_name).first_or_create
    else
      Tag.where(name: "event").first_or_create
    end
  end
end
