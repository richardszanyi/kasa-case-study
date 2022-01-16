/// <reference types="Cypress" />

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
const getIframeDocument = () => {
  return cy
    .get('iframe[title="Modal Message"]')
    .its('0.contentDocument').should('exist')
};

const getIframeBody = () => {
  return getIframeDocument()
    .its('body').should('not.be.undefined')
    .then(cy.wrap)
};

Given(`I am on the home page`, () => {

  cy.visit("/");
  cy.get(".search-widget").should("be.visible");

  // wait for the modal asking for email address to be visible and then close it
  cy.get(".ab-iam-root").should("be.visible");
  getIframeBody().find('.ab-close-button').click();
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

    cy.get('input[id="full-screen-hero-search-input"]').type(destination);

    cy.get('input[id="full-screen-hero-check-in-input"]').click({ force: true, scrollBehavior: false });

    cy.get(`button[date="${todayFormatted}"]`).should('have.attr', 'disabled', 'disabled');

    cy.get(`button[date="${tomorrowFormatted}"]`).click({ force: true, scrollBehavior: false });

    cy.get('input[id="full-screen-hero-check-out-input"]').click({ force: true, scrollBehavior: false });
    cy.get(`button[date="${endDateOfAccommodationFormatted}"]`).click({ force: true, scrollBehavior: false });

    cy.get('.guest-count-input__btn').click({ force: true, scrollBehavior: false });
    cy.get('input[id="full-screen-hero-adult-guest-count-input"]').click({ force: true, scrollBehavior: false }).type('{backspace}').type(guests.toString());
    cy.get('span').contains("Close").click({ force: true, scrollBehavior: false });
    cy.scrollTo(0, 0);

  });

When('I click the {string} button in the Search Widget', (buttonName: string) => {
  cy.get('.search-widget button').contains(buttonName).click({ force: true, scrollBehavior: false });
});

Then('Search results contains {string}', (text: string) => {
  cy.get('h1').should('contain.text', text);
  const propertyTable = cy.get('.list-page-properties > .list-page__content-list').find('li');
  propertyTable.should('be.visible');
  propertyTable.find('span').should('have.length.at.least', 7)
});

Then('Calculations are for {int} nights and {int} guest', (numberOfNights: number, numberOfGuests: number) => {
  cy.get('.list-page-properties > .list-page__content-list').find('li').filter('.property-card').each(($li) => {
    cy.wrap($li).find('.recommended-room-type__price-details__guest-and-night').should('contain.text', `${numberOfNights} nights, ${numberOfGuests} guests`)
  })
});

Then('Warning is displayed regarding minimum night stays', () => {
  cy.get('.list-page-properties > .list-page__content-list').find('li').filter('.property-card').each(($li) => {
    cy.wrap($li).contains('Minimum 2-night stays at this property.').should('be.visible');
  })
});

When('I click on the first properties\' {string} button', (buttonName: string) => {
  cy.get('.list-page-properties > .list-page__content-list').find('li').filter('.property-card').first()
    .find('.text-container').contains(buttonName).click();
});

Then('Property details page is opened', () => {
  cy.get('.room-type-popup__card').should('be.visible');
});

Then('Amenities {string} table contains {string}', (tableName: string, amenityName: string) => {
  const amenity = cy.get('.room-type-popup__card').find('h4').contains(tableName).siblings('ul').find('li').contains(amenityName);
  amenity.scrollIntoView();
  amenity.should('be.visible');
})