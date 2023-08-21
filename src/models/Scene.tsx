import { useGLTF } from '@react-three/drei';
import CriminalJusticeRoom from './CriminalJusticeRoom';
import RoomNavigation from './RoomNavigation';
import PhysicalWellbeingRoom from './PhysicalWellbeingRoom';
import { Dispatch, useEffect, useState } from 'react';
import { Colors } from '../common/Colors';
import * as THREE from 'three';
import ExperienceStart from '../components/ExperienceStart';
import { isMobile, useMobileOrientation } from 'react-device-detect';
import PortraitWarning from '../components/PortraitWarning';

interface IScene {
	setEnebleControlsMovment: Dispatch<React.SetStateAction<boolean>>;
}

const Scene = (props: IScene) => {
	const { isLandscape } = useMobileOrientation();
	const [roomNumber, setRoomNumber] = useState<number>(0);
	const barnahus: any = useGLTF('./Scene/barnahus-draco.glb');

	barnahus.scene.traverse((obj: any) => {
		if (obj.isMesh) {
			if (
				obj.name !== 'Arrow_2' &&
				obj.name !== 'Arrow_1' &&
				obj.name !== 'Arrow_text' &&
				obj.name !== 'Arrow_2_1' &&
				obj.name !== 'Arrow_1_1' &&
				obj.name !== 'Arrow_text_1'
			) {
				obj.castShadow = true;
				obj.receiveShadow = true;
			}
			if (obj.name === 'Trigger_Next' || obj.name === 'Trigger_Previous') {
				obj.visible = false;
			}
			if (obj.name === 'Sound_base_1' || obj.name === 'Bed_Lower' || obj.name === 'Cube_3') {
				obj.parent.visible = false;
			}
		}
	});

	const handleRoom = (roomNumber: number) => {
		const root: any = document.getElementById('root');
		const isFirstRoomShown = roomNumber === 1;
		const isSecondRoomShown = roomNumber === 2;
		let backgroundColor;
		let fontColor;

		setRoomNumber(roomNumber);

		barnahus.scene.visible = isFirstRoomShown;
		barnahus.nodes.Sound_base_1.visible = isFirstRoomShown;
		barnahus.nodes.Sound_Icon_1.visible = isFirstRoomShown;
		barnahus.nodes.Gallery_base_1.visible = isFirstRoomShown;
		barnahus.nodes.Gallery_icon_1.visible = isFirstRoomShown;
		barnahus.nodes.Bed.visible = isFirstRoomShown;
		barnahus.nodes.Group_6.parent.visible = isFirstRoomShown;
		barnahus.nodes.Hammer_1.parent.visible = isFirstRoomShown;
		barnahus.nodes.Pressure.visible = isFirstRoomShown;
		barnahus.nodes.Cabinet_1.visible = isFirstRoomShown;
		barnahus.nodes.Drawer_1.visible = isFirstRoomShown;
		barnahus.nodes.Drawer_2.visible = isFirstRoomShown;
		barnahus.nodes.Drawer_3.visible = isFirstRoomShown;
		barnahus.nodes.Swirl_Chair.visible = isFirstRoomShown;
		barnahus.nodes.Horsie.visible = isFirstRoomShown;
		barnahus.nodes.Arrow_2.visible = isSecondRoomShown;
		barnahus.nodes.Arrow_1.visible = isSecondRoomShown;
		barnahus.nodes.Arrow_text.visible = isSecondRoomShown;
		barnahus.nodes.Arrow_2_1.visible = isFirstRoomShown;
		barnahus.nodes.Arrow_1_1.visible = isFirstRoomShown;
		barnahus.nodes.Arrow_text_1.visible = isFirstRoomShown;
		barnahus.nodes.Criminal_Room.visible = isSecondRoomShown;
		backgroundColor =
			isFirstRoomShown || (!isFirstRoomShown && !isSecondRoomShown)
				? Colors.PhysicalWellbeingRoomBackgroundColor
				: Colors.CriminaljusticeRoomBackgroundColor;
		fontColor = isFirstRoomShown ? Colors.PhysicalWellbeingRoomFontColor : Colors.CriminaljusticeRoomFontColor;

		barnahus.nodes.Arrow_2.material.color = new THREE.Color(fontColor);
		barnahus.nodes.Arrow_1.material.color = new THREE.Color(fontColor);
		barnahus.nodes.Arrow_text.material.color = new THREE.Color(fontColor);
		barnahus.nodes.Arrow_2_1.material.color = new THREE.Color(fontColor);
		barnahus.nodes.Arrow_1_1.material.color = new THREE.Color(fontColor);
		barnahus.nodes.Arrow_text_1.material.color = new THREE.Color(fontColor);
		root.style.backgroundColor = backgroundColor;
	};

	useEffect(() => {
		barnahus.nodes.Criminal_Room.visible = false;
		handleRoom(0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{!isLandscape && isMobile ? (
				<PortraitWarning />
			) : (
				<>
					{roomNumber === 0 && (
						<ExperienceStart handleRoom={handleRoom} setEnebleControlsMovment={props.setEnebleControlsMovment} />
					)}
					<RoomNavigation
						arrowPointer={barnahus.nodes.Arrow_2}
						arrowBody={barnahus.nodes.Arrow_1}
						arrowText={barnahus.nodes.Arrow_text}
						position={[-1.45, 0, 4.4]}
						rotation={[0, 1.57, 0]}
						roomNumber={1}
						onClick={handleRoom}
					/>
					<PhysicalWellbeingRoom barnahus={barnahus} />
					<CriminalJusticeRoom room={barnahus.nodes.Criminal_Room} />
					<RoomNavigation
						arrowPointer={barnahus.nodes.Arrow_2_1}
						arrowBody={barnahus.nodes.Arrow_1_1}
						arrowText={barnahus.nodes.Arrow_text_1}
						position={[2.43, 0, -1.45]}
						rotation={[0, 0, 0]}
						roomNumber={2}
						onClick={handleRoom}
					/>
				</>
			)}
		</>
	);
};

export default Scene;

useGLTF.preload('./Scene/barnahus.gltf');
