class CreateMissions < ActiveRecord::Migration[6.0]
  def change
    create_table :missions do |t|
      t.references :starting_airport, null: false, index: false
      t.references :destination_airport, null: false, index: false
      t.references :game, null: false, index: true, foreign_key: true
      t.text :description, null: false
      t.datetime :started_at
      t.datetime :completed_at

      t.timestamps
    end
  end
end
