// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('mockGeolocation', (latitude = null, longitude = null) => {
  cy.window().then(($window) => {
    cy.stub($window.navigator.geolocation, 'getCurrentPosition', (callback) => {
      return callback({ coords: { latitude, longitude } });
    });
  });
});

Cypress.Commands.add('generateRoute', () => {
  const startInput = 'W1 C1DE';
  const endpoint = 'London Eye';
  cy.get('input[name="startingpoint"]').type(startInput);
  cy.get('input[name="endpoint"]').type(endpoint);
  cy.get('.btn-primary').click();
});
