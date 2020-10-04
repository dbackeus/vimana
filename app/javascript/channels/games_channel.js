import consumer from "./consumer"

consumer.subscriptions.create("GamesChannel", {
  connected() {
    console.log("GamesChannel.connected")
  },

  disconnected() {
    console.log("GamesChannel.disconnected")
  },

  received(data) {
    console.log("GamesChannel.received", data)
    playerMarker.update(data)
    map.setCenter(data)
  }
})
