Feature: Sort products

  Scenario: Sort products by price from high to low
    Given I am on the "jacket" category page
    When I sort products by "Price"
    Then I should see products sorted by price from highest to lowest