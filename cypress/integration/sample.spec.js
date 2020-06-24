/// <reference types='cypress' />

describe('Route Planner', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  const hello = 'Hello';
  it('should have a title', () => {
    cy.contains('Hello');
  });
});
