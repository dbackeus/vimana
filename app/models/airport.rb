class Airport < ApplicationRecord
  scope :containing, -> (point) { where("ST_Contains(area, '#{point}')") }
end
