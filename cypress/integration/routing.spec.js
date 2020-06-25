/// <reference types='cypress' />

describe('Routing', () => {
  context('Network Requests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
    it('able to submit new route', () => {
      const startInput = 'W1 C1DE';
      const endpoint = 'London Eye';
      cy.get('input[name="startingpoint"]').type(startInput);
      cy.get('input[name="endpoint"]').type(endpoint);
      cy.get('.btn-primary').click();
      
    });
  });
});
