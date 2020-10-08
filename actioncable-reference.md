# Connect

After establishing websocket connection you'll either be connected or not depending on how you've setup your ApplicationCable::Connection

receive
  { type: "welcome" }
  or
  { "type": "disconnect", "reason": "unauthorized", "reconnect": false }

# Subscribe

send
  { command: "subscribe", identifier: { channel: "GamesChannel", param: 1 }.to_json }
receive
  { type: "confirm_subscription", identifier: { channel: "GamesChannel", param: 1 }.to_json }
  { type: "reject_subscription" }

# Send Message

send
  { command: "message", identifier: { channel: "GamesChannel", param: 1 }.to_json, data: { foo: "bar" }.to_json }

# Unsubscribe

send
  { command: "unsubscribe", identifier: { channel: "GamesChannel", param: 1 }.to_json }

{ type: "disconnect" }
{ type: "ping" }
