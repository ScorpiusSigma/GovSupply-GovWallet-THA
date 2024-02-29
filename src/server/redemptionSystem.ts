// redemptionSystem.ts
import { RedemptionData } from "@/types/server";
import { Database, DatabaseConfig } from "../db/database";

export class RedemptionSystem {
	private dbConfig: DatabaseConfig = {
		user: process.env.DB_USER || "SA",
		password: process.env.DB_PASSWORD || "Password123",
		server: process.env.DB_SERVER || "localhost",
		port: parseInt(process.env.DB_PORT || "1433"),
		database: process.env.DB_DATABASE_NAME || "GOVSUPPLY_GOVWALLET_THA",
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
