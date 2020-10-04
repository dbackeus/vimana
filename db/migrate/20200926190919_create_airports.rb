class CreateAirports < ActiveRecord::Migration[6.0]
  def change
    create_table :airports do |t|
      t.string :ident, null: false, limit: 4
      t.string :name, null: false
      t.integer :size, null: false, limit: 2
      t.integer :altitude, null: false
      t.string :city
      t.st_polygon :area, null: false
      t.st_point :position, geographic: true, null: false

      t.timestamps
    end

    add_index :airports, :ident, unique: true
  end
end
