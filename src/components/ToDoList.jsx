import React, { useContext } from 'react';
import { Context } from '../App';
import { AddTodo } from './AddTodoInput';
import { Loading } from './Loading';
import { ToDo } from './ToDo';
import { ShowCompleted } from './ShowCompleted';
import { Empty } from './Empty';

export const ToDoList = () => {
	const {
		state,
		dispatch,
		handleSubmit,
		handleChange,
		handleDelete,
		handleEdit,
	} = useContext(Context);

	return (
		<div
			className={
				'md:shadow-xl bg-white md:rounded py-4 w-full md:w-4/5 h-full md:mx-auto'
			}>
			<div className='md:flex justify-between items-center mb-4'>
				{/* <Filters /> */}
				<ShowCompleted
					active={state.showCompleted}
					handleClick={() => {
						dispatch({ type: 'SHOW_COMPLETED_SWITCH' });
						dispatch({ type: 'REFRESH_SHOW' });
					}}
				/>
				<AddTodo handleSubmit={handleSubmit} />
			</div>
			<div className={'md:overflow-y-auto '} style={{ height: '94%' }}>
				{!state.loading ? (
					state.showingTodos.length > 0 ? (
						state.showingTodos.map((todo) => (
							<ToDo
								key={`todo-${todo.id}`}
								{...todo}
								handleChange={handleChange}
								handleEdit={() => {
									handleEdit(todo.id);
								}}
								handleDelete={() => handleDelete(todo.id)}
							/>
						))
					) : (
						<Empty />
					)
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
};
