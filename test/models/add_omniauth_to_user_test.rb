# == Schema Information
#
# Table name: add_omniauth_to_users
#
#  id               :integer          not null, primary key
#  provider         :string
#  uid              :string
#  oauth_token      :string
#  oauth_expires_at :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

require 'test_helper'

class AddOmniauthToUserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
