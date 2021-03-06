class MissionsController < ActionController::API
  before_action :authenticate_user!

  def create
    starting_airport_id = current_user.game.current_airport_id
    destination_airport_id = Airport.
      where(ident: params["mission"]["destination_airport_ident"]).
      limit(1).
      pluck(:id).
      first

    mission = current_user.game.missions.create(
      starting_airport_id: starting_airport_id,
      destination_airport_id: destination_airport_id,
      description: params["mission"]["description"],
    )

    render json: mission
  end
end
