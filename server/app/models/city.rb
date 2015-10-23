# == Schema Information
#
# Table name: cities
#
#  id         :integer          not null, primary key
#  name       :string
#  nickname   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  slug       :string
#

class City < ActiveRecord::Base
  has_many :events
  has_many :venues

  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  def slug_candidates
  [
    :nickname,
    [:nickname, :name],
    [:name, :id]
  ]
  end

end
