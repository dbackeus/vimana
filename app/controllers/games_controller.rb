class GamesController < ApplicationController
  before_action :authenticate_user!

  def index
    redirect_to current_user.game || new_game_path
  end

  def new
    @game = current_user.build_game
  end

  def create
    game_params = params.require(:game).permit(:starting_airport, :name)

    @game = current_user.build_game(game_params)

    if @game.save
      redirect_to @game
    else
      render "new"
    end
  end

  def show
    @game = current_user.game
    @nearby_airports = Airport.within(@game.current_airport.position, 50).where(size: 2..) - [@game.current_airport]
    render layout: false
  end
end
