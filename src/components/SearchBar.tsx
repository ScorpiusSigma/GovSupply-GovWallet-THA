import { useState } from "react";

export default function SearchBar(props: any) {
	const { handleLookupStaffID } = props;
	const [staffId, setStaffId] = useState<string>("");

	return (
		<div className="bg-[#E6DCB1] rounded-lg h-12 flex justify-center items-center overflow-clip">
			<div className="w-full h-full">
				<div className="flex h-full w-full bg-transparent border border-[#FAEDF0]">
					<input
						data-testid="search-input"
						id="staffIdorTeamName"
						className="bg-transparent w-full focus:bg-none px-5"
						placeholder="Search by Staff ID"
						value={staffId}
						onChange={(e: any) => setStaffId(e.target.value)}
					/>
					<button
						data-testid="search-button"
						className="bg-[#034F1B] text-white px-10"
						onClick={() => handleLookupStaffID(staffId)}
					>
						Search
					</button>
				</div>
			</div>
		</div>
	);
}
