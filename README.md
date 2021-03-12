# Vimana

## Dev setup

Provided you're running MacOS and use `rbenv` to manage ruby, `brew` to manage application installs and `puma-dev` to run your ruby web apps: Go ahead and run `bin/setup`.

If not then look at `bin/setup` and translate whatever happens there to your own environment.

Since puma-dev might be tricky to reach across devices on your local network you might want to start a server using `rails server -b 0.0.0.0` when you need to establish a connection between the simulator client and ActionCable.

## Deployment

When deploying to Heroku take the following steps:
- Create your app
- Add the Geo buildpack with `heroku buildpacks:add https://github.com/heroku/heroku-geo-buildpack.git` (if not the `rgeo` gem will not compile with full Geo support required by the app)
- Add the Ruby buildpack `heroku buildpacks:add heroku/ruby`
- Add the Google related ENV variables (see `.env` for reference) via `heroku config:set`
- Git push to deploy and verify the app is booting
- Add the Heroku Redis (or your Redis addon of choice) for ActionCable support

## Todo

- Sign out
- JSDock typed JavaScript? https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76
- Yardoc typed Ruby? https://www.ruby3.dev/ruby-3-fundamentals/2021/03/01/static-typing-in-ruby-3-gives-me-a-headache/

### Missions

- Clickable airport markers
- Better filtering on the destination selector
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
