class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.references :user, null: false, foreign_key: true, index: true

      t.timestamps
    end

    add_index :games, :slug, unique: true
  end
end
