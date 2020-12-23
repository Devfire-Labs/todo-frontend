import React from 'react';

export const ToDo = ({ title, description, id, completed }) => {
	return (
		<div
			className='flex p-2 items-center border-b border-gray-200 last:border-none'
			id={`todo-${id}`}>
			<input
				type='checkbox'
				checked={completed}
				name='checkbox'
				id=''
				onChange={(e) => {}}
				className='form-checkbox text-purple-500 mx-6 border border-gray-500 w-4 h-4 rounded text-white checked:border-transparent focus:outline-none '
			/>
			<div className=''>
				<h2 className='text-black font-bold'>{title}</h2>
				<p className='text-sm text-gray-700'>{description}</p>
			</div>
		</div>
	);
};
