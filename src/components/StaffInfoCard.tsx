export default function StaffInfoCard(props: any) {
	const { staffInfo, teamInfo } = props;
	return (
		<div className="bg-[#E6DCB1] flex flex-col sm:flex-row text-[#161853] h-24 justify-center sm:justify-evenly sm:items-center items-start p-5 rounded-lg sm:gap-6">
			<div className=" flex justify-start sm:flex-row items-end gap-2">
				<div className="text-gray-500">ID:</div>
				<div className="text-sm sm:text-lg">{staffInfo?.staff_pass_id || ""}</div>
			</div>
			<div>
				<div className=" flex justify-start sm:flex-row items-end gap-2">
					<div className="text-gray-500">Team:</div>
					<div className="text-sm sm:text-lg">{staffInfo?.team_name || ""}</div>
				</div>
				<div className=" flex justify-start sm:flex-row items-end gap-2">
					<div className="text-gray-500">Total Members:</div>
					<div className="text-sm sm:text-lg">{teamInfo.count}</div>
				</div>
			</div>
		</div>
	);
}
