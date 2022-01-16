/// <reference types="Cypress" />

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../pages/homePage";
import PropertyDetailsPage from "../../pages/propertyDetailsPage";
import SearchResultsPage from "../../pages/searchResultsPage";
import SearchWidget from "../../pages/searchWidget";

Given(`I am on the home page`, () => {
  const home = new HomePage();
  home.visit();
  home.waitForModalToShow();
});

When('I set the following fields in the search bar {string}, {int} nights and {int} guests',
  (destination: string, nights: number, guests: number) => {

    const tomorrow: Date = new Date()
    const endDateOfAccommodation: Date = new Date();
    const today: Date = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1)
    endDateOfAccommodation.setDate(tomorrow.getDate() + nights);

    const todayFormatted: string = today.toISOString().slice(0, 10);
    const tomorrowFormatted: string = tomorrow.toISOString().slice(0, 10);
    const endDateOfAccommodationFormatted: string = endDateOfAccommodation.toISOString().slice(0, 10);


    const home = new HomePage();
    const searchWidget = home.addLocation(destination);

    searchWidget.addCheckInDate(tomorrowFormatted);
    searchWidget.assertTodayCannotBeSelectedInDate(todayFormatted);
    searchWidget.addCheckOutDate(endDateOfAccommodationFormatted);
    searchWidget.addNumberOfGuests(guests);
    searchWidget.closeSearchWidget();
  });

When('I click the {string} button in the Search Widget', (buttonName: string) => {
  const searchWidget = new SearchWidget();
  searchWidget.clickOnSearch(buttonName);
});

Then('Search results contains {string}', (text: string) => {
  const searchResultsPage = new SearchResultsPage();
  searchResultsPage.assertSearchResultsContains(text);
});

Then('Calculations are for {int} nights and {int} guest', (numberOfNights: number, numberOfGuests: number) => {
  const searchResultsPage = new SearchResultsPage();
  searchResultsPage.assertCalculations(numberOfNights, numberOfGuests);
});

Then('Warning is displayed regarding minimum night stays', () => {
  const searchResultsPage = new SearchResultsPage();
  searchResultsPage.assertWarningIsDisplayed();
});

When('I click on the first properties\' {string} button', (buttonName: string) => {
  const searchResultsPage = new SearchResultsPage();
  searchResultsPage.clickOnFirstPropertyButton(buttonName);
});

Then('Property details page is opened', () => {
  const propertyDetailsPage = new PropertyDetailsPage();
  propertyDetailsPage.assertPropertyDetailsPageIsOpened();
});

Then('Amenities {string} table contains {string}', (tableName: string, amenityName: string) => {
  const propertyDetailsPage = new PropertyDetailsPage();
  propertyDetailsPage.assertAmenitiesTableContains(tableName, amenityName);
})
