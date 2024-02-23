import React from "react";
import RedeemedButton from "./RedeemedButton";

describe("<RedeemedButton/ >", () => {
	it("displays the redeemed status correctly", () => {
		// Mount the component with redeemed status
		cy.mount(
			<RedeemedButton
				redeemedStatus={{
					team_name: "YourTeamName",
					redeemed_at: "2022-02-14T12:34:56Z",
				}}
			/>
		);

		// Assert the initial state
		cy.get('[data-testid ="redeemed-on-button"]').should("not.exist");
		cy.get('[data-testid ="redeemed-button"]').should("exist");

		// Wait for the animation and transition to complete
		cy.wait(6000);

		// Assert the final state after animation and transition
		cy.get('[data-testid ="redeemed-button"]').should("not.exist");
		cy.get('[data-testid ="redeemed-on-button"]').should("exist");
		cy.get('[data-testid ="redeemed-on-button"]').should(
			"have.text",
			"Redeemed on 2022-02-14"
		);
	});
});
