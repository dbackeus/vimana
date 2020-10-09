class SimConnectChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    transmit request: {
      "PLANE ALTITUDE" => "feet",
      "PLANE HEADING DEGREES TRUE" => "degrees",
      "PLANE LATITUDE" => "degrees latitude",
      "PLANE LONGITUDE" => "degrees longitude",
      "PLANE ALT ABOVE GROUND" => "feet",
      "PLANE PITCH DEGREES" => "degrees",
      "PLANE BANK DEGREES" => "degrees",
      "SIM ON GROUND" => "Boolean",
      "GROUND VELOCITY" => "knots",
      "BRAKE PARKING INDICATOR" => "Boolean",
      "PLANE TOUCHDOWN LATITUDE" => "degrees latitude",
      "PLANE TOUCHDOWN LONGITUDE" => "degrees longitude",
    }
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def set_variables(data)
    simvars = data.fetch("variables")
    game.tick(current_user, simvars)
    current_mission.tick(current_user, simvars)
  end

  private

  def game
    @game ||= current_user.game
  end

  def current_mission
    @current_mission ||= game.current_mission
  end
end
