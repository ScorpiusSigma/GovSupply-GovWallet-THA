import { useEffect, useState } from "react";
import ReindeerIcon from "./ReindeerIcon";

export default function RedeemedButton(props: any) {
	const { redeemedStatus } = props;
	const [isAnimated, setIsAnimated] = useState(false);
	const [showRedeemed, setShowRedeemed] = useState(false);

	useEffect(() => {
		const timeoutId1 = setTimeout(() => {
			setIsAnimated(true);
		}, 500);

		const timeoutId2 = setTimeout(() => {
			setShowRedeemed(true);
		}, 4000);
		return () => {
			clearTimeout(timeoutId1);
			clearTimeout(timeoutId2);
		};
	}, []);

	return (
		<div className="flex flex-row items-center justify-center">
			{redeemedStatus?.team_name ? (
				showRedeemed ? (
					<button
						data-testid="redeemed-on-button"
						className="bg-gray-400 text-white w-full h-20 rounded-lg flex flex-row justify-center items-center"
						type="submit"
						disabled={true}
					>
						Redeemed on {redeemedStatus.redeemed_at?.split("T")[0]}
					</button>
				) : (
					<div
						data-testid="redeemed-button"
						className="relative bg-[#43766C] text-white w-full h-20 rounded-lg shadow-lg shadow-black flex flex-row items-center overflow-hidden"
					>
						<div className="whitespace-nowrap">
							---------------------------------------------------------------------------------------------
						</div>
						<div className="absolute w-full h-full">
							<div className={`flex w-full justify-between px-2`}>
								{[...Array(10)].map((x, index) => (
									<div key={index}>🎄</div>
								))}
							</div>
						</div>
						<div className="absolute w-full h-full flex items-end">
							<div
								className={`flex justify-end transition-all duration-[6000ms] ${
									isAnimated
										? "w-full translate-x-1/2"
										: "w-0 -translate-x-0"
								}`}
							>
								<ReindeerIcon />
							</div>
						</div>
					</div>
				)
			) : (
				<></>
			)}
		</div>
	);
}
