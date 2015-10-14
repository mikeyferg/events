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

class AddOmniauthToUser < ActiveRecord::Base
end
