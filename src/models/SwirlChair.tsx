import { useFrame } from '@react-three/fiber';
import { Sounds } from '../common/Sounds';
import { showCursorPointer, hideCursorPointer } from '../util/handleCursorPointer';

interface ISwirlChair {
	swirlChair: any;
}

const SwirlChair = (props: ISwirlChair) => {
	let goUp: boolean = true;
	let spinChair: boolean = false;
	const chairSqueak: HTMLAudioElement = new Audio(Sounds.ChairSqueak);

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		spinChair = true;
	};

	useFrame((state, delta) => {
		if (goUp && spinChair) {
			chairSqueak.play();
			props.swirlChair.rotation.y += delta * 200;
			props.swirlChair.position.y += 0.003;
		}
		if (!goUp && spinChair) {
			chairSqueak.play();
			props.swirlChair.rotation.y -= delta * 200;
			props.swirlChair.position.y -= 0.003;
		}
		if (Number(props.swirlChair.position.y.toFixed(2)) === 1.16) {
			spinChair = false;
			goUp = false;
			chairSqueak.pause();
			chairSqueak.currentTime = 0.3;
		}
		if (props.swirlChair.position.y === 1.06) {
			spinChair = false;
			goUp = true;
			chairSqueak.pause();
			chairSqueak.currentTime = 0.3;
		}
	});

	return (
		<primitive
			scale={0.008}
			rotation={[0, Math.PI / 2, 0]}
			position={[1.195, 1.06, 1.09]}
			object={props.swirlChair}
			onPointerOver={showCursorPointer}
			onPointerOut={hideCursorPointer}
			onClick={handleClick}
		/>
	);
};

export default SwirlChair;
