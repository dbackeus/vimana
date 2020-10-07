class AirportsController < ActionController::API
  def self.airports_json
    @airports_json ||= Oj.dump(Airport.select(:ident, :name, :size, :position).all.map do |airport|
      {
        "ident" => airport.ident,
        "name" => airport.name,
        "size" => airport.size,
        "lat" => airport.position.latitude,
        "lng" => airport.position.longitude,
      }
    end)
  end

  def index
    render json: self.class.airports_json
  end
end
