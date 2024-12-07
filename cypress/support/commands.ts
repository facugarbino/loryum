Cypress.Commands.add("loginWithGitHub", () => {
  cy.visit("/");
  cy.get("button").contains("Sign in").click();

  cy.origin("https://github.com", () => {
    // Log in to GitHub
    const githubUsername = Cypress.env("GITHUB_USERNAME");
    const githubPassword = Cypress.env("GITHUB_PASSWORD");
    cy.get("#login_field").type(githubUsername);
    cy.get("#password").type(githubPassword);
    cy.get('input[name="commit"]')?.click();
    cy.get("button").contains("Authorize")?.click();
  });
  cy.get("button").contains("Sign in").click();
});
