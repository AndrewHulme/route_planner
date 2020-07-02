/// <reference types='cypress' />

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
      cy.logOutUserIfLoggedIn();
      cy.userLogin();
      cy.get('#welcome-message').should('be.visible');
      cy.get('.description').should('not.be.visible');
      cy.get('#logOutButton').should('be.visible');

      cy.get('#logOutButton').click();
    });

    it('able to log out', () => {
      cy.logOutUserIfLoggedIn();
      cy.get('#logOutButton').should('not.be.visible');
    });

    it('should be able to toggle view', () => {
      // cy.get('#logOutButton').click();
      cy.userLogin();
      cy.get('#my-routes').click();
      cy.get('#my-routes').should('have.text', 'Find Route');
      cy.get('#my-routes').click();
      cy.get('#my-routes').should('have.text', 'My Routes');

      cy.get('#logOutButton').click();
    });

    it('should be able to toggle view by clicking logo icon', () => {
      cy.userLogin();
      cy.saveRoundRoute();
      cy.get('#my-routes').click();
      cy.get('.savedMapDiv').should('be.visible');
      cy.get('.description').should('have.text', 'My Route');
      cy.get('.close').click();
      cy.get('.savedMapDiv').should('not.be.visible');
      cy.get('.main-logo').click();
      cy.get('#saveRoute').should('be.visible');
      cy.get('#my-routes').should('have.text', 'My Routes');

      cy.get('#logOutButton').click();
    });

    it('should not be able to sign up if credentials are not valid', () => {
      cy.get('#logOutButton').click();
      cy.logOutUserIfLoggedIn();
      cy.get('#exampleInputEmail1').type('dummy@dummy.com');
      cy.get('#exampleInputPassword1').type('123');
      cy.get('#logInButton').click();
      cy.get('#logInButton').should('not.be.disabled');
      cy.get('#signUpButton').should('not.be.disabled');
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
