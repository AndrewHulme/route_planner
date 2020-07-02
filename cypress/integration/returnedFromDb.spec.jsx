describe('ReturnedFromDb', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should generate,show and save the trip', () => {
    cy.logOutUserIfLoggedIn();
    cy.userLogin();
    cy.saveRoundRoute();
    cy.get('#my-routes').click();
    cy.contains('My Route');
    cy.get('.description').should('be.visible');
    cy.get('.close').click();
    cy.get('.description').should('not.be.visible');

    cy.get('#logOutButton').click();
  });

  it('should be able to view saved round trip', () => {
    cy.get('#logOutButton').click();
    cy.userLogin();
    cy.saveRoundRoute();
    cy.get('#my-routes').click();
    cy.contains('My Route');
    cy.get('.description').should('be.visible');
    cy.get('.savedMapDiv').click();
    cy.get('.close').click();
    cy.get('.description').should('not.be.visible');

    cy.get('#logOutButton').click();
  });

  it('should be able to view saved straight trip', () => {
    cy.get('#logOutButton').click();
    cy.userLogin();
    cy.saveRoute();
    cy.get('#my-routes').click();
    cy.contains('My Route');
    cy.get('.description').should('be.visible');
    cy.get('.savedMapDiv').click();
    cy.get('.close').click();
    cy.get('.description').should('not.be.visible');
    cy.get('#my-routes').click();

    cy.get('#logOutButton').click();
  });
});
