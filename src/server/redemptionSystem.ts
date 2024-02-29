// redemptionSystem.ts
import { RedemptionData } from "@/types/server";
import { Database, DatabaseConfig } from "../db/database";

let showRedeem = false;
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
		const mockData = [
			{
				staff_pass_id: staffPassId,
				team_name: "RAVENCLAW",
				created_at: "2021-05-15T12:28:28.000Z",
			},
		];

		return await this.db
			.query(
				`SELECT * FROM dbo.STAFF_TEAM_MAPPING WHERE staff_pass_id = '${staffPassId}'`
			)
			.then((res) => {
				if (res.success) return res.data;
				return mockData;
			});
	}

	async lookupTeamMembers(teamName: string) {
		const mockData = [
			{
				staff_pass_id: "BOSS_07KM9TDNBNNL",
				team_name: "RAVENCLAW",
				created_at: "2021-07-16T19:54:19.000Z",
			},
			{
				staff_pass_id: "BOSS_095ELKIDNW9D",
				team_name: "RAVENCLAW",
				created_at: "2021-09-07T07:35:24.000Z",
			},
			{
				staff_pass_id: "BOSS_0OG5T2XD87R8",
				team_name: "RAVENCLAW",
				created_at: "2021-09-10T04:13:40.000Z",
			},
			{
				staff_pass_id: "BOSS_0SGSYX8IFQN3",
				team_name: "RAVENCLAW",
				created_at: "2021-11-28T09:39:08.000Z",
			},
		];

		return await this.db
			.query(
				`SELECT * FROM dbo.STAFF_TEAM_MAPPING WHERE team_name = '${teamName}'`
			)
			.then((res) => {
				if (res.success) return res.data;
				return mockData;
			});
	}

	async getRedemptionStatus(teamName: string): Promise<RedemptionData> {
		const mockData = {
			team_name: "RAVENCLAW",
			redeemed_at: "2024-02-29T08:47:07.427Z",
		};

		const result = await this.db
			.query(
				`SELECT * FROM dbo.REDEMPTION_RECORD WHERE team_name = '${teamName}'`
			)
			.then((res) => {
				if (res.success) return res.data;
				const result = showRedeem ? [mockData] : [];
				showRedeem = !showRedeem;
				return result;
			});

		// Redeemed when there is record
		return result.length ? result[0] : {};
	}

	async redeem(teamName: string): Promise<boolean> {
		const redemptionStatus = await this.getRedemptionStatus(teamName);
		if (redemptionStatus.team_name) return false;

		await this.db
			.query(
				`INSERT INTO dbo.REDEMPTION_RECORD VALUES ('${teamName}',  CURRENT_TIMESTAMP)`
			)
			.then((res) => {
				if (res.success) return res.data;
				return false;
			});

		return true;
	}
}
