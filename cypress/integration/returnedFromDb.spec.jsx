describe('ReturnedFromDb', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.clearCookies();
    cy.clearLocalStorage()
  });
  it('should generate and show a saved trip', () => {
    cy.get('input[name="roundTripStart"]').type('London Eye');
    cy.get('input[name="roundTripLength"]').type('5000');
    cy.get('select[cy-name="vehicleChoice"]').select('Cycling');
    cy.get('#roundTripButton').click();
    cy.get('input[name="description"]').type('hello');
    // cy.get('#saveRoute').click();
    cy.get('#roundTripButton').should('have.value', 'Randomise');
    // cy.get('#my-routes').click();
    // cy.contains('hello');
    // cy.get('.description').should('be.visible');
    // cy.get('.close').click();
    // cy.get('.description').should('not.be.visible');
  })
})
