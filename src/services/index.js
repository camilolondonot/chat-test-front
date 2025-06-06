import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRequest = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('❌ Error en GET:', error);
    throw error;
  }
};

export const postRequest = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('❌ Error en POST:', error);
    throw error;
  }
};

export const deleteRequest = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('❌ Error en DELETE:', error);
    throw error;
  }
};

export const resetChatMessages = () => deleteRequest('/messages');

export const getMessages = () => getRequest('/messages');

export const sendMessage = (content) => postRequest('/messages', { content });
