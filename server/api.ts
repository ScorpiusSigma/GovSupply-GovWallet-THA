import * as express from "express";

const router = express.Router();

router.get("/hello", function (req: any, res: any) {
	res.send("hello");
});

router.post("/lookupStaff", function (req: any, res: any) {
});

router.post("/verifyRedemption", function (req: any, res: any) {
	res.send("hello");
});

router.post("/RedemptionStatus", function (req: any, res: any) {
	res.json({
		redeemed: true,
	});
});

router.post("/addRedemption", function (req: any, res: any) {
	res.send("hello");
});

export default router;
