import { useEffect, useRef } from 'react';
import { Sounds } from '../common/Sounds';
import { showCursorPointer, hideCursorPointer } from '../util/handleCursorPointer';

interface ILamp {
	lamp: any;
}

const Lamp = (props: ILamp) => {
	const spotLightRef: any = useRef();
	const lightSwitch: HTMLAudioElement = new Audio(Sounds.LightSwitch);

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();

		lightSwitch.currentTime = 0;
		lightSwitch.play();

		if (spotLightRef.current.visible) {
			spotLightRef.current.visible = false;
		} else {
			spotLightRef.current.visible = true;
		}
	};

	useEffect(() => {
		if (props.lamp) {
			props.lamp.children[0].children[1].rotation.y = 0.3;
			props.lamp.children[0].children[1].rotation.z = 5;
			props.lamp.children[0].children[1].position.x = -10;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.lamp]);

	useEffect(() => {
		if (spotLightRef) {
			spotLightRef.current.visible = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [spotLightRef]);

	return (
		<group>
			<spotLight
				castShadow
				ref={spotLightRef}
				rotation={[-10, 5.4, -0.9]}
				position={[0.8, 1.99, 0.54]}
				intensity={0.6}
				angle={Math.PI / 6}
				color='white'
				shadow-camera-near={0.1}
				shadow-camera-far={10}
			/>
			<primitive
				scale={0.006}
				rotation={[0, -Math.PI / 2, 0]}
				position={[1.02, 2, 0.43]}
				object={props.lamp}
				onPointerOver={showCursorPointer}
				onPointerOut={hideCursorPointer}
				onClick={handleClick}
			/>
		</group>
	);
};

export default Lamp;
