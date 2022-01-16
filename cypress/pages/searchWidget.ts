import Selectors from '../support/selectors';

class SearchWidget {
  clickOnSearch(buttonName: string) {
    cy.get(Selectors.SEARCH_WIDGET_BUTTON).contains(buttonName).click({ force: true, scrollBehavior: false });
  }
  addNumberOfGuests(guests: number) {
    cy.get(Selectors.GUEST_COUNT).click({ force: true, scrollBehavior: false });
    cy.get(Selectors.GUEST_COUNT_INPUT).click({ force: true, scrollBehavior: false }).type('{backspace}').type(guests.toString());
  }
  assertTodayCannotBeSelectedInDate(today: string) {
    cy.get(Selectors.getDatepickerDate(today)).should('have.attr', 'disabled', 'disabled');
  }
  addCheckInDate(startDate: string) {
    cy.get(Selectors.CHECK_IN_INPUT).click({ force: true, scrollBehavior: false });
    cy.get(Selectors.getDatepickerDate(startDate)).click({ force: true, scrollBehavior: false });
  }
  addCheckOutDate(endDate: string) {
    cy.get(Selectors.CHECK_OUT_INPUT).click({ force: true, scrollBehavior: false });
    cy.get(Selectors.getDatepickerDate(endDate)).click({ force: true, scrollBehavior: false });
  }
  closeSearchWidget() {
    cy.get('span').contains("Close").click({ force: true, scrollBehavior: false });
    cy.scrollTo(0, 0);
  }
}

export default SearchWidget;
