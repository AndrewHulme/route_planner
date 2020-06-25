/// <reference types='cypress' />

describe('Form', () => {
  context('Contains DOM Elements', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });

    it('should contain a form', () => {
      cy.contains('Starting Point');
      cy.contains('End Point');
    });
    it('focuses the input', () => {
      cy.focused().should('have.class', 'form-control');
    });
    it('accepts input Startingpoint', () => {
      const input = 'Startingpoint';
      cy.get('input[name="startingpoint"]')
        .type(input)
        .should('have.value', input);
    });
    it('accepts input Endpoint', () => {
      const input = 'Endpoint';
      cy.get('input[name="endpoint"]').type(input).should('have.value', input);
    });
    it('should have a different form for round trip', function() {
      cy.get('input[name="roundTripStart"]')
        .type('Hello')
        .should('have.value', 'Hello');
    })

    it('it prevents default behaviour of the function', () => {
      cy.get('form[id="secondForm"]').submit();
      cy.url().should('eq', 'http://localhost:3000/');
    });
    // it('it prevents default behaviour of the function', () => {
    //   cy.get('form[id="roundTripForm"]').submit();
    //   cy.url().should('eq', 'http://localhost:3000/');
    // });
  });
  context('Network Requests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
    it('cy.server() network requests and responses', () => {
      cy.server().should((server) => {
        expect(server.method).to.eq('GET');
        expect(server.status).to.eq(200);
      });
    });
  });
});
