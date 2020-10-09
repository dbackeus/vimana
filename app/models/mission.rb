class Mission < ApplicationRecord
  belongs_to :game
  belongs_to :starting_airport, class_name: "Airport"
  belongs_to :destination_airport, class_name: "Airport"

  before_validation :generate_steps, on: :create

  has_many :steps, -> { order(:position) }, dependent: :delete_all

  def serializable_hash(*args)
    super(include: %i[starting_airport destination_airport steps])
  end

  def tick(user, simvars)
    next_step = steps.find { |step| step.completed_at.nil? }

    if next_step&.check_if_complete(simvars)
      next_step.update!(completed_at: Time.now)

      if next_step == steps.last
        update!(completed_at: Time.now)
        game.update_attributes!(current_airport: destination_airport)
      end

      MissionChannel.broadcast_to(user, self.as_json)
    end
  end

  private

  def generate_steps
    return if steps.any? # likely already generated steps

    self.steps << Step.new(
      position: steps.length,
      description: "Connect simulator client and start at #{starting_airport.name} airport",
      check: { type: "touchdown", polygon: starting_airport.area.as_json },
    )
    self.steps << Step.new(
      position: steps.length,
      description: "Lift off from #{starting_airport.name} airport",
      check: { type: "airborne" },
    )
    self.steps << Step.new(
      position: steps.length,
      description: "Land at #{destination_airport.name} airport",
      check: { type: "touchdown", polygon: destination_airport.area.as_json }
    )
    self.steps << Step.new(
      position: steps.length,
      description: 'Park airplane',
      check: { type: "parked" }
    )
  end
end
