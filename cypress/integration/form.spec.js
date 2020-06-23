/// <reference types='cypress' />

describe("Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should contain a form", () => {
    cy.contains("Starting Point");
    cy.contains("End Point");
  });
  it('focuses the input', () => {
    cy.focused().should('have.class', 'form-control')
  })
  it('accepts input', () => {
    const input = "Startingpoint"
    cy.get('input[name="startingpoint"]')
      .type(input)
      .should('have.value', input)
  })
  it('accepts input', () => {
    const input = "Endpoint"
    cy.get('input[name="endpoint"]')
      .type(input)
      .should('have.value', input)
  })
});
