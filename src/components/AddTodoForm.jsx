import React, { useState } from 'react';

export const AddTodoForm = ({ handleClose }) => {
	const [form, setForm] = useState({ title: '', desc: '', completed: false });
	const inputStyles =
		'z-50 px-2 py-1 border-b border-gray-400 w-full opacity-100 mb-4 focus:outline-none';
	return (
		<div className='w-4/5 bg-white opacity-100 px-6 py-4 rounded'>
			<label htmlFor='title'>
				<input
					type='text'
					name='title'
					id='title-input'
					value={form.title}
					placeholder='Title'
					onChange={(e) =>
						setForm((prevState) => ({ ...prevState, title: e.target.value }))
					}
					className={inputStyles + 'mt-4'}
				/>
			</label>

			<label htmlFor='title'>
				<textarea
					name='desc'
					id='desc-input'
					value={form.desc}
					placeholder='Description'
					onChange={(e) =>
						setForm((prevState) => ({ ...prevState, desc: e.target.value }))
					}
					className={inputStyles + ' resize-none h-32'}
				/>
			</label>
			<div className='flex justify-center items-center'>
				<button
					className='py-1 px-2 rounded font-bold text-sm flex items-center text-white focus:outline-none bg-green-400'
					onClick={() => {
						handleClose();
					}}>
					DONE &#10004;
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
