export const fetchReportData = async (type) => {
    const response = await fetch(`http://localhost:5000/api/reports/${type}`);
    return response.json();
  };
  