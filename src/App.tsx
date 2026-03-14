import { useEffect, useState } from "react";
import { Columns } from "./components/columns";
import { Layer } from "./components/layer";
import { LayerShadow } from "./components/layershadow";
import Marker from "./components/marker";
import { Turn } from "./components/turn";

export default function App() {
	const [hovered, setHovered] = useState<number>();
	const [playerPicks, setPlayerPicks] = useState<number[]>([]);
	const [winner, setWinner] = useState<"1" | "2" | null>(null);
	const [reset, setReset] = useState<boolean>(false);
	const [time, setTime] = useState<number>(30);

	useEffect(() => {
		setTime(30);
		const interval = setInterval(() => {
			setTime((prev) => {
				if (prev <= 1) {
					const np = [...playerPicks, -1];
					setPlayerPicks(np);
					setTime(30);
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, [playerPicks]);

	const handleRestart = () => {
		setPlayerPicks([]);
		setWinner(null);
		setReset(true);
		setTimeout(() => {
			setReset(false);
		}, 1000);
	};

	return (
		<div className="w-full h-full flex flex-col items-center gap-4 lg:gap-6 justify-center">
			<div className="w-full relative h-2 max-w-xl ">
				<div
					style={{
						left: `${hovered ? hovered * (100 / 7) + 100 / 7 / 2 : 100 / 7 / 2}%`,
						transition: "all 300ms ease-in-out",
					}}
					className={`w-8 lg:w-12 absolute top-1/2  -translate-y-1/2  -translate-x-1/2 ${playerPicks.length % 2 !== 0 ? "text-[#fd6687]" : "text-[#FFCE67]"} `}
				>
					<Marker />
				</div>
			</div>
			<div className="border-4 grid grid-cols-7 px-2 relative w-full max-w-xl rounded-[40px] [clip-path:inset(0_0_-150px_0)] aspect-[632/584]  lg:pb-15 shadow-[0px_12px]">
				<div className="absolute pointer-events-none top-0 left-0 w-full h-full z-100 opacity-100 scale-101">
					<Layer />
				</div>
				{Array.from({ length: 7 }, (_, i) => (
					<Columns
						key={`column-${i}`}
						startIndex={i * 7}
						winner={winner}
						reset={reset}
						setWinner={setWinner}
						playerPicks={playerPicks}
						setPlayerPicks={setPlayerPicks}
						onHover={() => {
							setHovered(i);
						}}
					/>
				))}
				<div className="w-[80%] max-w-[300px] absolute top-[95%] left-1/2 -translate-x-1/2 z-101">
					<div
						className={`absolute top-0 left-0 ${winner ? "opacity-100" : "opacity-0 scale-90"} transition-all duration-300 ease-in-out uppercase w-full p-4 flex flex-col gap-2 text-sm items-center rounded-2xl shadow-[0px_6px] font-[600] border-4 bg-white`}
					>
						<h2>Player {winner}</h2>
						<p className="text-2xl md:text-4xl">WINS</p>
						<button
							onClick={handleRestart}
							type="button"
							className="rounded-full bg-[#5c2dd5] hover:bg-[#fd6687] p-2 px-4 text-white transition-all duration-300 ease-in-out uppercase cursor-pointer"
						>
							play again
						</button>
					</div>

					<div
						className={`absolute max-w-[180px] left-1/2 -translate-x-1/2 top-0 left-0 ${playerPicks.length % 2 !== 0 ? "text-[#fd6687]" : "text-[#FFCE67]"} ${!winner ? "opacity-100" : "opacity-0 scale-90"} transition-all duration-300 ease-in-out w-full`}
					>
						<Turn />
						<div
							className={`absolute uppercase font-[600] text-center space-y-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${playerPicks.length % 2 !== 0 ? "text-white" : "text-black"}`}
						>
							<p className="text-sm text-nowrap">
								Player {playerPicks.length % 2 === 0 ? 1 : 2}'s Turn
							</p>
							<p className="text-4xl lg:text-5xl">
								{time}
								<span className="text-2xl">s</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
