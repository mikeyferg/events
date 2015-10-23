# == Schema Information
#
# Table name: events
#
#  id                 :integer          not null, primary key
#  name               :string
#  start_time         :string
#  end_time           :string
#  summary            :text
#  image_url          :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  address            :string
#  cost               :string
#  source_url         :string
#  end_date           :string
#  date_only          :string
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  city_id            :integer
#  slug               :string
#  time_only          :time
#  featured           :boolean
#  page_url           :string
#  venue_id           :integer
#  schedule           :text
#

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
