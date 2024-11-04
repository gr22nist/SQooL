import React, { memo } from 'react';
import { getColumnConfig } from './utils';

const TableRow = memo(({ columns, row, rowIndex, isDarkMode }) => {
  const mainColumn = columns.find(col => 
    col.toLowerCase().includes('name') || 
    col.toLowerCase().includes('title')
  ) || columns[0];
  const mainValue = row[columns.indexOf(mainColumn)];

  return (
    <div className={`
      overflow-hidden rounded-lg
      ${isDarkMode 
        ? 'bg-slate-800 hover:bg-slate-700' 
        : 'bg-white hover:bg-slate-50'
      }
      border ${isDarkMode ? 'border-slate-600' : 'border-slate-200'}
      shadow-sm hover:shadow-md transition-all duration-200
    `}>
      <div className={`
        px-4 py-3 border-b
        ${isDarkMode 
          ? 'border-slate-600 bg-slate-700' 
          : 'border-slate-200 bg-slate-50'
        }
      `}>
        <h3 className={`
          font-bold text-lg
          ${isDarkMode ? 'text-gray-50' : 'text-gray-900'}
        `}>
          {mainValue || `Record #${rowIndex + 1}`}
        </h3>
      </div>
      <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-3">
        {columns.map((column, colIndex) => {
          if (column === mainColumn) return null;
          const value = row[colIndex];
          const config = getColumnConfig(column, value, isDarkMode);

          return (
            <div key={colIndex} className={`
              ${config.priority > 2 ? 'col-span-1' : 'col-span-2'}
            `}>
              <div className={`
                text-xs font-bold mb-1
                ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
              `}>
                {column.replace(/_/g, ' ').toUpperCase()}
              </div>
              <div className={`text-sm ${config.style}`}>
                {config.formatter(value)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.isDarkMode === nextProps.isDarkMode &&
    prevProps.rowIndex === nextProps.rowIndex &&
    JSON.stringify(prevProps.row) === JSON.stringify(nextProps.row) &&
    JSON.stringify(prevProps.columns) === JSON.stringify(nextProps.columns)
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
