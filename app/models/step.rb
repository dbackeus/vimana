class Step < ApplicationRecord
  belongs_to :mission

  def check_if_complete(simvars)
    check_type = check.fetch('type')
    Rails.logger.debug("Checking Step[#{id}] with type '#{check_type}' for completeness")
    send("check__#{check_type}", simvars)
  end

  def serializable_hash(*args)
    super(only: %i[completed_at position description])
  end

  private

  def check__touchdown(simvars)
    polygon = RGeo::Geos.factory.parse_wkt(check.fetch("polygon"))
    last_touchdown_position = RGeo::Geographic.spherical_factory.point(
      simvars.fetch("PLANE TOUCHDOWN LONGITUDE"),
      simvars.fetch("PLANE TOUCHDOWN LATITUDE"),
    )
    polygon.contains?(last_touchdown_position)
  end

  def check__airborne(simvars)
    simvars.fetch("SIM ON GROUND") == 0
  end

  def check__parked(simvars)
    simvars.fetch("SIM ON GROUND") == 1 &&
    simvars.fetch("GROUND VELOCITY") < 1 &&
    simvars.fetch("BRAKE PARKING INDICATOR") == 1
  end
end
