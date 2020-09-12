Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "omniauth_callbacks" }

  resource :session
  resources :games

  root to: "sessions#new"
end
