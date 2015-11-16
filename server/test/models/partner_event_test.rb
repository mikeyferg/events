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

require 'test_helper'

class PartnerEventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
