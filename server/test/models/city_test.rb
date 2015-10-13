# == Schema Information
#
# Table name: cities
#
#  id          :integer          not null, primary key
#  name        :string
#  nickname    :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  city_events :text             default([]), is an Array
#  slug        :string
#

require 'test_helper'

class CityTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end