import React from "react";
import RedeemButton from "./RedeemButton";

describe("<RedeemButton />", () => {
	it("can't redeem as there is no team name", () => {
		cy.intercept("/api/redeem", { success: true }).as("redeemApiCall");

		const getRedemptionStatus = (teamName: string) => {
			fetch("/api/RedemptionStatus", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ team_name: teamName }),
			})
				.then((e) => e.json())
				.then((data: any) => {
					const resRedeemed = data.data;
				});
		};

		cy.intercept("POST", "/api/RedemptionStatus", {
			fixture: "apiRedemptionStatusStub.json",
		}).as("redeemedStatus");

		// Mount the component
		cy.mount(
			<RedeemButton
				redeemedStatus={{ team_name: "" }}
				teamName="RavenClaw"
				getRedemptionStatus={getRedemptionStatus}
			/>
		);

		cy.get('[data-testid="redeem-button-placeholder"]').should("exist");
	});

	it("handles redeeming correctly", () => {
		cy.intercept("/api/redeem", { success: true }).as("redeemApiCall");

		const getRedemptionStatus = (teamName: string) => {
			fetch("/api/RedemptionStatus", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ team_name: teamName }),
			})
				.then((e) => e.json())
				.then((data: any) => {
					const resRedeemed = data.data;
				});
		};

		cy.intercept("POST", "/api/RedemptionStatus", {
			fixture: "apiRedemptionStatusStub.json",
		}).as("redeemedStatus");

		// Mount the component
		cy.mount(
			<RedeemButton
				redeemedStatus={{ team_name: "RavenClaw" }}
				teamName="RavenClaw"
				getRedemptionStatus={getRedemptionStatus}
			/>
		);

		cy.get('[data-testid="redeem-button"]').should("exist");
    cy.get('[data-testid="redeem-button"]').click();
	});
});
