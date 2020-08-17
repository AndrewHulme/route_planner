/// <reference types='cypress' />

Cypress.on("uncaught:exception", (err, runnable) => {
  console.log(err);
  return false;
});

describe("Form", () => {
  context("Contains DOM Elements for Normal Trips", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
      cy.get("#addEndPoint").click();
    });

    it("accepts input Endpoint", () => {
      const input = "Endpoint";
      cy.get('input[name="endPoint"]').type(input).should("have.value", input);
    });

    it("should contain an Add Endpoint button", function () {
      cy.get("#addEndPoint").should("have.value", "Round Trip");
    });

    it("contains an option to choose my own location as a start point", () => {
      cy.get('button[value="myLocation"]').click();

      const input = "My Location";
      cy.get('input[name="startingPoint"]').should("have.value", input);
    });
  });

  context("Contains DOM Elements for Round Trip", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("accepts input Startingpoint", () => {
      const input = "Startingpoint";
      cy.get('input[name="startingPoint"]')
        .type(input)
        .should("have.value", input);
    });

    it("should have a different form for round trip", function () {
      cy.get('input[name="startingPoint"]')
        .type("Hello")
        .should("have.value", "Hello");
    });

    it("it prevents default behaviour of the function", () => {
      cy.get('form[id="roundTripForm"]').submit();
      cy.url().should("eq", "http://localhost:3000/");
    });

    it("prevents default behaviour of the function", () => {
      cy.get("#roundTripForm").submit();
      cy.url().should("eq", "http://localhost:3000/");
    });

    it("contains a vehicle selector with driving option", () => {
      cy.get('select[cy-name="vehicleChoice"]')
        .select("Driving")
        .should("have.value", "driving-car");
    });

    it("contains a vehicle selector with cycling option", () => {
      cy.get('select[cy-name="vehicleChoice"]')
        .select("Cycling")
        .should("have.value", "cycling-regular");
    });

    it("contains a vehicle selector with walking option", () => {
      cy.get('select[cy-name="vehicleChoice"]')
        .select("Walking")
        .should("have.value", "foot-walking");
    });

    it("contains a vehicle selector with hiking option", () => {
      cy.get('select[cy-name="vehicleChoice"]')
        .select("Hiking")
        .should("have.value", "foot-hiking");
    });

    it("should be able to choose own location as a start point for round trip", () => {
      cy.get('button[value="myRoundLocation"]').click();

      const input = "My Location";
      cy.get('input[name="startingPoint"]').should("have.value", input);
    });

    it("contains a vehicle selector with hiking option for round trip", () => {
      cy.get('select[cy-name="vehicleChoice"]')
        .select("Hiking")
        .should("have.value", "foot-hiking");
    });

    it("should change generate to randomise after initial round trip selection", function () {
      const startInput = "London Eye";
      const length = 10000;

      cy.get('input[name="startingPoint"]').type(startInput);
      cy.get('input[name="roundTripLength"]').type(length);
      cy.get('select[cy-name="vehicleChoice"]').select("Walking");
      cy.get("#roundTripButton").click();
      cy.get("#roundTripButton").should("have.value", "Randomise");
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
  });
});
