import React from 'react';

export const AddTodo = ({ handleClick }) => {
	return (
		<button
			onClick={handleClick}
			className='py-2 px-4 rounded font-bold text-md flex items-center text-white focus:outline-none bg-green-400'>
			ADD{' '}
			<svg
				className={'w-4 ml-3'}
				style={{
					filter:
						'invert(100%) sepia(0%) saturate(1%) hue-rotate(231deg) brightness(103%) contrast(101%)',
				}}
				viewBox='0 0 469.33333 469.33333'
				xmlns='http://www.w3.org/2000/svg'>
				<path d='m437.332031 192h-160v-160c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32 32v160h-160c-17.664062 0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h160v160c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937 32-32v-160h160c17.664063 0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0' />
			</svg>
		</button>
	);
};
