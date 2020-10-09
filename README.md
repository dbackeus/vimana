# Vimana

## Dev setup

Provided you're running MacOS and use `rbenv` to manage ruby, `brew` to manage application installs and `puma-dev` to run your ruby web apps: Go ahead and run `bin/setup`.

If not then look at `bin/setup` and translate whatever happens there to your own environment.

Since puma-dev might be tricky to reach across devices on your local network you might want to start a server using `rails server -b 0.0.0.0` when you need to establish a connection between the simulator client and ActionCable.

## Todo

- Sign out

### Missions

- Clickable airport markers
- Abort mission
- Back function
- Give actual rewards

### Aircraft

- Select aircrafts

### Resources

Icons:
https://www.flaticon.com/

Parsing MSFS BGL (airport) files:
https://www.fsdeveloper.com/wiki/index.php?title=BGL_File_Format

Google Maps:

Markers - https://developers.google.com/maps/documentation/javascript/reference/marker
Map - https://developers.google.com/maps/documentation/javascript/events
