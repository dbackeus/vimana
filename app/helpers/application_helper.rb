module ApplicationHelper
  def nm(meters)
    nm = (meters / 1852).round
    "#{nm} NM"
  end
end
