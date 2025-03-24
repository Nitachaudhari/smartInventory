export const fetchReportData = async (type) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Use environment variable
  const response = await fetch(`${BASE_URL}/reports/${type}`);
  return response.json();
};
