import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useState } from 'react';

interface ICriminalJusticeRoom {
	room: any;
}

const CriminalJusticeRoom = (props: ICriminalJusticeRoom) => {
	const [animationActive, setAnimationActive] = useState(false);

	useFrame(() => {
		if (props.room.visible) {
			setAnimationActive(true);
		} else {
			setAnimationActive(false);
		}
	});

	return (
		<motion.group
			initial={{ scale: 0, rotateY: 2 }}
			animate={animationActive ? { scale: 1, rotateY: 0 } : {}}
			transition={{
				type: 'spring',
				stiffness: 360,
				damping: 60
			}}>
			<primitive scale={0.005} position={[1.53, 1.9, 1.35]} object={props.room} />
		</motion.group>
	);
};

export default CriminalJusticeRoom;
