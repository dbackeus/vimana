module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = env["warden"].user || User.find_by_id(request.params[:user_id]) || reject_unauthorized_connection
    end
  end
end
