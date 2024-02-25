import Show from "./Show";

export default function RedeemButton(props: any) {
	const { redeemedStatus, teamName, getRedemptionStatus } = props;

	const handleRedeem = (e: any) => {
		e.preventDefault();
		fetch("/api/redeem", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ team_name: teamName }),
		})
			.then((e) => e.json())
			.then((data: any) => {
				const success = data.success;
				if (success) getRedemptionStatus(teamName);
			});
	};

	return (
		<Show>
			<Show.When isTrue={redeemedStatus?.team_name}>
				<div
					data-testid="redeem-button-placeholder"
					className="bg-transparent w-full h-20"
				/>
			</Show.When>

			<Show.Else>
				<button
					data-testid="redeem-button"
					className="bg-[#43766C] text-white w-full h-20 rounded-lg shadow-lg shadow-black flex flex-row justify-center items-center transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
					type="submit"
					onClick={handleRedeem}
					disabled={redeemedStatus?.team_name == ""}
				>
					Redeem
				</button>
			</Show.Else>
		</Show>
	);
}
