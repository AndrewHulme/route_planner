/// <reference types='cypress' />

describe('Route Planner', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('should have a title', () => {
    cy.contains('Hello');
    cy.get('#map-div').should('be.visible');
  });
});
