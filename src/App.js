import React, { createContext, useReducer } from 'react';
import { ToDoList } from './components/ToDoList';

const initialState = {
	filters: {
		showAll: { name: 'SHOW ALL', active: true, action: 'SHOW_ALL' },
		completed: { name: 'COMPLETED', action: 'SHOW_COMPLETED' },
		pending: { name: 'PENDING', action: 'SHOW_PENDING' },
	},
	todos: [
		{
			id: 1,
			title: 'Go to Market',
			description: 'Buy ingredients to prepare dinner',
			completed: true,
		},
		{
			id: 2,
			title: 'Study',
			description: 'Read Algebra and History textbook for upcoming test',
			completed: false,
		},
		{
			id: 3,
			title: "Sally's books",
			description: "Go to library to rent sally's books",
			completed: true,
		},
		{
			id: 4,
			title: 'Article',
			description: 'Write article on how to use django with react',
			completed: false,
		},
	],
};

export const Context = createContext();

const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'SHOW_ALL':
			return {
				...state,
				todos: initialState.todos,
				filters: initialState.filters,
			};

		case 'SHOW_COMPLETED':
			return {
				...state,
				todos: initialState.todos.filter((todo) => todo.completed),
				filters: {
					showAll: { name: 'SHOW ALL', action: 'SHOW_ALL' },
					completed: {
						name: 'COMPLETED',
						active: true,
						action: 'SHOW_COMPLETED',
					},
					pending: { name: 'PENDING', action: 'SHOW_PENDING' },
				},
			};

		case 'SHOW_PENDING':
			return {
				...state,
				todos: initialState.todos.filter((todo) => !todo.completed),
				filters: {
					showAll: { name: 'SHOW ALL', action: 'SHOW_ALL' },
					completed: {
						name: 'COMPLETED',
						action: 'SHOW_COMPLETED',
					},
					pending: { name: 'PENDING', active: true, action: 'SHOW_PENDING' },
				},
			};
		default:
			return state;
	}
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<Context.Provider value={{ state, dispatch }}>
			<div
				className={
					'h-screen flex flex-col justify-center bg-gradient-to-br from-purple-600 to-pink-500 py-40'
				}>
				<ToDoList />
			</div>
		</Context.Provider>
	);
}

export default App;
