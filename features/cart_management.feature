Feature: Cart Management

  Scenario: Remove product from cart
    Given I am on the homepage
    When I search for "jacket"
    And I select the first product
    And I select size "M" and color "Orange"
    And I add the product to cart
    And I verify the product was added successfully
    When I navigate to the cart
    And I remove the product from cart
    Then I should see an empty cart message