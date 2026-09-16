const useGenerateCSV = () => {
  const generateCSV = (
    data,
    headers,
    filename = 'export.csv'
  ) => {
    const escapeCSV = (value) => {
      const stringValue = String(value ?? '');

      if (
        stringValue.includes(',') ||
        stringValue.includes('"') ||
        stringValue.includes('\n')
      ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }

      return stringValue;
    };

    const csvContent = [
      headers.map(escapeCSV).join(','),
      ...data.map((row) =>
        row.map(escapeCSV).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', filename);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return generateCSV;
};

export default useGenerateCSV;