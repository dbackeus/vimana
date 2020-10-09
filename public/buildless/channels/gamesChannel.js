import consumer from "./consumer.js"

const gamesChannel = consumer.subscriptions.create("GamesChannel", {
  connected() {
    console.log("GamesChannel.connected")
  },

  disconnected() {
    console.log("GamesChannel.disconnected")
  },

  received(data) {
    console.log("GamesChannel.received", data)
    if(window.map.updatePlayer) window.map.updatePlayer(data)
  }
})

export default gamesChannel
