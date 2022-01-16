import Selectors from '../support/selectors';

class PropertyDetailsPage {
  assertAmenitiesTableContains(table: string, amenityName: string) {
    const amenity = cy.get(Selectors.PROPERTY_DETAILS_CARD).find('h4').contains(table).siblings('ul').find('li').contains(amenityName);
    amenity.scrollIntoView();
    amenity.should('be.visible');
  }
  assertPropertyDetailsPageIsOpened() {
    cy.get(Selectors.PROPERTY_DETAILS_CARD).should('be.visible');
  }
}

export default PropertyDetailsPage;
