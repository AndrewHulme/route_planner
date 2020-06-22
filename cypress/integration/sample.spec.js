/// <reference types='cypress' />

describe('Route Planner', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  const hello = 'Hello';
  it('should have a title', () => {
    cy.contains('Hello');
  });
});
