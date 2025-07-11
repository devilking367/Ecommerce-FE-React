import axios from 'axios';
import { API_CONFIG } from '../config/api';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 5000,
});

export const fetchUsers = async () => {
  const response = await api.get(API_CONFIG.ENDPOINTS.USERS);
  return response.data;
};
