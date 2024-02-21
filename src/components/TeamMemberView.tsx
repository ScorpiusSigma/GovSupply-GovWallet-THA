import { StaffMappingData } from "@/types/server";

export default function TeamMemberView(props: any) {
	const { teamMembers } = props;
	function paginate(arr: StaffMappingData[], n: number) {
		const result = [];
		for (let i = 0; i < arr.length; i += n) {
			result.push(arr.slice(i, i + n));
		}
		return result;
	}

	const pagination = paginate(teamMembers, 20);

	return (
		<div className="flex flex-col gap-0 mt-2">
			<div className="px-4 text-gray-500">Team Members</div>
			<div className="relative flex min-h-80 max-h-80 overflow-y-auto flex-col mb-2">
				<table className="table-auto w-full">
					<thead className="sticky top-0 bg-white">
						<tr>
							<th className="px-4 py-1 text-left">Staff ID</th>
							<th className="px-4 py-1 text-center">Team Name</th>
							<th className="px-4 py-1 text-center">
								Registered Date
							</th>
						</tr>
					</thead>
					<tbody>
						{pagination.length ? (
							pagination[0].map(
								(member: StaffMappingData, index: number) => (
									<tr key={index}>
										<td className="px-4 py-1 text-left">
											{member.staff_pass_id}
										</td>
										<td className="px-4 py-1 text-center">
											{member.team_name}
										</td>
										<td className="px-4 py-1 text-center">
											{
												member.created_at
													.toString()
													.split("T")[0]
											}
										</td>
									</tr>
								)
							)
						) : (
							<></>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
