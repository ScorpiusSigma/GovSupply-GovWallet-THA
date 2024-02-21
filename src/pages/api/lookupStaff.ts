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
	const { staff_pass_id } = req.body;
	if (!staff_pass_id) {
		res.status(400).json({ data: [] });
		return;
	}

	redemptionSystem.lookupRepresentative(staff_pass_id).then((data) => {
		res.json({ data: data });
	});
}
