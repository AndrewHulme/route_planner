/// <reference types='cypress' />

Cypress.on("uncaught:exception", (err, runnable) => {
  console.log(err);
  return false;
});

describe("Route Planner", () => {
  context("Contains DOM Elements", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });
    it("should have a map container present", () => {
      cy.get(".map-div").should("not.be.disabled");
    });

    it("cy.clearLocalStorage() - clear all data in local storage", () => {
      cy.clearLocalStorage(/prop1|2/).should((ls) => {
        expect(ls.getItem("prop1")).to.be.null;
        expect(ls.getItem("prop2")).to.be.null;
      });
    });
  });

  context("Network Requests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("cy.server() network requests and responses", () => {
      cy.server().should((server) => {
        expect(server.method).to.eq("GET");
        expect(server.status).to.eq(200);
      });
    });

    it("able to submit new route", () => {
      cy.mockGeolocation();
      cy.generateRoute();

      cy.server().should((server) => {
        expect(server.method).to.eq("GET");
        expect(server.status).to.eq(200);
      });
    });
  });
});
