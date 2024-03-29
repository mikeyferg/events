Rails.application.routes.draw do
  get 'venues/show'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # root 'events#index', city_id: 1, defaults: {format: :json}
  root :to => redirect('/cities/1')
  match 'auth/:provider/callback', to: 'kimonos_webhooks#create', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'signout', to: 'sessions#destroy', as: 'signout', via: [:get, :post]

  match '/sitemap.xml', to: 'sitemaps#show', via: [:get, :post]

  #resources :events, defaults: {format: :json}
  match 'users/me', to: 'users#me', via: :get
  resources :users, defaults: {format: :json}
  resources :partners, defaults: {format: :json}
  resources :kimonos_webhooks
  resources :cities, defaults: {format: :json}
  resources :events, defaults: {format: :json}
  resources :venues, defaults: {format: :json}

  match 'admin/events/import_from_sfstation', to: 'events#import_from_sfstation', via: :post
  match 'admin/events/import_from_apeconcerts', to: 'events#import_from_apeconcerts', via: :post
end
