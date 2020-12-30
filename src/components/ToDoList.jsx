import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../App';
import { AddTodo } from './AddTodoButton';
import { TodoForm } from './TodoForm';
import { TodoModal } from './TodoModal';
import { Filters } from './Filters';
import { Loading } from './Loading';
import { ToDo } from './ToDo';

export const ToDoList = () => {
	const {
		state,
		dispatch,
		handleSubmit,
		handleChange,
		handleDelete,
		handleEdit,
	} = useContext(Context);
	const [showAdd, setShowAdd] = useState(false);
	useEffect(() => {
		if (!state.loading) {
			dispatch({ type: 'SHOW_ALL' });
		}
	}, [state.loading]);

	return (
		<div className='h-full'>
			{showAdd && (
				<TodoModal>
					<TodoForm
						activeTodo={state.activeTodo}
						handleClose={() => setShowAdd(false)}
						handleSubmit={(todo) => {
							handleSubmit(todo);
							dispatch({ type: 'CLEAR_ACTIVE_TODO' });
						}}
					/>
				</TodoModal>
			)}
			<div
				className={'shadow-xl bg-white rounded pr-6 py-4 w-4/5 h-full mx-auto'}>
				<div className='flex justify-between items-center mb-4'>
					<Filters />
					<AddTodo handleClick={() => setShowAdd(true)} />
				</div>
				<div className={'overflow-y-auto '} style={{ height: '94%' }}>
					{!state.loading ? (
						state.showingTodos.map((todo) => (
							<ToDo
								key={`todo-${todo.id}`}
								{...todo}
								handleChange={handleChange}
								handleEdit={() => {
									handleEdit(todo.id);
									setShowAdd(true);
								}}
								handleDelete={() => handleDelete(todo.id)}
							/>
						))
					) : (
						<Loading />
					)}
				</div>
			</div>
		</div>
	);
};
