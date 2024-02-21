import React, { useState } from "react";
import { RedemptionData, StaffMappingData } from "../types/server";
import RedeemedButton from "@/components/RedeemedButton";
import TeamMemberView from "@/components/TeamMemberView";
import StaffInfoCard from "@/components/StaffInfoCard";
import SearchBar from "@/components/SearchBar";
import RedeemButton from "@/components/RedeemButton";

export default function App() {
	const [staffInfo, setStaffInfo] = useState<StaffMappingData[]>([]);
	const [redeemedStatus, setRedeemedStatus] = useState<RedemptionData>({
		team_name: "",
		redeemed_at: "",
	});
	const [teamMembers, setTeamMembers] = useState([]);

	const handleLookupStaffID = (staffId: string) => {
		fetch("/api/lookupStaff", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ staff_pass_id: staffId }),
		})
			.catch((e: any) => {
				console.log(e);
				return e;
			})
			.then((e) => e.json())
			.then((data) => {
				const resStaffInfo = data.data;
				console.log(resStaffInfo);
				setStaffInfo(resStaffInfo);
				return resStaffInfo.length ? resStaffInfo[0].team_name : "";
			})
			.then((teamName) => {
				getRedemptionStatus(teamName);
				getTeamMembers(teamName);
			});
	};

	const getRedemptionStatus = (teamName: string) => {
		fetch("/api/RedemptionStatus", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ team_name: teamName }),
		})
			.then((e) => e.json())
			.then((data: any) => {
				const resRedeemed = data.data;
				console.log("resRedeemed", resRedeemed);
				setRedeemedStatus(resRedeemed);
			});
	};

	const getTeamMembers = (teamName: string) => {
		fetch("/api/lookupTeamMembers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ team_name: teamName }),
		})
			.then((e) => e.json())
			.then((data) => {
				const resTeamMembers = data.data;
				setTeamMembers(resTeamMembers);
			});
	};

	return (
		<div className="bg-[#034F1B] text-white min-h-screen flex flex-col items-center justify-center">
			<h1 className="text-4xl font-bold mb-6 text-center">
				Christmas Redemption System
			</h1>
			<div className="max-w-2xl mx-auto p-6 bg-[#ffffff] rounded-lg shadow-lg text-[#161853] flex flex-col gap-2 w-full">
				<SearchBar handleLookupStaffID={handleLookupStaffID} />
				<StaffInfoCard
					staffInfo={staffInfo[0]}
					teamInfo={{ count: teamMembers.length }}
				/>
				<TeamMemberView teamMembers={teamMembers} />
				{redeemedStatus.team_name ? (
					<RedeemedButton redeemedStatus={redeemedStatus} />
				) : (
					<RedeemButton
						redeemedStatus={redeemedStatus}
						teamName={
							staffInfo.length ? staffInfo[0].team_name : ""
						}
						getRedemptionStatus={getRedemptionStatus}
					/>
				)}
			</div>
		</div>
	);
}
