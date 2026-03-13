import { useState } from "react";
import { Columns } from "./components/columns";
import Marker from "./components/marker";

export default function App() {
	const [hovered, setHovered] = useState<number>();
	const [playerPicks, setPlayerPicks] = useState<number[]>([]);
	return (
		<div className="w-full h-full bg-purple-500 flex flex-col items-center gap-4 lg:gap-6 justify-center">
			{playerPicks}
			<div className="w-full relative h-2 max-w-lg ">
				<div
					style={{
						left: `${hovered ? hovered * (100 / 7) + 100 / 7 / 2 : 100 / 7 / 2}%`,
						transition: "all 300ms ease-in-out",
					}}
					className="w-8 lg:w-12 absolute top-1/2  -translate-y-1/2  -translate-x-1/2"
				>
					<Marker />
				</div>
			</div>
			<div className="border-4 grid grid-cols-7 overflow-hidden w-full max-w-lg aspect-square rounded-3xl shadow-[0px_6px]">
				{Array.from({ length: 7 }, (_, i) => (
					<Columns
						key={`column-${i}`}
						startIndex={i * 7}
						setPlayerPicks={setPlayerPicks}
						onHover={() => {
							setHovered(i);
						}}
					/>
				))}
			</div>
		</div>
	);
}
