import React, { memo, useMemo } from 'react';
import TableRow from './TableRow';

const DataTable = memo(({ columns, rows, isDarkMode }) => {
  const emptyState = useMemo(() => (
    <div className="text-center text-sm text-gray-500">
      데이터가 없습니다.
    </div>
  ), []);

  const tableRows = useMemo(() => {
    if (!columns || columns.length === 0) return null;
    
    return rows.map((row, rowIndex) => (
      <TableRow
        key={rowIndex}
        columns={columns}
        row={row}
        rowIndex={rowIndex}
        isDarkMode={isDarkMode}
      />
    ));
  }, [rows, columns, isDarkMode]);

  if (!columns || columns.length === 0) {
    return emptyState;
  }

  return (
    <div className="space-y-4">
      {tableRows}
    </div>
  );
});

DataTable.displayName = 'DataTable';

export default DataTable;
