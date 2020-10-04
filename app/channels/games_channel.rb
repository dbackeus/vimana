class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    Rails.logger.debug "unsubscribed!"
  end
end
