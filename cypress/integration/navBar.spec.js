/// <reference types='cypress' />

Cypress.on('uncaught:exception', (err, runnable) => {
  console.log(err);
  return false;
});

describe('NavBar', () => {
  context('NavBar', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.clearCookies();
      cy.clearLocalStorage();
    });
    it('able to see log in form', () => {
      cy.get('#exampleInputEmail1').should('have.value', '');
      cy.get('#exampleInputPassword1').should('have.value', '');
      cy.get('#logInButton').should('not.be.disabled');
      cy.get('#signUpButton').should('not.be.disabled');
    });

    it('should show Logout button when logged in', () => {
      cy.userLogin();
      cy.get('#logOutButton').click();
      cy.userLogin();
      cy.get('#welcome-message').should('be.visible');
      cy.get('.description').should('not.be.visible');
      cy.get('#logOutButton').should('be.visible');

      cy.get('#logOutButton').click();
    });

    context('Network Requests', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000');
      });
      it('cy.server() network requests and responses', () => {
        cy.userLogin();
        cy.server().should((server) => {
          expect(server.method).to.eq('GET');
          expect(server.status).to.eq(200);
        });

        cy.get('#logOutButton').click();
      });
    });
  });
});
