class SessionsController < ApplicationController
  def new
    redirect_to games_path if user_signed_in?
  end

  def destroy
    session.clear
    cookies[:remember_user_token].clear

    redirect_to root_path, notice: "User signed out"
  end
end
