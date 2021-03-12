class SessionsController < ApplicationController
  def new
    redirect_to games_path if user_signed_in?
  end

  if Rails.env.development?
    def dev_login
      sign_in User.first

      redirect_to games_path
    end
  end

  def destroy
    sign_out

    redirect_to root_path, notice: "User signed out"
  end
end
