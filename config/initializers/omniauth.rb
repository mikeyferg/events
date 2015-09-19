OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['facebook_app_id'], ENV['facebook_secret'],
    :scope => 'email', :info_fields => 'name,email', :display => 'popup'
end
