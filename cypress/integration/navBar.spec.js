/// <reference types='cypress' />

describe('NavBar', () => {
  context('NavBar', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.clearCookies();
      cy.clearLocalStorage()
    });
    it('able to see log in form', () => {
      cy.get('#exampleInputEmail1').should('have.value', '');
      cy.get('#exampleInputPassword1').should('have.value', '');
      cy.get('#logInButton').should('not.be.disabled');
      cy.get('#signUpButton').should('not.be.disabled');
    });
    // it('should show Logout button when logged in', () => {
    //   cy.clearCookies();
    //   cy.clearLocalStorage()
    //
    //   cy.get('#exampleInputEmail1').type('dummy@dummy.com');
    //   cy.get('#exampleInputPassword1').type('password');
    //   cy.get('#logInButton').click();
    //   cy.get('#welcome-message').should('be.visible');
    // })
  });
});
