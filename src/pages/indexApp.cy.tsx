import React from "react";
import App from "./index";

// cypress/integration/app.spec.js
describe("<App />", () => {
	it("should display Christmas Redemption title", () => {
		cy.mount(<App />);
		cy.get("h1").should("contain.text", "🎄Christmas Redemption🎄");
		cy.get("div").should(
			"contain.text",
			"Search by Staff ID for redemption information"
		);
		cy.get('[data-testid="search-input"]').should("exist");
	});

	it("should search for staff ID and display redemption information", () => {
		cy.mount(<App />);

		// // Mock the API response for lookupStaff
		cy.intercept("POST", "/api/lookupStaff", {
			fixture: "apiLookupStaffStub.json",
		}).as("staffInfo");

		// // Mock the API response for RedemptionStatus
		cy.intercept("POST", "/api/RedemptionStatus", {
			fixture: "apiRedemptionStatusStub.json",
		}).as("redeemedStatus");

		// // Mock the API response for lookupTeamMembers
		cy.intercept("POST", "/api/lookupTeamMembers", {
			fixture: "apiLookupTeamMembersStub.json",
		}).as("teamMembers");

		// Type a staff ID in the search bar and trigger the search
		cy.get('[data-testid="search-input"]').type("STAFF_ZPJJNS8TV7G0");
		cy.get('[data-testid="search-button"]').click();

		// // Check if staff information and redemption information are displayed
		cy.get('[data-testid="staff-info-card"]').should("exist");
		cy.get('[data-testid="team-member-view"]').should("exist");
		cy.get('[data-testid="redeem-button"]').should("exist");
	});
});
