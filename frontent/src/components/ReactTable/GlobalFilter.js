import React from 'react';

/* This component is used to create a global filter for the table. It is used in the ReactTable.jsx file. */
export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <span>
            Search:{' '}
            <input
                value={filter || ''}
                onChange={(e) => setFilter(e.target.value)}
            />
        </span>
    );
}