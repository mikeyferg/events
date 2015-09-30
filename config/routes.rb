Rails.application.routes.draw do
  root 'events#index', defaults: {format: :json}
  match 'auth/:provider/callback', to: 'kimonos_webhooks#create', via: [:get, :post]
  #match 'auth/kimono/callback', to: 'sessions#create', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'signout', to: 'sessions#destroy', as: 'signout', via: [:get, :post]

  #resources :events
  #defaults format: 'json' {resources :events; resources :users}
  resources :events, defaults: {format: :json}
  resources :users, defaults: {format: :json}
  resources :kimonos_webhooks

end
