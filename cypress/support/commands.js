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
  cy.get('#addEndPoint').click();
  cy.get('input[name="startingpoint"]').type(startInput);
  cy.get('input[name="endpoint"]').type(endpoint);
  cy.get('#roundTripButton').click();
});

Cypress.Commands.add('userLogin', () => {
  cy.get('#exampleInputEmail1').type('dummy@dummy.com');
  cy.get('#exampleInputPassword1').type('password');
  cy.get('#logInButton').click();
});

Cypress.Commands.add('saveRoute', () => {
  cy.get('input[name="roundTripStart"]').type('London Eye');
  cy.get('input[name="roundTripLength"]').type('5000');
  cy.get('select[cy-name="vehicleChoice"]').select('Cycling');
  cy.get('#roundTripButton').click();
  cy.get('input[name="description"]').type('My Route');
  cy.get('#saveRoute').click();
  cy.get('#roundTripButton').should('have.value', 'Randomise');
  cy.get('.close').click();
});

Cypress.Commands.add('logOutUserIfLoggedIn', () => {
  cy.get('body').then(($body) => {
    if ($body.text().includes('Logout')) {
      cy.get('#logOutButton').click();
    }
  });
});
