Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "omniauth_callbacks" }

  resource :session
  resources :games
  resources :airports, only: :index
  resources :missions, only: :create

  root to: "sessions#new"
end
