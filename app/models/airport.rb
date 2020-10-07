class Airport < ApplicationRecord
  scope :containing, -> (point) { where("ST_Contains(area, '#{point}')") }

  def self.within(point, distance_in_nautical_miles)
    meters = distance_in_nautical_miles * 1852
    query = "ST_Distance(position, 'POINT(#{point.longitude} #{point.latitude})')"
    select("*, #{query} as distance")
      .where("#{query} < #{meters}")
      .order(distance: :asc)
  end
end
