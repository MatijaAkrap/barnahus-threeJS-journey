import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Suspense, useState } from 'react';
import Scene from './models/Scene';

const Experience = () => {
	const [enebleControlsMovment, setEnebleControlsMovment] = useState(false);

	const controlsProps = {
		maxPolarAngle: Math.PI / 2,
		minAzimuthAngle: -Math.PI / 2000,
		maxAzimuthAngle: Math.PI / 2
	};

	return (
		<>
			{/* <Perf position='top-left' /> */}
			<OrthographicCamera makeDefault position={[5, 5, 5]} zoom={window.innerHeight / 5} near={4} far={10} />
			<OrbitControls
				makeDefault
				{...controlsProps}
				enableZoom={enebleControlsMovment}
				enableRotate={enebleControlsMovment}
				minZoom={100}
				maxZoom={1600}
			/>
			<ambientLight intensity={0.8} />
			<directionalLight
				castShadow
				position={[7, 5, 6]}
				intensity={1}
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
