import * as sql from "mssql";

export type DatabaseConfig = {
	user: string;
	password: string;
	server: string;
	port: number;
	database: string;
	trustServerCertificate: boolean;
	options: any;
};

export class Database {
	private config: DatabaseConfig;

	constructor(config: DatabaseConfig) {
		this.config = config;
	}

	async query(query: string) {
		// Connect to the database
		const result = await sql
			.connect(this.config)
			.then((pool: any) => {
				// Query
				return pool.request().query(query);
			})
			.then((result) => {
				return result.recordset;
			})
			.catch((err) => {
				console.error("Error:", err);
				return [];
			})
			.finally(() => {
				// Close the connection pool
				sql.close();
			});

		return result;
	}
}
