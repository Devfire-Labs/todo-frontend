import React, { useContext } from 'react';
import { Context } from '../App';
import { Filter } from './Filter';

export const Filters = () => {
	const { state, dispatch } = useContext(Context);
	const filters = state.filters;
	return (
		<div className={'pl-4'}>
			{Object.keys(filters).map((filter) => (
				<Filter
					key={'filter-' + filters[filter].name}
					name={filters[filter].name}
					active={filters[filter].active ? true : false}
					handleClick={() => dispatch({ type: filters[filter].action })}
				/>
			))}
		</div>
	);
};
