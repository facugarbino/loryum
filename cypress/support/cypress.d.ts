// cypress/support/index.d.ts or cypress.d.ts
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in using GitHub OAuth
     * @example cy.loginWithGitHub()
     */
    loginWithGitHub(): Chainable<void>;
  }
}
