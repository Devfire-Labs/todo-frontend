import React from 'react';
import { Link } from 'react-router-dom';
import rmBtn from '../assets/remove.svg';

export const ToDo = ({
	title,
	description,
	id,
	completed,
	handleChange,
	handleDelete,
}) => {
	return (
		<div
			className='group flex py-4 px-2 items-center border-b border-gray-200 first:border-t last:border-none'
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
			<div className='w-4/5'>
				<Link to={`/t/${id}`}>
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
				</Link>
			</div>
			<button
				className='appearance-none md:hidden group-hover:flex ml-auto mr-4 focus:outline-none'
				onClick={(e) => {
					handleDelete();
				}}>
				<img src={rmBtn} alt='' className='w-4 h-4' />
			</button>
		</div>
	);
};
