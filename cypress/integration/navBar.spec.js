/// <reference types='cypress' />

describe('Routing', () => {
  context('Network Requests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
    it('able to see log in form', () => {
      cy.get('#exampleInputEmail1').should('have.value', '');
      cy.get('#exampleInputPassword1').should('have.value', '');
      cy.get('#logInButton').should('not.be.disabled');
      cy.get('#signUpButton').should('not.be.disabled');
    });
  });
});
