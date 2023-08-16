interface ICabinet {
	cabinet: any;
}

const Cabinet = (props: ICabinet) => {
	const stopPropagation = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
	};

	return (
		<primitive
			scale={[0.0066, 0.0068, 0.0099]}
			rotation={[0, 0, 0]}
			position={[0.29, 1.05, 1.164]}
			object={props.cabinet.Cabinet_1}
			onPointerOver={stopPropagation}
			onClick={stopPropagation}
		/>
	);
};

export default Cabinet;
