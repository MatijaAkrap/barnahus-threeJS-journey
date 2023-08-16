import { Euler, useFrame, Vector3 } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useState } from 'react';
import { Sounds } from '../common/Sounds';
import { showCursorPointer, hideCursorPointer } from '../util/handleCursorPointer';

interface IRoomNavigation {
	arrowPointer: any;
	arrowBody: any;
	arrowText: any;
	position?: Vector3;
	rotation?: Euler;
	roomNumber: number;
	onClick: (roomNumber: number) => void;
}

const RoomNavigation = (props: IRoomNavigation) => {
	const [animationActive, setAnimationActive] = useState(false);
	const buttonClick: HTMLAudioElement = new Audio(Sounds.ButtonClick);

	const handleClickSound = () => {
		buttonClick.volume = 0.3;
		buttonClick.currentTime = 0;
		buttonClick.play();
	};

	const handleRoom = () => {
		setTimeout(() => {
			props.onClick(props.roomNumber);
		}, 70);
	};

	useFrame(() => {
		if (props.arrowPointer.visible) {
			setAnimationActive(true);
		} else {
			setAnimationActive(false);
		}
	});

	return (
		<motion.group
			initial={{ scale: 0 }}
			animate={animationActive ? { scale: 1 } : {}}
			transition={{
				type: 'spring',
				stiffness: 360,
				damping: 60
			}}
			position={props.position}
			rotation={props.rotation}>
			<group
				onClick={handleClickSound}
				onPointerUp={handleRoom}
				onPointerOver={showCursorPointer}
				onPointerOut={hideCursorPointer}>
				<primitive scale={0.012} position={[1, 0.6, 1.6]} object={props.arrowPointer} />
				<primitive scale={0.01} position={[1, 0.6, 1.9]} object={props.arrowBody} />
			</group>
			<primitive scale={0.01} position={[1, 0.6, 3.3]} object={props.arrowText} />
		</motion.group>
	);
};

export default RoomNavigation;
