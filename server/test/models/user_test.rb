# == Schema Information
#
# Table name: users
#
#  id                 :integer          not null, primary key
#  name               :string
#  image_url          :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  provider           :string
#  uid                :string
#  oauth_token        :string
#  oauth_expires_at   :datetime
#  email              :string
#  slug               :string
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
