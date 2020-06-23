/// <reference types='cypress' />

describe("Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should contain a form", () => {
    cy.contains("Starting Point");
    cy.contains("End Point");
  });
});
