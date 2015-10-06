source 'https://rubygems.org'
ruby "2.2.0"

#Core Libraries
gem 'rails', '4.2.4'
gem 'pg'

#Front End Tools
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'bootstrap-sass', '~> 3.3.5'
gem 'simple_form'
gem 'jquery-rails'
gem 'rack-cors', :require => 'rack/cors'

#Other
gem 'turbolinks'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'figaro'
gem 'omniauth-facebook'
gem 'rest-client', '~> 1.8.0'
gem 'aws-sdk', '< 2.0'
gem "paperclip", "~> 4.3"


#Debugging & Test Suite
group :development, :test do
  gem 'byebug', '~> 1.1.1'
  gem 'pry'
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'binding_of_caller'
  gem 'better_errors'
  gem 'annotate'

end

group :production do
  #gem 'pg'
  gem 'rails_12factor'
end
