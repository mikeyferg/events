# == Schema Information
#
# Table name: events
#
#  id         :integer          not null, primary key
#  name       :string
#  start_time :datetime
#  end_time   :datetime
#  venue      :string
#  summary    :text
#  image_url  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  address    :string
#  cost       :integer
#

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
