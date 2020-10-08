class Mission < ApplicationRecord
  belongs_to :game
  belongs_to :starting_airport, class_name: "Airport"
  belongs_to :destination_airport, class_name: "Airport"

  def serializable_hash(*args)
    super(include: %i[starting_airport destination_airport])
  end

  def tick(user, simvars)
    return if completed_at

    touchdown_lat, touchdown_lng = simvars.values_at("PLANE TOUCHDOWN LATITUDE", "PLANE TOUCHDOWN LONGITUDE")
    last_touchdown_position = RGeo::Geographic.spherical_factory.point(touchdown_lng, touchdown_lat)

    if started_at.nil?
      if starting_airport.area.contains?(last_touchdown_position)
        update_and_broadcast(user, started_at: Time.now)
      end
    elsif completed_at.nil?
      if destination_airport.area.contains?(last_touchdown_position)
        update_and_broadcast(user, completed_at: Time.now)
        game.update_attributes!(current_airport: destination_airport)
      end
    end
  end

  private

  def update_and_broadcast(user, attributes)
    update!(attributes)
    MissionChannel.broadcast_to(user, self.as_json)
  end
end
