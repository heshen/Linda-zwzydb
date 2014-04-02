# encoding: UTF-8
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
	test "Create a User" do
		assert_difference "User.count", 1 do
			User.create(:name =>'董峥',:age => 15, :login => "dongzheng")
		end
		dongz = User.last
		assert_equal [dongz.name], ["董峥"]
	end
end
