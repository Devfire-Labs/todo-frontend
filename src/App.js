import axios from 'axios';
import React, { createContext, useReducer, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToDoDetails } from './components/ToDoDetails';
import { ToDoList } from './components/ToDoList';

const initialState = {
	loading: true,
	showCompleted: true,
	todos: [],
	showingTodos: [],
	activeTodo: { title: '', description: '', completed: false, id: '' },
	err: '',
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

		case 'SHOW_COMPLETED_SWITCH':
			return state.showCompleted
				? {
						...state,
						showCompleted: !state.showCompleted,
				  }
				: {
						...state,
						showCompleted: !state.showCompleted,
				  };

		case 'REFRESH_SHOW':
			return state.showCompleted
				? {
						...state,
						showingTodos: state.todos,
				  }
				: {
						...state,
						showingTodos: state.todos.filter((todo) => !todo.completed),
				  };

		case 'CHANGE_COMPLETED':
			const index = state.todos.indexOf(
				state.todos.filter((item) => item.id === payload.id)[0]
			);
			const newTodos = [...state.todos];
			newTodos[index] = payload;

			return {
				...state,
				todos: newTodos,
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

		case 'CLEAR_ERR':
			return { ...state, err: '' };

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
				dispatch({ type: 'REFRESH_SHOW' });
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
			dispatch({ type: 'REFRESH_SHOW' });
			console.log('Editing todo: ' + todo);
			axios
				.put(`https://to-do-backendapi.herokuapp.com/todos/${todo.id}/`, todo)
				.then((r) => dispatch({ type: 'CLEAR_ERR' }))
				.catch((err) => {
					dispatch({ type: 'SET_ERR', payload: err });
					console.error(err);
					refreshList();
				});
		} else {
			dispatch({ type: 'REFRESH_SHOW' });

			console.log('New todo: ' + JSON.stringify(todo));
			axios
				.post('https://to-do-backendapi.herokuapp.com/todos/', todo)
				.then((r) => {
					refreshList();
					dispatch({ type: 'CLEAR_ERR' });
				})
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
			.delete(`https://to-do-backendapi.herokuapp.com/todos/${id}/`)
			.then((r) => dispatch({ type: 'CLEAR_ERR' }))
			.catch((err) => {
				dispatch({ type: 'SET_ERR', payload: err });
				console.error(err);
				refreshList();
			});
		dispatch({ type: 'REFRESH_SHOW' });
	};

	const handleEdit = (id) => {
		dispatch({ type: 'SET_ACTIVE_TODO', payload: id });
	};

	const handleChange = (id) => {
		const item = state.todos.filter((item) => item.id === id)[0];
		console.log('Changing completed on: ' + JSON.stringify(item));
		axios
			.put(`https://to-do-backendapi.herokuapp.com/todos/${item.id}/`, {
				...item,
				completed: !item.completed,
			})
			.then((r) => {
				dispatch({
					type: 'CHANGE_COMPLETED',
					payload: { ...item, completed: !item.completed },
				});
				dispatch({ type: 'CLEAR_ERR' });
				dispatch({ type: 'REFRESH_SHOW' });
			})
			.catch((err) => {
				dispatch({ type: 'SET_ERR', payload: err });
				console.error(err);
			});
		dispatch({ type: 'REFRESH_SHOW' });
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
				refreshList,
			}}>
			<div
				className={
					'subpixel-antialiased h-screen md:flex md:flex-col md:justify-center md:py-40 bg-gradient-to-br from-purple-600 to-pink-500 '
				}>
				<BrowserRouter>
					<Switch>
						<Route exact path='/' component={ToDoList} />
						<Route path='/t/:todoId' component={ToDoDetails} />
					</Switch>
				</BrowserRouter>
			</div>
		</Context.Provider>
	);
}

export default App;
