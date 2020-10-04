require "csv"

Airport.delete_all

CSV.foreach(File.open("db/airports.csv")) do |row|
  ident, name, city, size, left, top, right, bottom, altitude, longitude, latitude = row

  Airport.create!(
    ident: ident,
    name: name,
    city: city,
    size: size,
    altitude: altitude,
    area: "POLYGON ((#{left} #{top}, #{right} #{top}, #{right} #{bottom}, #{left} #{bottom}, #{left} #{top}))",
    position: "POINT (#{longitude} #{latitude})",
  )
end
