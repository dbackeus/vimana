require "application_system_test_case"

class GamesTest < ApplicationSystemTestCase
  include Warden::Test::Helpers

  test "visiting the index" do
    visit root_url

    assert_selector "h1", text: "Sign in"
  end

  test "creating a game" do
    login_as users(:default)

    visit games_url

    assert_selector "h5", text: "Select a starting airport"

    fill_in "game-starting-airport", with: airports(:arlanda).name

    click_on "Continue"

    assert_selector "h2", text: "ESSA - Arlanda"

    click_on "Look for a mission"

    assert_selector "h3", text: "Select destination airport"

    # click_on "Bromma"

    # assert_selector "h3", text: "Select a mission"
  end
end
