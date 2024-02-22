import type { NextApiRequest, NextApiResponse } from "next";
import { RedemptionSystem } from "../../server/redemptionSystem";

type Data = {
	data: any[];
};

const redemptionSystem = new RedemptionSystem();

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { team_name } = req.body;
	if (!team_name) {
		res.status(400).json({ data: [] });
		return;
	}

	redemptionSystem.lookupTeamMembers(team_name).then((data) => {
		res.status(200).json({ data: data });
	});
}
