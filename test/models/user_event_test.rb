# == Schema Information
#
# Table name: user_events
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  event_id   :string
#  integer    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class UserEventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
