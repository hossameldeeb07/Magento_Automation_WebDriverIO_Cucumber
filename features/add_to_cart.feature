Feature: Add product to cart

  Scenario: Search and add a product to cart
    Given I am on the homepage
    When I search for "jacket"
    And I select the first product
    And I select size "M" and color "Orange"
    And I add the product to cart
    Then I should see the success message