require "csv"

Airport.delete_all

large = File.open("db/airports-large.csv").each.map(&:chomp)
medium_including_large = File.open("db/airports-medium.csv").each.map(&:chomp)
medium = medium_including_large - large

CSV.foreach(File.open("db/airports.csv")) do |row|
  ident, name, city, _rating, left, top, right, bottom, altitude, longitude, latitude = row

  size =
    if large.include?(ident)
      3
    elsif medium.include?(ident)
      2
    else
      1
    end

  Airport.create!(
    ident: ident,
    name: name,
    city: city,
    size: size,
    altitude: altitude,
    area: "POLYGON ((#{left} #{top}, #{right} #{top}, #{right} #{bottom}, #{left} #{bottom}, #{left} #{top}))",
    position: "POINT (#{longitude} #{latitude})",
  )
rescue => e
  # On Heroku's Postgis about 30 airports had some kind of validation error on the area polygon
  puts "POLYGON ((#{left} #{top}, #{right} #{top}, #{right} #{bottom}, #{left} #{bottom}, #{left} #{top}))"
  puts e.message
end
