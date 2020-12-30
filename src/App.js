import axios from 'axios';
import React, { createContext, useReducer, useEffect } from 'react';
import { ToDoList } from './components/ToDoList';

const initialState = {
	loading: true,
	filters: {
		showAll: { name: 'SHOW ALL', active: true, action: 'SHOW_ALL' },
		completed: { name: 'COMPLETED', action: 'SHOW_COMPLETED' },
		pending: { name: 'PENDING', action: 'SHOW_PENDING' },
	},
	todos: [],
	showingTodos: [],
	activeTodo: { title: '', description: '', completed: false, id: '' },
	err: '',
	activeFilter: '',
};

export const Context = createContext();

const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'GET_TODOS':
			return { ...state, loading: true, todos: [], err: '' };

		case 'GET_TODOS_SUCCESS':
			return {
				...state,
				todos: [...state.todos, ...payload],
				err: '',
				loading: false,
			};

		case 'GET_TODOS_FAILED':
			return { ...state, todos: [], err: payload, loading: false };

		case 'SHOW_ALL':
			return {
				...state,
				showingTodos: state.todos,
				filters: initialState.filters,
				activeFilter: 'SHOW_ALL',
			};

		case 'SHOW_COMPLETED':
			return {
				...state,
				showingTodos: state.todos.filter((todo) => todo.completed),
				filters: {
					showAll: { name: 'SHOW ALL', action: 'SHOW_ALL' },
					completed: {
						name: 'COMPLETED',
						active: true,
						action: 'SHOW_COMPLETED',
					},
					pending: { name: 'PENDING', action: 'SHOW_PENDING' },
				},
				activeFilter: 'SHOW_COMPLETED',
			};

		case 'SHOW_PENDING':
			return {
				...state,
				showingTodos: state.todos.filter((todo) => !todo.completed),
				filters: {
					showAll: { name: 'SHOW ALL', action: 'SHOW_ALL' },
					completed: {
						name: 'COMPLETED',
						action: 'SHOW_COMPLETED',
					},
					pending: { name: 'PENDING', active: true, action: 'SHOW_PENDING' },
				},

				activeFilter: 'SHOW_PENDING',
			};

		case 'CHANGE_COMPLETED':
			return {
				...state,
				todos: [
					...state.todos.filter((item) => item.id !== payload.id),
					payload,
				],
			};

		case 'DELETE_TODO':
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== payload),
			};

		case 'EDIT_TODO':
			return {
				...state,
				todos: [
					...state.todos.filter((todo) => todo.id !== payload.id),
					payload,
				],
			};

		case 'SET_ACTIVE_TODO':
			return {
				...state,
				activeTodo: state.todos.filter((todo) => todo.id === payload)[0],
			};

		case 'CLEAR_ACTIVE_TODO':
			return { ...state, activeTodo: initialState.activeTodo };

		case 'SET_ERR':
			return { ...state, err: payload };

		default:
			return state;
	}
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const refreshList = () => {
		dispatch({ type: 'GET_TODOS' });
		axios
			.get('https://to-do-backendapi.herokuapp.com/todos/')
			.then((r) => {
				dispatch({ type: 'GET_TODOS_SUCCESS', payload: r.data });
				dispatch({
					type: state.activeFilter !== '' ? state.activeFilter : 'SHOW_ALL',
				});
			})
			.catch((err) => {
				console.error(err);
				dispatch({ type: 'GET_TODOS_FAILED' });
				alert(err);
			});
	};
	const handleSubmit = (todo) => {
		if (todo.id !== '') {
			dispatch({ type: 'EDIT_TODO', payload: todo });
			dispatch({ type: state.activeFilter });
			console.log(todo);
			axios
				.put(`https://to-do-backendapi.herokuapp.com/todos/${todo.id}`, todo)
				.catch((err) => {
					dispatch({ type: 'SET_ERR', payload: err });
					console.error(err);
					refreshList();
				});
			dispatch({ type: 'CLEAR_ACTIVE_TODO' });
		} else {
			dispatch({ type: state.activeFilter });
			axios
				.post('https://to-do-backendapi.herokuapp.com/todos/', todo)
				.then((r) => refreshList())
				.catch((err) => {
					dispatch({ type: 'SET_ERR', payload: err });
					console.error(err);
					refreshList();
				});
		}
	};
	const handleDelete = async (id) => {
		dispatch({ type: 'DELETE_TODO', payload: id });
		axios
			.delete(`https://to-do-backendapi.herokuapp.com/todos/${id}`)
			.catch((err) => {
				dispatch({ type: 'SET_ERR', payload: err });
				console.error(err);
				refreshList();
			});
		dispatch({ type: state.activeFilter });
	};

	const handleEdit = (id) => {
		dispatch({ type: 'SET_ACTIVE_TODO', payload: id });
	};

	const handleChange = (id) => {
		const item = state.todos.filter((item) => item.id === id)[0];

		axios
			.put(`https://to-do-backendapi.herokuapp.com/todos/${item.id}`, item)
			.then((r) => {
				dispatch({
					type: 'CHANGE_COMPLETED',
					payload: { ...item, completed: !item.completed },
				});
			})
			.catch((err) => {
				dispatch({ type: 'SET_ERR', payload: err });
				console.error(err);
			});
		dispatch({ type: state.activeFilter });
	};

	useEffect(() => {
		refreshList();
	}, []);

	useEffect(() => {
		if (state.err !== '') {
			alert(state.err);
		}
	}, [state.err]);

	return (
		<Context.Provider
			value={{
				state,
				dispatch,
				handleDelete,
				handleSubmit,
				handleChange,
				handleEdit,
			}}>
			<div
				className={
					'subpixel-antialiased h-screen flex flex-col justify-center bg-gradient-to-br from-purple-600 to-pink-500 py-40'
				}>
				<ToDoList />
			</div>
		</Context.Provider>
	);
}

export default App;
