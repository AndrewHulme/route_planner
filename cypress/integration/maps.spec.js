/// <reference types='cypress' />

describe('Route Planner', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('should have a map container present', () => {
    // cy.stub(obj, 'method')
    cy.get('.map-div').should('not.be.disabled');
  });
});
