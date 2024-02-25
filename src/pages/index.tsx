import React, { useState } from "react";
import { RedemptionData, StaffMappingData } from "../types/server";
import RedeemedButton from "@/components/RedeemedButton";
import TeamMemberView from "@/components/TeamMemberView";
import StaffInfoCard from "@/components/StaffInfoCard";
import SearchBar from "@/components/SearchBar";
import RedeemButton from "@/components/RedeemButton";
import Show from "@/components/Show";

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
				return e;
			})
			.then((e) => e.json())
			.then((data) => {
				const resStaffInfo = data.data;
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

	const renderSnowflakes = () => {
		return [...Array(10)].map((x) => (
			<img
				src="https://i.gifer.com/19V4.gif"
				className="top-0 left-0 -z-0 w-full opacity-20"
			/>
		));
	};

	const renderButton = () => {
		return (
			<Show>
				<Show.When isTrue={redeemedStatus?.team_name}>
					<RedeemedButton redeemedStatus={redeemedStatus} />
				</Show.When>

				<Show.Else>
					<RedeemButton
						redeemedStatus={redeemedStatus}
						teamName={
							staffInfo.length ? staffInfo[0].team_name : ""
						}
						getRedemptionStatus={getRedemptionStatus}
					/>
				</Show.Else>
			</Show>
		);
	};

	return (
		<div className="relative bg-[#034F1B] text-white min-h-screen flex flex-col items-center justify-center text-sm sm:text-base overflow-hidden">
			<div className="absolute w-full h-full">{renderSnowflakes()}</div>
			<h1 className="text-xl sm:text-4xl font-bold py-[0.5vh] sm:mb-6 text-center z-10">
				🎄Christmas Redemption🎄
			</h1>
			<div className="max-w-2xl mx-auto p-6 bg-[#ffffff] rounded-lg shadow-lg text-[#161853] flex flex-col gap-2 w-full min-h-96 z-10">
				<SearchBar handleLookupStaffID={handleLookupStaffID} />
				<Show>
					<Show.When isTrue={teamMembers.length}>
						<StaffInfoCard
							staffInfo={staffInfo[0]}
							teamInfo={{ count: teamMembers.length }}
						/>
						<TeamMemberView teamMembers={teamMembers} />
						{renderButton()}
					</Show.When>

					<Show.Else>
						<div className="my-12 w-full h-full text-gray-700 text-center">
							Search by Staff ID for redemption information
						</div>
					</Show.Else>
				</Show>
			</div>
		</div>
	);
}
