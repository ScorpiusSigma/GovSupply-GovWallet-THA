import type { NextApiRequest, NextApiResponse } from "next";
import { RedemptionSystem } from "../../server/redemptionSystem";
import { RedemptionData } from "@/types/server";

type Data = {
	data: RedemptionData;
};

const redemptionSystem = new RedemptionSystem();

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { team_name } = req.body;
	if (!team_name) {
		res.json({ data: { team_name: "", redeemed_at: "" } });
		return;
	}
	redemptionSystem
		.getRedemptionStatus(team_name)
		.then((data: RedemptionData) => {
			res.json({ data: data });
		});
}
