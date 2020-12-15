module BuildlessCache
  def self.modules
    @modules ||= Dir.glob("public/buildless/**/*.js").each_with_object({}) do |path, hash|
      name = path.delete_prefix("public/buildless/").delete_suffix(".js")
      relative_path = path.delete_prefix("public")
      last_modified_at = File.mtime(path).strftime("%Y-%m-%d_%H-%M-%S")

      hash[name] = "#{relative_path}?last_modified_at=#{last_modified_at}"
    end
  end

  def self.importmap_entries
    modules.map do |name, url|
      %("#{name}": "#{url}")
    end.join(",\n")
  end

  def self.purge
    @modules = nil
  end
end
