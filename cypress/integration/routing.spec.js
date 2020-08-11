/// <reference types='cypress' />

Cypress.on("uncaught:exception", (err, runnable) => {
  console.log(err);
  return false;
});

describe("Routing", () => {
  context("Network Requests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });
    it("able to submit new route", () => {
      cy.generateRoute();
    });
  });
});
