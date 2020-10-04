class AddCurrentAirportToGames < ActiveRecord::Migration[6.0]
  def change
    add_reference :games, :current_airport, references: :airports, null: false
    add_foreign_key :games, :airports, column: :current_airport_id
  end
end
