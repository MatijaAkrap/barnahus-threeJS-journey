import { useFrame } from '@react-three/fiber';
import { Sounds } from '../common/Sounds';

interface IDrawer {
	drawer: any;
	y: number;
}

const Drawer = (props: IDrawer) => {
	let openCabinet: boolean = true;
	let startAnimation: boolean = false;
	const CabinetOpen: HTMLAudioElement = new Audio(Sounds.CabinetOpen);
	const CabinetClose: HTMLAudioElement = new Audio(Sounds.CabinetClose);

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();

		startAnimation = true;
		if (openCabinet) {
			CabinetOpen.play();
		} else {
			CabinetClose.play();
		}
	};

	useFrame((state, delta) => {
		if (startAnimation && openCabinet) {
			props.drawer.position.x += delta / 3;
		}
		if (props.drawer.position.x > 0.55) {
			openCabinet = false;
			startAnimation = false;
			props.drawer.position.setX(0.55);
		}
		if (startAnimation && !openCabinet) {
			props.drawer.position.x -= delta / 3;
		}
		if (props.drawer.position.x < 0.311) {
			openCabinet = true;
			startAnimation = false;
			props.drawer.position.setX(0.311);
		}
	});

	return (
		<primitive
			scale={[0.0066, 0.0069, 0.0099]}
			position={[0.311, props.y, 1.164]}
			object={props.drawer}
			onClick={handleClick}
		/>
	);
};

export default Drawer;
