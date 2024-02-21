// redemptionSystem.ts
import { RedemptionData } from "@/types/server";
import { Database, DatabaseConfig } from "../db/database";

export class RedemptionSystem {
	private dbConfig: DatabaseConfig = {
		user: "SA",
		password: "Password123",
		server: "localhost",
		port: 1433,
		database: "GOVSUPPLY_GOVWALLET_THA",
		trustServerCertificate: true,
		options: {
			encrypt: true,
		},
	};
	private db = new Database(this.dbConfig);

	async lookupRepresentative(staffPassId: string) {
		return await this.db.query(
			`SELECT * FROM dbo.STAFF_TEAM_MAPPING WHERE staff_pass_id = '${staffPassId}'`
		);
	}

	async lookupTeamMembers(teamName: string) {
		return await this.db.query(
			`SELECT * FROM dbo.STAFF_TEAM_MAPPING WHERE team_name = '${teamName}'`
		);
	}

	async getRedemptionStatus(teamName: string): Promise<RedemptionData> {
		const result = await this.db.query(
			`SELECT * FROM dbo.REDEMPTION_RECORD WHERE team_name = '${teamName}'`
		);

		// Redeemed when there is record
		return result.length ? result[0] : {};
	}

	async redeem(teamName: string): Promise<boolean> {
		const redemptionStatus = await this.getRedemptionStatus(teamName);
		if (redemptionStatus.team_name) return false;

		await this.db.query(
			`INSERT INTO dbo.REDEMPTION_RECORD VALUES ('${teamName}',  CURRENT_TIMESTAMP)`
		);

		return true;
	}
}
