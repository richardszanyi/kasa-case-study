import Selectors from '../support/selectors'

class SearchResultsPage {
  clickOnFirstPropertyButton(buttonName: string) {
    this.getPropertyCards().first().find('.text-container').contains(buttonName).click();
  }
  assertWarningIsDisplayed() {
    this.getPropertyCards().each(($li) => {
      cy.wrap($li).contains('Minimum 2-night stays at this property.').should('be.visible');
    })
  }
  assertCalculations(nights: number, guests: number) {
    this.getPropertyCards().each(($li) => {
      cy.wrap($li).find(Selectors.PROPERTY_CARD_RECOMMENDED).should('contain.text', `${nights} nights, ${guests} guests`)
    })
  }
  assertSearchResultsContains(text: string) {
    const propertyTable = cy.get(Selectors.PROPERTY_CARDS_LIST).find('li');
    propertyTable.should('be.visible');
    propertyTable.find('span').should('have.length.at.least', 7)
    cy.get('h1').should('contain.text', text);
  }
  getPropertyCards() {
    return cy.get(Selectors.PROPERTY_CARDS_LIST).find('li').filter(Selectors.PROPERTY_CARD);
  }

}
export default SearchResultsPage;
