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
      "PLANE IN PARKING STATE" => "Boolean",
      "PLANE TOUCHDOWN LATITUDE" => "degrees latitude",
      "PLANE TOUCHDOWN LONGITUDE" => "degrees longitude",
    }
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def set_variables(data)
    variables = data.fetch("variables")
    payload = {
      lat: variables.fetch("PLANE LATITUDE"),
      lng: variables.fetch("PLANE LONGITUDE"),
      heading: variables.fetch("PLANE HEADING DEGREES TRUE"),
    }

    GamesChannel.broadcast_to(current_user, payload)
  end
end
