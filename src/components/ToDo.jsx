import React from 'react';
import { Link } from 'react-router-dom';

export const ToDo = ({
	title,
	description,
	id,
	completed,
	handleChange,
	handleDelete,
}) => {
	return (
		<Link to={`/t/${id}`}>
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
					<h2
						className={
							'text-black font-bold ' +
							(completed && 'text-gray-400 line-through')
						}>
						{title}
					</h2>
					<p
						className={
							'text-sm' +
							(completed ? ' text-gray-400 line-through' : ' text-gray-700')
						}>
						{description}
					</p>
				</div>
				<button
					className='hidden group-hover:flex ml-auto py-1 px-2 rounded font-bold text-xs text-white focus:outline-none bg-red-400'
					onClick={handleDelete}>
					DELETE
				</button>
			</div>
		</Link>
	);
};
