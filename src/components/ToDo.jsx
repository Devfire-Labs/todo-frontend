import React from 'react';

export const ToDo = ({
	title,
	description,
	id,
	completed,
	handleChange,
	handleEdit,
	handleDelete,
}) => {
	return (
		<div
			className='group flex p-2 items-center border-b border-gray-200 last:border-none'
			id={`todo-${id}`}>
			<input
				type='checkbox'
				checked={completed}
				name='checkbox'
				id=''
				onChange={(e) => {
					handleChange(id);
				}}
				className='form-checkbox text-purple-500 mx-6 border border-gray-500 w-4 h-4 rounded text-white checked:border-transparent focus:outline-none '
			/>
			<div className=''>
				<h2 className='text-black font-bold'>{title}</h2>
				<p className='text-sm text-gray-700'>{description}</p>
			</div>
			<div className='hidden group-hover:flex group-hover:opacity-100 ml-auto mr-8'>
				<button
					className='py-1 px-2 rounded font-bold text-xs text-white focus:outline-none bg-blue-400'
					onClick={handleEdit}>
					EDIT
				</button>
				<button
					className='ml-2 py-1 px-2 rounded font-bold text-xs text-white focus:outline-none bg-red-400'
					onClick={handleDelete}>
					DELETE
				</button>
			</div>
		</div>
	);
};
