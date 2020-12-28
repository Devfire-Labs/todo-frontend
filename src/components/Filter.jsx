import React from 'react';

export const Filter = ({ name, active, handleClick }) => {
	return (
		<button
			onClick={handleClick}
			className={
				' py-1 px-2 text-sm rounded font-bold text-white mr-4 last:mr-0 focus:outline-none ' +
				(!active ? 'bg-gray-400 hover:bg-gray-600' : 'bg-purple-500')
			}>
			{name}
		</button>
	);
};
