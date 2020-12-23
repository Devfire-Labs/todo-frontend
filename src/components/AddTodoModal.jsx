import React from 'react';

export const AddTodoModal = (props) => {
	return (
		<div
			className='fixed z-40 top-0 left-0 flex flex-col justify-center items-center h-screen w-full'
			style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
			<div className=''>{props.children}</div>
		</div>
	);
};
