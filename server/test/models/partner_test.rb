# == Schema Information
#
# Table name: partners
#
#  id           :integer          not null, primary key
#  name         :string
#  email        :string
#  image_url    :string
#  organization :string
#  type         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  slug         :string
#

require 'test_helper'

class PartnerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
