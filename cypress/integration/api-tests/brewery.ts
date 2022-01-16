import { Beer, Hop } from './typings/brewery';
const API_ENDPOINT = 'https://api.punkapi.com/v2/beers/';

describe('Brewery API Testing task', () => {
  //only one beer specifies the task so I cannot set up multiple examples
  it('Which beer has \'Wyeast 3522 - Belgian Ardennes\' yeast and \'Tomahawk\' hop in it', () => {

    const yeast: string = 'Wyeast 3522';

    cy.request({
      url: API_ENDPOINT,
      method: 'GET',
      qs: {
        yeast
      }
    }).as('getBeers');

    cy.get('@getBeers').then((response: any) => {

      let beerWithTomahawk: any = {};

      expect(response).to.have.property('status', 200);
      expect(response).to.have.property('statusText', 'OK');
      expect(response).to.have.property('body');
      expect(response?.headers).to.have.property('content-type', 'application/json; charset=utf-8');

      response?.body?.forEach((beer: Beer) => {
        expect(beer?.ingredients?.yeast).to.equal('Wyeast 3522 - Belgian Ardennes™');
        expect(beer?.ingredients?.hops).to.be.an('array');
        // only one beer has 'Wyeast 3522 - Belgian Ardennes' yeast in it with 'Tomahawk' hops
        beer?.ingredients?.hops.some((hop: Hop) => hop?.name === 'Tomahawk') ? beerWithTomahawk = beer : null;
      });

      //fails if it doesn't find Magnum as a hop in the beer
      expect(beerWithTomahawk?.ingredients?.hops.some((hop: Hop) => hop?.name === 'Magnum')).to.be.true;

      beerWithTomahawk?.ingredients?.hops.forEach((hop: Hop) => {
        if (hop.name === 'Magnum') {
          //selected beer has exactly 12.5 grams of 'Magnum' hops in it
          expect(hop?.amount?.value).to.equal(12.5);
          expect(hop?.amount?.unit).to.equal('grams');
        }
      });

      //IBU content is entered as a number
      expect(beerWithTomahawk?.ibu).to.be.a('number');
      //the description for the beer is not empty
      expect(beerWithTomahawk?.description).to.not.be.empty;

      cy.log(`Beer that has ${beerWithTomahawk?.ingredients?.yeast} yeast and ${beerWithTomahawk?.ingredients?.hops[0]?.name} in it is the **${beerWithTomahawk?.name}**`);
      console.log(`Beer that has ${beerWithTomahawk?.ingredients?.yeast} yeast and ${beerWithTomahawk?.ingredients?.hops[0]?.name} in it is the ${beerWithTomahawk?.name}`);
    });
  });
});