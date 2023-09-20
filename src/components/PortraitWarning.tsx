import { useMobileOrientation } from 'react-device-detect';
import { ReactComponent as PortraitWarningIcon } from './../Images/PortraitWarningIcon.svg';

const PortraitWarning = () => {
	const { isPortrait } = useMobileOrientation();

	return (
		<div className={`portrait-warning-container ${isPortrait ? 'show' : 'hide'}`}>
			<label>To use experience please turn your phone to landscape mode</label>
			<PortraitWarningIcon />
		</div>
	);
};

export default PortraitWarning;
