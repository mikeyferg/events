# == Schema Information
#
# Table name: events
#
#  id           :integer          not null, primary key
#  name         :string
#  start_time   :string
#  end_time     :string
#  venue        :string
#  summary      :text
#  image_url    :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  address      :string
#  cost         :string
#  source_url   :string
#  end_date     :string
#  start_date   :string
#  generic_time :text
#

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
