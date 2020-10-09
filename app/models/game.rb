class Game < ApplicationRecord
  belongs_to :current_airport, class_name: "Airport"
  has_many :missions, dependent: :destroy

  validates_presence_of :current_airport

  attr_reader :starting_airport

  def current_mission
    missions.where(completed_at: nil).last
  end

  def starting_airport=(airport_name)
    @starting_airport = airport_name
    self.current_airport = Airport.find_by_name(airport_name)
  end

  def name=(name)
    super
    self.slug = name.parameterize
  end

  def tick(user, simvars)
    lat, lng, heading = simvars.values_at("PLANE LATITUDE", "PLANE LONGITUDE", "PLANE HEADING DEGREES TRUE")

    payload = {
      lat: lat,
      lng: lng,
      heading: heading,
    }

    GamesChannel.broadcast_to(user, payload)
  end
end
