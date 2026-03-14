import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";

interface Props {
	startIndex: number;
	onHover: () => void;
	playerPicks: number[];
	setPlayerPicks: Dispatch<SetStateAction<number[]>>;
}
export const Columns = ({
	startIndex,
	onHover,
	setPlayerPicks,
	playerPicks,
}: Props) => {
	const [next, setNext] = useState<number>(startIndex + 5);
	const [width, setWidth] = useState<number>(0);
	const [selected, setSelected] = useState<number[]>([]);
	const colRef = useRef<HTMLButtonElement>(null);

	const onClick = () => {
		if (next <= startIndex - 1) return;
		const n = next - 1;
		setNext(n);
		setSelected((prev) => [...prev, next]);
		const nP = [...playerPicks, next];
		setPlayerPicks(nP);
		//check if theres a winner
		//
	};

	useEffect(() => {
		if (!colRef) return;
		setWidth(colRef.current?.getBoundingClientRect().width ?? 0);
	}, []);

	return (
		<button
			ref={colRef}
			type="button"
			onClick={onClick}
			onMouseEnter={() => {
				onHover();
			}}
			className="cols-span-1 cursor-pointer h-full flex flex-col relative"
		>
			{Array.from({ length: 6 }).map((_, l) => (
				<div
					key={l}
					style={{
						width: width,
						top: `${selected[l] === 0 ? 0 : selected[l] ? (100 / 6) * (5 - l) : -20}%`,
						transition: "all 1000ms ease-in-out",
					}}
					className="aspect-square p-2 absolute rounded-full"
				>
					<div className="w-full h-full rounded-full bg-red-500"></div>
				</div>
			))}

			{Array.from({ length: 6 }).map((_, j) => {
				const index = j + startIndex;
				return (
					<div
						key={index}
						className="w-full flex-1 aspect-square min-w-12 lg:p-2"
					>
						<div className="w-full h-full bg-white rounded-full">{next}</div>
					</div>
				);
			})}
		</button>
	);
};
