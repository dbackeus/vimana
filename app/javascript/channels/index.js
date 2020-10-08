// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.js.

const channels = require.context('.', true, /_channel\.js$/)
channels.keys().forEach(channels)

// Hack to allow build-less files to use consumer
import consumer from "./consumer"
window.actionCableConsumer = consumer
