import { useFrame } from '@react-three/fiber';

interface IHorsie {
	horsie: any;
}

const Horsie = (props: IHorsie) => {
	let rotationFrequency = 0.0012;

	useFrame(() => {
		props.horsie.rotation.z = props.horsie.rotation.z - rotationFrequency;

		if (props.horsie.rotation.z < -0.15) {
			rotationFrequency = -rotationFrequency;
		}
		if (props.horsie.rotation.z > 0.02) {
			rotationFrequency = -rotationFrequency;
		}
	});

	return <primitive scale={0.0038} rotation={[0, Math.PI / 2, 0]} position={[2.5, 1.03, 2]} object={props.horsie} />;
};

export default Horsie;
