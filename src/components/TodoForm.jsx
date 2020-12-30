import React, { useEffect, useState } from 'react';

export const TodoForm = ({ handleClose, handleSubmit, activeTodo }) => {
	const [todo, setTodo] = useState({
		title: '',
		description: '',
		completed: false,
		id: '',
	});

	const inputStyles =
		'z-50 px-2 py-1 border-b border-gray-400 w-full opacity-100 mb-4 focus:outline-none';

	useEffect(() => {
		if (activeTodo.title !== '') {
			console.log(activeTodo);
			setTodo((prevState) => activeTodo);
		}
	}, [activeTodo]);
	return (
		<div className='w-4/5 bg-white opacity-100 px-6 py-4 rounded'>
			<label htmlFor='title'>
				<input
					type='text'
					name='title'
					id='title-input'
					value={todo.title}
					placeholder='Title'
					onChange={(e) =>
						setTodo((prevState) => ({ ...prevState, title: e.target.value }))
					}
					className={inputStyles + 'mt-4'}
				/>
			</label>

			<label htmlFor='title'>
				<textarea
					name='desc'
					id='desc-input'
					value={todo.description}
					placeholder='Description'
					onChange={(e) =>
						setTodo((prevState) => ({
							...prevState,
							description: e.target.value,
						}))
					}
					className={inputStyles + ' resize-none h-32'}
				/>
			</label>
			<div className='flex justify-center items-center'>
				<button
					className='py-1 px-2 rounded font-bold text-sm flex items-center text-white focus:outline-none bg-green-400'
					onClick={() => {
						console.log('Submitting...');
						handleSubmit(todo);
						handleClose();
					}}>
					DONE
				</button>
				<button
					className='ml-4 py-1 px-2 rounded font-bold text-sm flex items-center text-white focus:outline-none bg-red-400'
					onClick={handleClose}>
					CLOSE
				</button>
			</div>
		</div>
	);
};
