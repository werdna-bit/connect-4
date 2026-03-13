import { useRef, useState } from "react";
import Marker from "./components/marker";

export default function App() {
	const [markerPos, setMarkerPos] = useState<number>(0);
	const [width, setWidth] = useState<number>(0);

	const containerRef = useRef<HTMLDivElement>(null);

	const handleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const containerRect = containerRef.current?.getBoundingClientRect();
		setWidth(rect.width);
		setMarkerPos(rect.x - (containerRect?.x ?? 0));
	};

	return (
		<div className="w-full h-full flex flex-col bg-purple-400 items-center justify-center">
			<div ref={containerRef} className="w-full max-w-xl relative mb-1 h-12">
				<div
					style={{
						position: "absolute",
						left: markerPos,
						width: width,
						transition: "all 200ms ease-in-out",
					}}
					className="w-full h-full absolute top-1/2 -translate-y-1/2"
				>
					<Marker />
				</div>
			</div>

			<div className="grid grid-cols-7 gap-4 bg-white w-full max-w-xl rounded-[30px] border-3 p-4 shadow-[0_9px] aspect-square">
				{Array.from({ length: 7 }).map((_, i) => (
					<button
						type="button"
						onMouseEnter={(e) => handleHover(e)}
						tabIndex={i}
						key={crypto.randomUUID()}
						className="w-full  h-full grid grid-cols-1 grid-row-7 gap-4"
					>
						{Array.from({ length: 7 }).map((_, j) => (
							<button
								key={crypto.randomUUID()}
								type="button"
								className="w-full h-full border-2 shadow-[0px_-5px] border-t-3 rounded-full aspect-square bg-purple-400"
							>
								{j + i * 7}
							</button>
						))}
					</button>
				))}
			</div>
			{markerPos}
		</div>
	);
}
