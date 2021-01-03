import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../App';
import backBtn from '../assets/left-arrow.svg';

export const ToDoDetails = ({ match }) => {
	const {
		dispatch,
		handleSubmit,
		handleClose,
		handleChange,
		refreshList,
	} = useContext(Context);

	const {
		params: { todoId },
	} = match;

	const initialTodo = {
		id: '',
		title: '',
		description: '',
		completed: false,
	};

	const [todo, setTodo] = useState(initialTodo);
	const [isLoading, setIsLoading] = useState(true);
	const [err, setErr] = useState(0);

	const inputStyles = 'z-50 px-2 py-1 w-full opacity-100 focus:outline-none';

	useEffect(() => {
		axios
			.get(`https://to-do-backendapi.herokuapp.com/todos/${todoId}/`)
			.then((r) => {
				setTodo(r.data);
				setIsLoading(false);
			})
			.catch((err) => {
				setErr(err.response.status);
				console.error('Error:', err);
			});
	}, [todoId]);

	useEffect(() => {
		if (todo !== initialTodo) {
			setTimeout(
				1000,
				axios
					.put(`https://to-do-backendapi.herokuapp.com/todos/${todoId}/`, todo)
					.catch((err) => dispatch({ type: 'SET_ERR', payload: err }))
			);
		}
	}, [todo]);

	return (
		<div className='md:shadow-xl bg-white rounded w-full md:w-4/5 h-full md:mx-auto'>
			<div className='bar px-4 py-6 border-b-2 border-gray-200 flex items-center'>
				<Link to='/' onClick={refreshList}>
					<img src={backBtn} alt='' className='w-4 h-4' />
				</Link>
				<input
					type='checkbox'
					checked={todo.completed}
					name='checkbox'
					id=''
					onChange={(e) => {
						handleChange(todo.id);
						setTodo((prevState) => ({
							...prevState,
							completed: !todo.completed,
						}));
					}}
					className='form-checkbox text-purple-500 mx-6 border border-gray-500 w-4 h-4 rounded text-white checked:border-transparent focus:outline-none '
				/>
			</div>
			{!isLoading &&
				(err === 404 ? (
					<div className='px-6 py-4 text-3xl font-bold text-black'>
						404 <span className='text-md font-medium'>Not Found</span>
					</div>
				) : (
					<div className='px-6 py-4'>
						<label htmlFor='title'>
							<input
								type='text'
								name='title'
								id='title-input'
								value={todo.title}
								placeholder='Title'
								onChange={(e) =>
									setTodo((prevState) => ({
										...prevState,
										title: e.target.value,
									}))
								}
								className={inputStyles + 'mt-4 font-bold text-xl mb-2'}
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
					</div>
				))}
		</div>
	);
};
