# == Schema Information
#
# Table name: venues
#
#  id                 :integer          not null, primary key
#  name               :string
#  address            :string
#  image_url          :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  slug               :string
#  city_id            :string
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

require 'test_helper'

class VenueTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
