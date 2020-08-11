/// <reference types='cypress' />

Cypress.on('uncaught:exception', (err, runnable) => {
  console.log(err);
  return false;
});

describe('Routing', () => {
  context('Network Requests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
    it('able to submit new round route', () => {
      const startInput = 'London Eye';
      const length = 10000;

      cy.get('input[name="startingPoint"]').type(startInput);
      cy.get('input[name="roundTripLength"]').type(length);
      cy.get('#roundTripButton').click();
      cy.server().should((server) => {
        expect(server.method).to.eq('GET');
        expect(server.status).to.eq(200);
      });
    });

    it('contains my location', () => {
      const length = 10000;

      cy.get('#useMyLocation').click();
      cy.get('input[name="roundTripLength"]').type(length);
      cy.get('select[cy-name="vehicleChoice"]')
        .select('Walking')
        .should('have.value', 'foot-walking');
      cy.get('#roundTripButton').click();
      cy.get('input[name="startingPoint"]').should('have.value', 'My Location');
    });
  });
});
