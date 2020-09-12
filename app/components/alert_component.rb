class AlertComponent < ViewComponent::Base
  VARIANTS = %w[
    primary
    secondary
    success
    danger
    warning
    info
    dark
    light
  ].freeze

  def initialize(type:, content: nil)
    raise ArgumentError, "Invalid type" unless VARIANTS.include?(type)

    @type = type
    @content = content
  end
end
