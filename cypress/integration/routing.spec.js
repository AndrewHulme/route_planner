/// <reference types='cypress' />

describe('Routing', () => {
  context('Network Requests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
    it('able to submit new route', () => {
      cy.generateRoute();
    });
  });
});
