import React, { useState } from 'react';
import "./table.scss";
import { useTheme } from '../../../context/Theme/ThemeContext';
import Icon from '../Icon';

interface Column {
    accessKey: string;
    value: string;
}

interface TableDataProps {
    columns: Column[];
    data: Record<string, any>[];
}

const Headers: React.FC<{ columns: Column[], onSort: (accessKey: string) => void, sortBy: string, sortOrder: 'asc' | 'desc' }> = ({ columns, onSort, sortBy, sortOrder }) => {
    const { theme } = useTheme();

    const handleSortClick = (accessKey: string) => {
        onSort(accessKey);
    };

    return (
        <thead className='table-header'>
            <tr className=''>
                {columns.map((column, index) => (
                    <th className='table-cell' key={index}>
                        <div className="" onClick={() => handleSortClick(column.accessKey)}>
                            {column.value}
                            {sortBy === column.accessKey && (
                                sortOrder === 'asc' ? (
                                    <Icon
                                        icon={(
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 ml-1 inline-block">
                                                <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        onclick={() => handleSortClick(column.accessKey)}
                                        style={{ cursor: 'pointer' , color:theme === "dark" ? "white" : "black" ,  width:"15px" , background:"none" , border:"none" , marginLeft: "10px"  }}
                                    />
                                ) : (
                                    <Icon
                                        icon={(
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 ml-1 inline-block">
                                                <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
                                            </svg> 
                                        )}
                                        onclick={() => handleSortClick(column.accessKey)}
                                        style={{ cursor: 'pointer' , color:theme === "dark" ? "white" : "black" ,  width:"15px" , background:"none" , border:"none", marginLeft: "10px"  }}
                                    />
                                )
                            )}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

const SortingData: React.FC<{ data: Record<string, any>[], sortBy: string, sortOrder: 'asc' | 'desc' }> = ({ data, sortBy, sortOrder }) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (sortOrder === 'asc') {
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        } else {
            if (aValue > bValue) return -1;
            if (aValue < bValue) return 1;
            return 0;
        }
    });

    return (
        <tbody>
            {sortedData.length > 0 ? sortedData.map((row, rowIndex) => (
                <tr className='table-tr' key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                        <td className='table-cell table-td' key={colIndex}>{value}</td>
                    ))}
                </tr>
            )): <tr className='not-data'>Data Not Found!</tr>}
        </tbody>
    );
}

const Table: React.FC<TableDataProps> = ({ columns, data }) => {
    const { colors } = useTheme();
    const [sortBy, setSortBy] = useState<string>(''); 
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSort = (accessKey: string) => {
        if (sortBy === accessKey) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(accessKey);
            setSortOrder('asc');
        }
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (colors) {
        document.documentElement.style.setProperty('--bg-color', colors.primary[400]);
        document.documentElement.style.setProperty('--text-color', colors.grey[100]);
        document.documentElement.style.setProperty('--border-b-color', colors.redAccent[400]);
    }

    return (
        <div style={{overflowX:"auto"}}>
            <div style={{marginBottom:"4px" , marginTop:"10px"}}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="table-search border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
            </div>
            <table className='table'>
                <Headers columns={columns} onSort={handleSort} sortBy={sortBy} sortOrder={sortOrder} />
                <SortingData data={filteredData} sortBy={sortBy} sortOrder={sortOrder} />
            </table>
        </div>
    );
}

export default Table;
