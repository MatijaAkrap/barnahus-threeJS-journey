import { useFrame } from '@react-three/fiber';
import { Sounds } from '../common/Sounds';
import { hideCursorPointer, showCursorPointer } from '../util/handleCursorPointer';

interface IHammer {
	hammer: any;
}

const Hammer = (props: IHammer) => {
	let goUp: boolean = false;
	let startAnimation: boolean = false;
	let moveJoints: boolean = false;
	let moveJointsUp: boolean = true;
	const jump: HTMLAudioElement = new Audio(Sounds.Jump);
	const pop: HTMLAudioElement = new Audio(Sounds.Pop);

	const checkElement = (objectName: string): boolean => {
		return objectName !== 'Joint_1_1' && objectName !== 'Joint_3_2' && objectName !== 'Joint_3_1';
	};

	const showCursorPointerOnHammer = (e: any) => {
		if (checkElement(e.object.name)) showCursorPointer();
	};

	const hideCursorPointerOnHammer = (e: any) => {
		if (checkElement(e.object.name)) hideCursorPointer();
	};

	const handleClick = (e: any) => {
		e.stopPropagation();
		if (checkElement(e.object.name)) startAnimation = true;
	};

	useFrame((state, delta) => {
		if (startAnimation) {
			if (!goUp) {
				props.hammer.children[3].rotation.z -= delta * 2;
			}
			if (goUp) {
				props.hammer.children[3].rotation.z += delta * 2;
			}
			if (Number(props.hammer.children[3].rotation.z.toFixed(1)) < -2.8) {
				pop.currentTime = 0.1;
				pop.volume = 0.3;
				pop.play();
				jump.currentTime = 0.08;
				jump.volume = 0.4;
				jump.play();
				goUp = true;
				moveJoints = true;
				props.hammer.children[3].rotation.z = -2.8;
			}
			if (Number(props.hammer.children[3].rotation.z.toFixed(1)) === -2.4) {
				goUp = false;
				startAnimation = false;
				props.hammer.children[3].rotation.z = -2.45;
			}
		}
		if (moveJoints) {
			if (moveJointsUp) {
				props.hammer.children[2].children[0].rotation.z -= delta * 3.2;
				props.hammer.children[2].children[0].children[0].rotation.z -= delta * 3.2;
			}
			if (!moveJointsUp) {
				props.hammer.children[2].children[0].rotation.z += delta * 3.5;
				props.hammer.children[2].children[0].children[0].rotation.z += delta * 3.5;
			}
			if (Number(props.hammer.children[2].children[0].rotation.z.toFixed(1)) < 0.2) {
				moveJointsUp = false;
				props.hammer.children[2].children[0].rotation.z = 0.2;
			}
			if (Number(props.hammer.children[2].children[0].rotation.z.toFixed(1)) > 1.4 && !moveJointsUp) {
				moveJoints = false;
				moveJointsUp = true;
				props.hammer.children[2].children[0].rotation.z = 1.4;
			}
		}
	});

	return (
		<primitive
			scale={0.0052}
			rotation={[0, Math.PI / 2, 0]}
			position={[0.04, 2.4, 2.1]}
			object={props.hammer}
			onPointerOver={showCursorPointerOnHammer}
			onPointerOut={hideCursorPointerOnHammer}
			onClick={handleClick}
		/>
	);
};

export default Hammer;
