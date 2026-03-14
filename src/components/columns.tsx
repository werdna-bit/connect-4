import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";

const winScenarios = [
	// Vertical (within each column)
	[0, 1, 2, 3],
	[1, 2, 3, 4],
	[2, 3, 4, 5],
	[6, 7, 8, 9],
	[7, 8, 9, 10],
	[8, 9, 10, 11],
	[12, 13, 14, 15],
	[13, 14, 15, 16],
	[14, 15, 16, 17],
	[18, 19, 20, 21],
	[19, 20, 21, 22],
	[20, 21, 22, 23],
	[24, 25, 26, 27],
	[25, 26, 27, 28],
	[26, 27, 28, 29],
	[30, 31, 32, 33],
	[31, 32, 33, 34],
	[32, 33, 34, 35],
	[36, 37, 38, 39],
	[37, 38, 39, 40],
	[38, 39, 40, 41],

	// Horizontal (across columns, same row)
	[0, 6, 12, 18],
	[6, 12, 18, 24],
	[12, 18, 24, 30],
	[18, 24, 30, 36],
	[1, 7, 13, 19],
	[7, 13, 19, 25],
	[13, 19, 25, 31],
	[19, 25, 31, 37],
	[2, 8, 14, 20],
	[8, 14, 20, 26],
	[14, 20, 26, 32],
	[20, 26, 32, 38],
	[3, 9, 15, 21],
	[9, 15, 21, 27],
	[15, 21, 27, 33],
	[21, 27, 33, 39],
	[4, 10, 16, 22],
	[10, 16, 22, 28],
	[16, 22, 28, 34],
	[22, 28, 34, 40],
	[5, 11, 17, 23],
	[11, 17, 23, 29],
	[17, 23, 29, 35],
	[23, 29, 35, 41],

	// Diagonal ↘
	[0, 7, 14, 21],
	[1, 8, 15, 22],
	[2, 9, 16, 23],
	[6, 13, 20, 27],
	[7, 14, 21, 28],
	[8, 15, 22, 29],
	[12, 19, 26, 33],
	[13, 20, 27, 34],
	[14, 21, 28, 35],
	[18, 25, 32, 39],
	[19, 26, 33, 40],
	[20, 27, 34, 41],

	// Diagonal ↙
	[18, 13, 8, 3],
	[19, 14, 9, 4],
	[20, 15, 10, 5],
	[24, 19, 14, 9],
	[25, 20, 15, 10],
	[26, 21, 16, 11],
	[30, 25, 20, 15],
	[31, 26, 21, 16],
	[32, 27, 22, 17],
	[36, 31, 26, 21],
	[37, 32, 27, 22],
	[38, 33, 28, 23],
];

interface Props {
	startIndex: number;
	winner: "1" | "2" | null;
	reset: boolean;
	setWinner: Dispatch<SetStateAction<"1" | "2" | null>>;
	onHover: () => void;
	playerPicks: number[];
	setPlayerPicks: Dispatch<SetStateAction<number[]>>;
}
export const Columns = ({
	startIndex,
	winner,
	setWinner,
	reset,
	onHover,
	setPlayerPicks,
	playerPicks,
}: Props) => {
	const [next, setNext] = useState<number>(startIndex + 5);
	const [width, setWidth] = useState<number>(0);
	const [selected, setSelected] = useState<number[]>([]);
	const [disabled, setDisabled] = useState<boolean>(false);
	const colRef = useRef<HTMLButtonElement>(null);

	const onClick = () => {
		if (winner) return;
		if (next <= startIndex - 1) return;
		setDisabled(true);
		const n = next - 1;
		setNext(n);
		setSelected((prev) => [...prev, next]);
		const nP = [...playerPicks, next];
		setPlayerPicks(nP);
		//check if theres a winner
		const player1Picks = nP.filter((_, i) => i % 2 === 0);
		const player2Picks = nP.filter((_, i) => i % 2 !== 0);

		const player1WinScenario = winScenarios.find((scenario) =>
			scenario.every((i) => player1Picks.includes(i)),
		);

		const player2WinScenario = winScenarios.find((scenario) =>
			scenario.every((i) => player2Picks.includes(i)),
		);

		if (player1WinScenario) {
			setWinner("1");
		} else if (player2WinScenario) {
			setWinner("2");
		}
		setTimeout(() => {
			setDisabled(false);
		}, 1000);
	};

	useEffect(() => {
		if (!colRef.current) return;
		const observer = new ResizeObserver(() => {
			setWidth(colRef.current?.getBoundingClientRect().width ?? 0);
		});
		observer.observe(colRef.current);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!reset) return;
		setWinner(null);
		setSelected([]);
		setNext(startIndex + 5);
	}, [reset, startIndex, setWinner]);

	return (
		<button
			ref={colRef}
			type="button"
			disabled={disabled}
			onClick={onClick}
			onMouseEnter={() => {
				onHover();
			}}
			className="cols-span-1 [clip-path:inset(0_0_-100px_0)] cursor-pointer h-full flex flex-col relative"
		>
			{Array.from({ length: 6 }).map((_, l) => (
				<div
					key={l}
					style={{
						width: width,
						top: `${selected[l] === 0 ? 0 : selected[l] ? (100 / 6) * (5 - l) : -20}%`,
						transition: "top 1000ms ease-in-out",
					}}
					className={`aspect-square absolute mt-3 p-1`}
				>
					<div
						className={`w-full h-full scale-100  aspect-square rounded-full  ${playerPicks.indexOf(selected[l]) % 2 !== 0 ? "bg-[#fd6687]" : "bg-[#FFCE67]"} `}
					></div>
				</div>
			))}

			{Array.from({ length: 6 }).map((_, j) => {
				const index = j + startIndex;
				return (
					<div key={index} className="w-full flex-1 min-w-12 p-2 ">
						<div className="w-full h-full rounded-full"></div>
					</div>
				);
			})}
		</button>
	);
};
