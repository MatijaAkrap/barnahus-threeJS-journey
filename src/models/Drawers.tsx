import { hideCursorPointer, showCursorPointer } from '../util/handleCursorPointer';
import Drawer from './Drawer';

interface IDrawers {
	drawers: any;
}

const Drawers = (props: IDrawers) => {
	return (
		<>
			<group onPointerOver={showCursorPointer} onPointerOut={hideCursorPointer}>
				<Drawer drawer={props.drawers.Drawer_1} y={1.195} />
				<Drawer drawer={props.drawers.Drawer_2} y={1.085} />
				<Drawer drawer={props.drawers.Drawer_3} y={0.975} />
			</group>
		</>
	);
};

export default Drawers;
