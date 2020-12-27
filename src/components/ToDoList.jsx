import React, { useContext, useState } from 'react';
import { Context } from '../App';
import { AddTodo } from './AddTodoButton';
import { AddTodoForm } from './AddTodoForm';
import { AddTodoModal } from './AddTodoModal';
import { Filters } from './Filters';
import { ToDo } from './ToDo';

export const ToDoList = () => {
	const { state } = useContext(Context);
	const [showAdd, setShowAdd] = useState(false);
	return (
		<div className='h-full'>
			{showAdd && (
				<AddTodoModal>
					<AddTodoForm handleClose={() => setShowAdd(false)} />
				</AddTodoModal>
			)}
			<div
				className={'shadow-xl bg-white rounded pr-6 py-4 w-4/5 h-full mx-auto'}>
				<div className='flex justify-between items-center mb-4'>
					<Filters />
					<AddTodo handleClick={() => setShowAdd(true)} />
				</div>
				<div className={'overflow-y-auto '} style={{ height: '94%' }}>
					{state.todos.map((todo) => (
						<ToDo key={`todo-${todo.id}`} {...todo} />
					))}
				</div>
			</div>
		</div>
	);
};
