import axios from 'axios';

// Заміни на свій URL бекенду
const API_URL = 'http://localhost:5000'; 

export const inventoryApi = {
  // Отримати весь інвентар
  getAll: async () => {
    const response = await axios.get(`${API_URL}/inventory`);
    return response.data;
  },

  // Отримати один елемент
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/inventory/${id}`);
    return response.data;
  },

  // Створити новий (FormData)
  create: async (formData) => {
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Оновити текстові дані
  updateText: async (id, data) => {
    const response = await axios.put(`${API_URL}/inventory/${id}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  },

  // Оновити тільки фото (FormData)
  updatePhoto: async (id, formData) => {
    const response = await axios.put(`${API_URL}/inventory/${id}/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Видалити
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/inventory/${id}`);
    return response.data;
  }
};