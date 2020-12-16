class AddApiKeyToGames < ActiveRecord::Migration[6.0]
  def change
    enable_extension "uuid-ossp"

    add_column :games, :api_key, :uuid, default: "uuid_generate_v4()", null: false

    add_index :games, :api_key, unique: true
  end
end
