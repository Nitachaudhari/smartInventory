import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Common function to handle requests with optional headers (for authentication)
const request = async (method, url, data = null, token = null) => {
  const headers = token ? { Authorization: token } : {};
  const response = await axios({ method, url: `${BASE_URL}${url}`, data, headers });
  return response.data;
};

// Authentication API
export const registerUser = async (userData) => request("POST", "/auth/register", userData);
export const loginUser = async (userData) => request("POST", "/auth/login", userData);

// Inventory API
export const fetchItems = async () => request("GET", "/items");
export const addItem = async (item) => request("POST", "/items", item);
export const updateItem = async (id, item) => request("PUT", `/items/${id}`, item);
export const deleteItem = async (id) => request("DELETE", `/items/${id}`);

// Alerts API
export const fetchLowStockItems = async () => request("GET", "/alerts/low-stock");
export const fetchExpiringItems = async () => request("GET", "/alerts/expiring");

// Reports API (Requires Authorization Token)
export const fetchStockReport = async (token) => request("GET", "/reports/stock", null, token);
export const fetchExpiryReport = async (token) => request("GET", "/reports/expiry", null, token);
