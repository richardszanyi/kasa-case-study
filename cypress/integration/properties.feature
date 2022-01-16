Feature: Properties can be searched on the home page. Single night stay is not allowed. Bookings can be made only on a future date. Check amenities if it contains "Heating"

  Scenario Outline: Search Kasas in different locations
    Given I am on the home page
    When I set the following fields in the search bar <city>, <numberOfNights> nights and <numberOfGuests> guests
    And I click the "Search" button in the Search Widget
    Then Search results contains <city>
    And Calculations are for <numberOfNights> nights and <numberOfGuests> guest
    Examples:
      | city           | numberOfNights | numberOfGuests |
      | "Austin, TX"   | 3              | 2              |
      | "Dallas, TX"   | 4              | 3              |
      | "New York, NY" | 2              | 2              |


  Scenario: Check if the system allows guests to book a single night stay and bookings can only be made on a future date.
    Given I am on the home page
    When I set the following fields in the search bar "Austin, TX", 1 nights and 2 guests
    And I click the "Search" button in the Search Widget
    Then Search results contains "Austin, TX"
    And Warning is displayed regarding minimum night stays


  Scenario: Amenities shows up on the property details page appropriately
    Given I am on the home page
    When I set the following fields in the search bar "Austin, TX", 2 nights and 2 guests
    And I click the "Search" button in the Search Widget
    Then Search results contains "Austin, TX"
    When I click on the first properties' "View details" button
    Then Property details page is opened
    And Amenities "Basics" table contains "Heating"
