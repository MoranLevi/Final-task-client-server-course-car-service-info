import { GlobalFilter } from 'components/ReactTable/GlobalFilter';
import React, { useEffect } from 'react';
import { useGlobalFilter, useSortBy, useTable, usePagination } from 'react-table';
import './ReactTable.css';

/* ReactTable Component */
const ReactTable = ({
    columns,
    data = [],
    placeholder = <></>,
    onTableRowClick = () => {},
    onTableDoubleClick = () => {},
    getTableRowCSS = () => '',
    filterString = ''
}) => {

    // Hooks
    const { getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            nextPage,
            previousPage,
            canNextPage,
            canPreviousPage, 
            pageOptions,
            prepareRow,
            state, 
            setGlobalFilter } =
        useTable({ columns, data, initialState: { pageSize: 5 } }, useGlobalFilter, useSortBy, usePagination);

    const { globalFilter } = state;
    const { pageIndex } = state;
    
    // Listen for input changes outside
    useEffect(() => {
        setGlobalFilter(filterString);
    }, [filterString, data]);

    return (
        <div className="table-container">
        {data.length === 0 ? (
            placeholder
        ) : (
            <div className='table-filter-container'>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span> {column.isSorted ? (column.isSortedDesc ? '🔼' : '🔽') : ''}</span>{' '}
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                    prepareRow(row);
                    return (
                        <tr
                        {...row.getRowProps()}
                        className={getTableRowCSS(row)}
                        onClick={() => onTableRowClick(row)}
                        onDoubleClick={() => onTableDoubleClick(row)}
                        >
                        {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                        })}
                        </tr>
                    );
                    })}
                </tbody>
                </table>
                <div className='paging-data-container'>
                    <div className='total-number-of-records'>
                        Showing {pageIndex * 5 + 1} to {pageIndex * 5 + page.length} of {data.length}{' '} records
                    </div>
                    <div className='paging-data-buttons'>
                        <span>
                            page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            Previous
                        </button>
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
};

export default ReactTable;
