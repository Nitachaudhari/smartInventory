import axios from "axios";

const API_URL = "http://localhost:5000/api/inventory";

export const getInventory = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addInventoryItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};
