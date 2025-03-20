import axios from "axios";

const API_URL = "http://localhost:5000/api/inventory";

export const fetchInventory = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addInventoryItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const updateInventoryItem = async (id, updatedItem) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedItem);
  return response.data;
};

export const deleteInventoryItem = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
