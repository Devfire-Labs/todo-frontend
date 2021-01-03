import React, { useState } from 'react';

export const AddTodo = ({ handleSubmit }) => {
	const [input, setInput] = useState('');

	const handleKeyUp = (e) => {
		if (e.keyCode === 13) {
			console.log('Submitting');
			handleSubmit({
				id: '',
				title: input,
				completed: false,
			});
			setInput('');
		}
	};
	return (
		<div className='px-4 md:px-0 md:mr-4'>
			<input
				type='text'
				onKeyUp={handleKeyUp}
				onChange={(e) => setInput(e.target.value)}
				value={input}
				placeholder='Add task'
				className='py-3 px-5 mx-auto md:ml-0 mt-3 md:mt-0 md:m-0 w-full md:w-auto rounded text-md text-black placeholder-gray-400 focus:outline-none bg-gray-200'
			/>
		</div>
	);
};
