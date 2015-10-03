Rails.application.routes.draw do
  root 'events#index', defaults: {format: :json}
  match 'auth/:provider/callback', to: 'kimonos_webhooks#create', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'signout', to: 'sessions#destroy', as: 'signout', via: [:get, :post]

  resources :events, defaults: {format: :json}
  match 'users/me', to: 'users#me', via: :get
  resources :users, defaults: {format: :json}
  resources :kimonos_webhooks

end
