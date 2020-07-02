describe('ReturnedFromDb', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  it('should generate,show and save the trip', () => {
    cy.userLogin();
    cy.saveRoute();
    cy.get('#my-routes').click();
    cy.contains('My Route');
    cy.get('.description').should('be.visible');
    cy.get('.close').click();
    cy.get('.description').should('not.be.visible');

    cy.get('#logOutButton').click();
  });
});
