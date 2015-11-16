# == Schema Information
#
# Table name: partner_events
#
#  id         :integer          not null, primary key
#  partner_id :integer
#  event_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PartnerEvent < ActiveRecord::Base
  belongs_to :partner
  belongs_to :event
end
