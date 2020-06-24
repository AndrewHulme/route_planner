/// <reference types='cypress' />

describe('Route Planner', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('should have a map container present', () => {
    cy.get('.map-div').should('not.be.disabled');
  });

  it('cy.server() network requests and responses', () => {
    cy.server().should((server) => {
      expect(server.method).to.eq('GET');
      expect(server.status).to.eq(200);
    });
  });
});
