import Bed from './Bed';
import Button from './Button';
import Cabinet from './Cabinet';
import Hammer from './Hammer';
import Horsie from './Horsie';
import Lamp from './Lamp';
import Pressure from './Pressure';
import SwirlChair from './SwirlChair';
import { motion } from 'framer-motion-3d';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';
import Drawers from './Drawers';

interface IPhysicalWellbeingRoom {
	barnahus: any;
}

const PhysicalWellbeingRoom = (props: IPhysicalWellbeingRoom) => {
	const [animationActive, setAnimationActive] = useState(false);

	useFrame(() => {
		if (props.barnahus.scene.visible) {
			setAnimationActive(true);
		} else {
			setAnimationActive(false);
		}
	});

	return (
		<motion.group
			initial={{ scale: 0, rotateY: -2 }}
			animate={animationActive ? { scale: 1, rotateY: 0 } : {}}
			transition={{
				type: 'spring',
				stiffness: 360,
				damping: 60
			}}>
			<primitive position={[0, 0.6, 0]} object={props.barnahus.scene} />
			<Button
				name={'sound'}
				base={props.barnahus.nodes.Sound_base_1}
				icon={props.barnahus.nodes.Sound_Icon_1}
				y={2.02}
			/>
			<Button
				name={'gallery'}
				base={props.barnahus.nodes.Gallery_base_1}
				icon={props.barnahus.nodes.Gallery_icon_1}
				y={1.69}
			/>
			<Bed bed={props.barnahus.nodes.Bed} />
			<Lamp lamp={props.barnahus.nodes.Group_6.parent} />
			<Hammer hammer={props.barnahus.nodes.Hammer_1.parent} />
			<Pressure pressure={props.barnahus.nodes.Pressure} />
			<Cabinet cabinet={props.barnahus.nodes} />
			<Drawers drawers={props.barnahus.nodes} />
			<SwirlChair swirlChair={props.barnahus.nodes.Swirl_Chair} />
			<Horsie horsie={props.barnahus.nodes.Horsie} />;
		</motion.group>
	);
};

export default PhysicalWellbeingRoom;
