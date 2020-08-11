/// <reference types='cypress' />

Cypress.on("uncaught:exception", (err, runnable) => {
  console.log(err);
  return false;
});

describe("To have DOM content", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have a title", () => {
    cy.contains("Generate");
  });
});
