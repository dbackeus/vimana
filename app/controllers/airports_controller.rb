class AirportsController < ActionController::API
  before_action :authenticate_user!

  def self.airports_json
    @airports_json ||= Airport.select(:ident, :name, :size, :position).all.to_json
  end

  def index
    render json: self.class.airports_json
  end
end
