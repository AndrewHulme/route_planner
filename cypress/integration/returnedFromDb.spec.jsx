Cypress.on("uncaught:exception", (err, runnable) => {
  console.log(err);
  return false;
});

describe("ReturnedFromDb", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  it("should generate,show and saved a trip", () => {

    // cy.userLogin();
    cy.get('input[name="startingPoint"]').type("London Eye");
    cy.get('input[name="roundTripLength"]').type("5000");
    cy.get('select[cy-name="vehicleChoice"]').select("Cycling");
    cy.get("#roundTripButton").click();
    cy.get('input[name="description"]').type("My Route");
    cy.get("#saveRoute").click();
    cy.get("#roundTripButton").should("have.value", "Randomise");
    cy.get("#my-routes").click();
    cy.contains("My Route");
    cy.get(".description").should("be.visible");
    cy.get(".MuiSvgIcon-root").first().click();
    cy.get(".description").should("not.be.visible");
    cy.get("#logOutButton").click();
  });
});
