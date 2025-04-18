Feature: Filter products in Men's category

  Scenario: Filter men's products to show only jackets
    Given I am on the Men's category page
    When I apply the Jackets filter
    Then I should see only jacket products displayed