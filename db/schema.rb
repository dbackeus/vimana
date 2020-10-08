# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_07_193657) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "airports", force: :cascade do |t|
    t.string "ident", limit: 4, null: false
    t.string "name", null: false
    t.integer "size", limit: 2, null: false
    t.integer "altitude", null: false
    t.string "city"
    t.geometry "area", limit: {:srid=>0, :type=>"st_polygon"}, null: false
    t.geography "position", limit: {:srid=>4326, :type=>"st_point", :geographic=>true}, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["ident"], name: "index_airports_on_ident", unique: true
  end

  create_table "games", force: :cascade do |t|
    t.string "name", null: false
    t.string "slug", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "current_airport_id", null: false
    t.index ["current_airport_id"], name: "index_games_on_current_airport_id"
    t.index ["slug"], name: "index_games_on_slug", unique: true
    t.index ["user_id"], name: "index_games_on_user_id"
  end

  create_table "missions", force: :cascade do |t|
    t.bigint "starting_airport_id", null: false
    t.bigint "destination_airport_id", null: false
    t.bigint "game_id", null: false
    t.text "description", null: false
    t.datetime "started_at"
    t.datetime "completed_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_missions_on_game_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "provider", null: false
    t.string "uid", null: false
    t.string "remember_token"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "games", "airports", column: "current_airport_id"
  add_foreign_key "games", "users"
  add_foreign_key "missions", "games"
end
