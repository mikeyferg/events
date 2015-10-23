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
    unless tag_name == 'new' || tag_name == 'edit' || tag_name == 'index' || tag_name == 'session' || tag_name == 'logout' || tag_name == 'users' || tag_name == 'admin' || tag_name == 'stylesheets' || tag_name == 'assets' || tag_name == 'javascripts' || tag_name == 'images'
      Tag.where(name: tag_name).first_or_create
    else
      Tag.where(name: "event").first_or_create
    end
  end
end
