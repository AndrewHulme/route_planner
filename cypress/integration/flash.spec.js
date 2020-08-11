Cypress.on("uncaught:exception", (err, runnable) => {
  console.log(err);
  return false;
});

describe("Flash", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  it("should be able to have flash message in DOM", () => {
    cy.get('input[name="startingPoint"]').type("London Eye");
    cy.get('input[name="roundTripLength"]').type("hello");
    cy.get('select[cy-name="vehicleChoice"]').select("Cycling");
    cy.get("#roundTripButton").click();
    cy.get(".alert").should("have.text", "×Error no address could be found.");
    cy.get(".close").click();
    cy.get(".alert").should("not.exist");
  });
});
