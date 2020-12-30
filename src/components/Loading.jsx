import React from 'react';
import loadingIcon from '../assets/loading.svg';

export const Loading = () => {
	return (
		<div className='h-full w-full flex flex-col justify-center items-center'>
			<img className='animate-spin w-16' src={loadingIcon} alt='' />
		</div>
	);
};
