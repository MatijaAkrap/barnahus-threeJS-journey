import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';
import { Sounds } from '../common/Sounds';
import { hideCursorPointer, showCursorPointer } from '../util/handleCursorPointer';

interface IPressure {
	pressure: any;
}

const Pressure = (props: IPressure) => {
	let animationIntensity: number = 0;
	let previousAnimationIntensity: number = 0;
	const PumpSound: HTMLAudioElement = new Audio(Sounds.PumpSound);

	const checkElement = (objectName: string): boolean => {
		return objectName === 'Sphere_3';
	};

	const showCursorPointerOnPump = (e: any) => {
		if (checkElement(e.object.name)) showCursorPointer();
	};

	const hideCursorPointerOnPump = (e: any) => {
		if (checkElement(e.object.name)) hideCursorPointer();
	};

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();

		PumpSound.currentTime = 0;
		PumpSound.play();

		if (animationIntensity < 3) {
			animationIntensity += 1;
		}

		setTimeout(() => {
			if (animationIntensity > 0) {
				animationIntensity -= 1;
				previousAnimationIntensity += 1;
				setTimeout(() => {
					if (previousAnimationIntensity > 0) {
						previousAnimationIntensity -= 1;
					}
				}, 300);
			}
		}, 300);
	};

	useFrame((state, delta) => {
		if (props.pressure.children[5].scale.y < 6.5) {
			props.pressure.children[4].children[0].scale.x -= 0.004 * animationIntensity * (delta * 70);
			props.pressure.children[4].children[0].scale.y -= 0.004 * animationIntensity * (delta * 70);
			props.pressure.children[4].children[0].scale.z -= 0.004 * animationIntensity * (delta * 70);

			props.pressure.children[5].scale.y += 0.15 * animationIntensity * (delta * 70);
			props.pressure.children[5].position.y += 1.38 * animationIntensity * (delta * 70);
		}

		if (props.pressure.children[4].children[0].scale.x < 1) {
			props.pressure.children[4].children[0].scale.x += 0.004 * previousAnimationIntensity * (delta * 70);
			props.pressure.children[4].children[0].scale.y += 0.004 * previousAnimationIntensity * (delta * 70);
			props.pressure.children[4].children[0].scale.z += 0.004 * previousAnimationIntensity * (delta * 70);
		}

		if (props.pressure.children[5].scale.y > 0) {
			props.pressure.children[5].scale.y -= 0.15 * previousAnimationIntensity * (delta * 70);
			props.pressure.children[5].position.y -= 1.38 * previousAnimationIntensity * (delta * 70);
		}
		if (props.pressure.children[5].scale.y < 0) {
			props.pressure.children[5].scale.y = 0.1;
			props.pressure.children[5].position.y = -50.7;
		}
	});

	useEffect(() => {
		if (Number(props.pressure.children[4].children[0].position.z.toFixed(1)) === 13.1) {
			props.pressure.children[4].children[0].position.z -= 10;
			props.pressure.children[4].children[0].position.x += 6;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<primitive
			scale={0.01}
			rotation={[0, Math.PI * 2, 0]}
			position={[2.5, 1.47, 0.25]}
			object={props.pressure}
			onPointerOver={showCursorPointerOnPump}
			onPointerOut={hideCursorPointerOnPump}
			onClick={handleClick}
		/>
	);
};

export default Pressure;
