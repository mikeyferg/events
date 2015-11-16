# == Schema Information
#
# Table name: partner_venues
#
#  id         :integer          not null, primary key
#  partner_id :integer
#  venue_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PartnerVenue < ActiveRecord::Base
  belongs_to :partner
  belongs_to :venue
end
