# == Schema Information
#
# Table name: events
#
#  id                    :integer          not null, primary key
#  name                  :string
#  end_time              :string
#  summary               :text
#  image_url             :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  address               :string
#  cost                  :string
#  source_url            :string
#  end_date              :string
#  image_file_name       :string
#  image_content_type    :string
#  image_file_size       :integer
#  image_updated_at      :datetime
#  city_id               :integer
#  slug                  :string
#  time_only             :time
#  featured              :boolean
#  page_url              :string
#  venue_id              :integer
#  schedule              :text
#  cost_integer          :integer
#  date_only             :date
#  start_date_time       :datetime
#  start_date_time_array :string           default([]), is an Array
#

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
