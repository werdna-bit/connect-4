import { useState } from "react";

interface Props {
	startIndex: number;
	onHover: () => void;
}
export const Columns = ({ startIndex, onHover }: Props) => {
	const [next, setNext] = useState<number>(startIndex + 6);
	const [width, setWidth] = useState<number>(0);

	const onClick = () => {
		if (next <= startIndex) return;
		const n = next - 1;
		setNext(n);
		alert(n);
	};

	return (
		<button
			type="button"
			onClick={onClick}
			onMouseEnter={(e) => {
				onHover();
				setWidth(e.currentTarget.getBoundingClientRect().width);
			}}
			className="cols-span-1 h-full flex flex-col"
		>
			<div
				style={{ width: width }}
				className="aspect-square p-2 absolute bg-red-500 rounded-full"
			></div>

			{Array.from({ length: 7 }).map((_, j) => {
				const index = j + startIndex;
				return (
					<div key={index} className="w-full flex-1 p-1 lg:p-2">
						<div className="w-full h-full bg-white rounded-full">{next}</div>
					</div>
				);
			})}
		</button>
	);
};
