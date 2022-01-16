import SearchWidget from './searchWidget';
import Selectors from '../support/selectors'

class HomePage {
  searchWidget: SearchWidget;

  constructor() {
    this.searchWidget = new SearchWidget();
  }

  getIframeDocument = () => {
    return cy
      .get(Selectors.IFRAME)
      .its('0.contentDocument').should('exist')
  };

  getIframeBody = () => {
    return this.getIframeDocument()
      .its('body').should('not.be.undefined')
      .then(cy.wrap)
  };

  waitForModalToShow() {
    // wait for the modal asking for email address to be visible and then close it
    cy.get(Selectors.EMAIL_MODAL).should("be.visible");
    this.getIframeBody().find('.ab-close-button').click();
  }

  visit() {
    cy.visit("/");
    cy.get(Selectors.SEARCH_WIDGET).should("be.visible");
  }

  addLocation(location: string) {
    cy.get(Selectors.LOCATION_INPUT).type(location);
    return this.searchWidget;
  }
}

export default HomePage;