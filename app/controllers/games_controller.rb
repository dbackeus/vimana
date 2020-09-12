class GamesController < ApplicationController
  before_action :authenticate_user!

  def index
    redirect_to current_user.game || new_game_path
  end

  def new
    @game = Game.new
  end
end
