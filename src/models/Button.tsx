import { useEffect } from 'react';
import * as THREE from 'three';
import { Colors } from '../common/Colors';
import { Sounds } from '../common/Sounds';
import { hideCursorPointer, showCursorPointer } from '../util/handleCursorPointer';

interface IButton {
	name: string;
	base: any;
	icon: any;
	y: number;
}

const Button = (props: IButton) => {
	let buttonIsClicked: boolean = false;
	const welcomeSpeach: HTMLAudioElement = new Audio(Sounds.WelcomSpeech);

	const handleClick = () => {
		if (props.base.visible === true) {
			const buttonClick: HTMLAudioElement = new Audio(Sounds.ButtonClick);
			buttonClick.volume = 0.3;
			buttonClick.play();
			if (props.name === 'sound') {
				welcomeSpeach.currentTime = 0;
				if (!buttonIsClicked) {
					welcomeSpeach.play();
					props.base.material.color = new THREE.Color(Colors.PhysicalWellbeingRoomButtonClickedColor);
					props.base.position.set(0.11, props.y, 2.63);
					props.icon.position.set(0.14, props.y, 2.63);
				} else {
					welcomeSpeach.pause();
					props.base.material.color = new THREE.Color(Colors.PhysicalWellbeingRoomButtonColor);
					props.base.position.set(0.12, props.y, 2.63);
					props.icon.position.set(0.15, props.y, 2.63);
				}
			} else {
				window.open(
					'https://www.flickr.com/photos/childrenatrisk/albums/72157717379881712/with/50729403682/',
					'_blank'
				);
			}
			buttonIsClicked = !buttonIsClicked;
		}
	};

	useEffect(() => {
		props.icon.traverse((obj: any) => {
			if (obj.isMesh) {
				obj.castShadow = false;
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<primitive scale={0.011} rotation={[0, 1.6, 0]} position={[0.15, props.y, 2.63]} object={props.icon} />
			<primitive
				scale={0.011}
				rotation={[0, 1.6, 0]}
				position={[0.12, props.y, 2.63]}
				object={props.base}
				onPointerOver={showCursorPointer}
				onPointerOut={hideCursorPointer}
				onClick={handleClick}
			/>
		</>
	);
};

export default Button;
