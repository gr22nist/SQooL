export const getColumnConfig = (columnName, value, isDarkMode) => {
  const config = {
    style: `font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`,
    priority: 2,
    formatter: (v) => v?.toString() || '-'
  };

  if (columnName.toLowerCase().includes('id')) {
    config.priority = 3;
    config.style = `font-mono ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`;
  }

  if (value instanceof Date || columnName.toLowerCase().includes('date')) {
    config.formatter = (v) => {
      if (!v) return '-';
      const date = new Date(v);
      return date.toLocaleDateString();
    };
  }

  return config;
};
