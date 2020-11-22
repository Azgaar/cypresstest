// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// get iframe and retry until the body element is not empty
Cypress.Commands.add('frameLoaded', selector => {
  return cy
  .get(selector)
  .its('0.contentDocument.body').should('not.be.empty')
})