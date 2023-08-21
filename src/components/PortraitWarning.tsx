import { Html } from '@react-three/drei';
import { ReactComponent as PortraitWarningIcon } from './../Images/PortraitWarningIcon.svg';

const PortraitWarning = () => {
	return (
		<Html>
			<div className='container'>
				<label>To use expirence please turn your phone to lanscape mode</label>
				<PortraitWarningIcon />
			</div>
		</Html>
	);
};

export default PortraitWarning;
