/// <reference types='cypress' />

describe('Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should contain a form', () => {
    cy.contains('Starting Point');
    cy.contains('End Point');
  });
  it('focuses the input', () => {
    cy.focused().should('have.class', 'form-control');
  });
  it('accepts input', () => {
    const input = 'Startingpoint';
    cy.get('input[name="startingpoint"]')
      .type(input)
      .should('have.value', input);
  });
  it('accepts input', () => {
    const input = 'Endpoint';
    cy.get('input[name="endpoint"]').type(input).should('have.value', input);
  });

  it('it prevents default behaviour of the function', () => {
    cy.get('form').submit();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  context('Network Requests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
    it('cy.server() network requests and responses', () => {
      cy.server().should((server) => {
        expect(server.method).to.eq('GET');
        expect(server.status).to.eq(200);
      });
    });
  });
});
