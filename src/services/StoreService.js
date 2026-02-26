import { api } from './api';

export const getStores = async () => {
  const response = await api.get('/stores');
  return response.data;
};

export const createStore = async (storeData) => {
  const response = await api.post('/stores', storeData);
  return response.data;
};