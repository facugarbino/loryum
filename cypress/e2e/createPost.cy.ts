import { User } from "@supabase/supabase-js";
import { supabase } from "../support/supabase";

describe("Create Post Workflow", () => {
  before(() => {
    cy.loginWithGitHub();
  });

  it("should create a post and show it", () => {
    cy.visit("/");

    const postContent = "This is a Cypress E2E test post!";

    cy.get("textarea") // Post creation text area
      .type(postContent);

    cy.get("button").contains("Post").click();

    // Verify the post appears in the DOM
    const post = cy.get('[data-cy="post-container"]').contains(postContent);
    post.get('[data-cy="post-content"]').should("contain.text", postContent);
    post
      .get('[data-cy="post-creator"]')
      .should("contain.text", "Facundo Garbino");
  });
});
