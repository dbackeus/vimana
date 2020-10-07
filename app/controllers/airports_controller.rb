class AirportsController < ActionController::API
  def self.airports_json
    @airports_json ||= Oj.dump(Airport.select(:ident, :name, :size, :position).all.map(&:as_js_object))
  end

  def index
    render json: self.class.airports_json
  end
end
