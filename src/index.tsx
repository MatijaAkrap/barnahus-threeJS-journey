import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import CustomLoader from './components/CustomLoader';
import Experience from './Experience';
import * as THREE from 'three';
import './index.css';
import PortraitWarning from './components/PortraitWarning';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<>
		<PortraitWarning />
		<CustomLoader />
		<Canvas shadows={{ enabled: true, type: THREE.PCFSoftShadowMap }}>{<Experience />}</Canvas>
	</>
);
