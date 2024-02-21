export default function StaffInfoCard(props: any) {
	const { staffInfo, teamInfo } = props;
	return (
		<div className="bg-[#E6DCB1] flex flex-row text-[#161853] h-24 justify-between items-center p-5 rounded-lg gap-6">
			<div className=" flex flex-row items-end gap-2">
				<div className="text-gray-500">ID:</div>
				<div className="text-lg">{staffInfo?.staff_pass_id || ""}</div>
			</div>
			<div>
				<div className=" flex flex-row items-end gap-2">
					<div className="text-gray-500">Team:</div>
					<div className="text-lg">{staffInfo?.team_name || ""}</div>
				</div>
				<div className=" flex flex-row items-end gap-2">
					<div className="text-gray-500">Total Members:</div>
					<div className="text-lg">{teamInfo.count}</div>
				</div>
			</div>
		</div>
	);
}
