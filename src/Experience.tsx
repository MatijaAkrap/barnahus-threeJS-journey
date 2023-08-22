import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Scene from './models/Scene';

const Experience = () => {
	const [enebleControlsMovment, setEnebleControlsMovment] = useState<boolean>(false);
	const [cameraZoom, setCameraZoom] = useState<number>(window.innerHeight / (isMobile ? 4.5 : 5));

	const controlsProps = {
		maxPolarAngle: Math.PI / 2,
		minAzimuthAngle: -Math.PI / 2000,
		maxAzimuthAngle: Math.PI / 2
	};
	const handleResize = () => {
		setCameraZoom(window.innerHeight / (isMobile ? 4.5 : 5));
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<>
			{/* <Perf position='top-left' /> */}
			<OrthographicCamera makeDefault position={[5, 5, 5]} zoom={cameraZoom} near={4} far={10} />
			<OrbitControls
				makeDefault
				{...controlsProps}
				enableZoom={enebleControlsMovment}
				enableRotate={enebleControlsMovment}
				minZoom={isMobile ? 50 : 100}
				maxZoom={1600}
			/>
			<ambientLight intensity={0.8} />
			<directionalLight
				castShadow
				position={[7, 5, 6]}
				intensity={1.15}
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-camera-near={6}
				shadow-camera-far={10}
				shadow-camera-top={2}
				shadow-camera-bottom={-2}
				shadow-camera-left={-2}
				shadow-camera-right={2}
			/>
			<Suspense fallback={null}>
				<Scene setEnebleControlsMovment={setEnebleControlsMovment} />
			</Suspense>
		</>
	);
};

export default Experience;
