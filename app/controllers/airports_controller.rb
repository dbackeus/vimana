class AirportsController < ActionController::API
  def self.airports_json
    @airports_json ||= Airport.select(:ident, :name, :size, :position).all.to_json
  end

  def index
    render json: self.class.airports_json
  end
end
