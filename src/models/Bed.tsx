import { useFrame } from '@react-three/fiber';
import { Sounds } from '../common/Sounds';
import { hideCursorPointer, showCursorPointer } from '../util/handleCursorPointer';

interface IBed {
	bed: any;
}

const Bed = (props: IBed) => {
	let bedGoesUp: boolean = true;
	let bedMove: boolean = false;
	const Notch: HTMLAudioElement = new Audio(Sounds.Notch);

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();

		Notch.currentTime = 0;
		Notch.play();
		bedMove = true;
	};

	useFrame((state, delta) => {
		if (bedGoesUp && bedMove) {
			props.bed.children[2].rotation.x += delta * 4;
		}
		if (!bedGoesUp && bedMove) {
			props.bed.children[2].rotation.x -= delta * 4;
		}
		if (Number(props.bed.children[2].rotation.x.toFixed(1)) > 0.8) {
			bedGoesUp = false;
			bedMove = false;
			props.bed.children[2].rotation.set(0.8, 0, 0);
		}
		if (props.bed.children[2].rotation.x < 0) {
			bedGoesUp = true;
			bedMove = false;
			props.bed.children[2].rotation.set(0, 0, 0);
		}
	});

	return (
		<primitive
			scale={0.008}
			rotation={[0, Math.PI / 2, 0]}
			position={[0.72, 1.06, 0.45]}
			object={props.bed}
			onPointerOver={showCursorPointer}
			onPointerOut={hideCursorPointer}
			onClick={handleClick}
		/>
	);
};

export default Bed;
