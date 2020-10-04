class Game < ApplicationRecord
  belongs_to :current_airport, class_name: "Airport"

  validates_presence_of :current_airport

  attr_reader :starting_airport

  def starting_airport=(airport_name)
    @starting_airport = airport_name
    self.current_airport = Airport.find_by_name(airport_name)
  end

  def name=(name)
    super
    self.slug = name.parameterize
  end
end
