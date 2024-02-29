import { StaffMappingData } from "@/types/server";
import { useState } from "react";
import Show from "./Show";

export default function TeamMemberView(props: any) {
	const { teamMembers } = props;
	const [page, setPage] = useState(0);

	function paginate(arr: StaffMappingData[], n: number) {
		const result = [];
		for (let i = 0; i < arr.length; i += n) {
			result.push(arr.slice(i, i + n));
		}
		return result;
	}

	const pages = paginate(teamMembers, 20);

	const Pagination = (props: any) => {
		const { pages } = props;
		const styleUnselected =
			"px-4 py-2 font-semibold text-gray-900 hover:bg-gray-50 border-x";

		const incPage = () => setPage(() => Math.min(pages.length - 1, page + 1));
		const decPage = () => setPage(() => Math.max(0, page - 1));

		return (
			<div
				data-testid="team-member-view"
				className="flex flex-row text-xs sm:text-base rounded-lg overflow-hidden border-y "
			>
				<button className={styleUnselected} onClick={decPage}>
					{"<"}
				</button>

				<div className="w-20 sm:w-28 flex flex-row justify-between px-4 py-2 font-semibold text-gray-900 border-x gap-">
					<span className="text-indigo-500">{page + 1}</span>
					<span className="text-gray-400">/</span>
					<span className="text-gray-400">{pages.length}</span>
				</div>

				<button className={styleUnselected} onClick={incPage}>
					{">"}
				</button>
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-0 mt-2">
			<div className="flex flex-row justify-between items-center my-2">
				<div className="px-4 text-gray-500">MEMBER LIST</div>
				<Pagination pages={pages} />
			</div>
			<div className="relative flex min-h-80 max-h-80 overflow-y-auto flex-col mb-2">
				<table className="table-auto w-full">
					<thead className="sticky top-0 bg-white">
						<tr>
							<th className="px-4 py-1 text-left">Staff ID</th>
							<th className="px-4 py-1 text-center hidden sm:flex">
								Team Name
							</th>
							<th className="px-4 py-1 text-center">
								Registered Date
							</th>
						</tr>
					</thead>
					<tbody>
						<Show>
							<Show.When isTrue={pages.length}>
								{pages[page].map(
									(
										member: StaffMappingData,
										index: number
									) => (
										<tr key={index}>
											<td className="px-4 py-1 text-left">
												{member.staff_pass_id}
											</td>
											<td className="px-4 py-1 text-center hidden sm:flex">
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
								)}
							</Show.When>
						</Show>
					</tbody>
				</table>
			</div>
		</div>
	);
}
