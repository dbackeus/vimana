class CreateSteps < ActiveRecord::Migration[6.0]
  def change
    create_table :steps do |t|
      t.belongs_to :mission, null: false, foreign_key: true
      t.datetime :completed_at
      t.integer :position, limit: 2, null: false
      t.text :description, null: false
      t.jsonb :check, null: false
    end

    add_index :steps, [:mission_id, :position], unique: true # data consistency
  end
end
