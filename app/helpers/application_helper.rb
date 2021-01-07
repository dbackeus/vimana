module ApplicationHelper
  def nm(meters)
    nm = (meters / 1852).round
    "#{nm} NM"
  end

  def buildless_module(name)
    url = BuildlessCache.modules[name]

    raise "module '#{name}' not found" unless url

    %(<script type="module-shim" src="#{url}"></script>).html_safe
  end
end
