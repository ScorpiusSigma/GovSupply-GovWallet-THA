import type { NextApiRequest, NextApiResponse } from "next";
import { RedemptionSystem } from "../../server/redemptionSystem";

type Data = {
	success: boolean;
};

const redemptionSystem = new RedemptionSystem();

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { team_name } = req.body;
	if (!team_name) {
		res.json({ success: false });
		return;
	}

	redemptionSystem.redeem(team_name).then((data) => {
		res.json({ success: data });
	});
}
