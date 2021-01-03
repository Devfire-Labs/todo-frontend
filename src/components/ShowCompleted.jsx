import React from 'react';

export const ShowCompleted = ({ active, handleClick }) => {
	return (
		<button
			onClick={handleClick}
			className={
				'py-1 px-2 text-xs md:text-sm rounded font-bold text-white ml-4 focus:outline-none ' +
				(!active
					? 'bg-gray-400 hover:bg-gray-500 text-gray-100'
					: 'bg-purple-500')
			}>
			SHOW COMPLETED
		</button>
	);
};
