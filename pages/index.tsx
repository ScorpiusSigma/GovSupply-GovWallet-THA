import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import { StaffMappingData } from "server/type";

export default function App() {
	const [staffInfo, setStaffInfo] = useState<StaffMappingData[]>([]);
	const [redeemable, setRedeemable] = useState<boolean>(false);

	const onLookup = (e) => {
		e.preventDefault();
		const staffId = e.target.staffIdorTeamName.value;
		fetch("/api/lookupStaff", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: staffId }),
		})
			.then((e) => e.json())
			.then((data) => {
				const resStaffInfo = data.data;
				setStaffInfo(resStaffInfo);
				return resStaffInfo.length ? resStaffInfo[0].team_name : "";
			})
			.then((teamName) => getRedemptionStatus(teamName));
	};

	const getRedemptionStatus = (teamName) => {
		fetch("/api/RedemptionStatus", {
			method: "POST",
			body: JSON.stringify({ team_name: teamName }),
		})
			.then((e) => e.json())
			.then((data) => {
				const resRedeemed = data.redeemed;
				setRedeemable(resRedeemed);
			});
	};

	const onRedeem = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<form onSubmit={onLookup}>
				Staff ID or Team Name: <input id="staffIdorTeamName" />
				<button type="submit">Lookup</button>
			</form>
			<div>
				<p>{staffInfo.length ? staffInfo[0].team_name : ""}</p>
				{redeemable ? (
					<button type="submit" onClick={onRedeem}>
						Redeem
					</button>
				) : (
					<button type="submit">Can't Redeem</button>
				)}
			</div>
			<div>{staffInfo.map((staff) => staff.staff_pass_id)}</div>
		</div>
	);
}
