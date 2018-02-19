require 'minitest/autorun'
require_relative '../superpermutation'

class SuperpositionTest < Minitest::Test
  def test_two
    assert_equal Superpermutation.calc(2), '121'
  end

  def test_three
    assert_equal Superpermutation.calc(3), '123121321'
  end
end
