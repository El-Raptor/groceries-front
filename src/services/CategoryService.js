import { api } from './api';

// --- CATEGORIES ---
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post('/categories', categoryData);
  return response.data;
};

// --- SUBCATEGORIES ---
export const createSubcategory = async (subcategoryData) => {
  const response = await api.post('/subcategories', subcategoryData);
  return response.data;
};

export const getSubcategories = async () => {
  const response = await api.get('/subcategories');
  return response.data;
};