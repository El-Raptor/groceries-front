import { api } from './api';

// --- CATEGORIAS ---
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post('/categories', categoryData);
  return response.data;
};

// --- SUBCATEGORIAS ---
export const createSubcategory = async (subcategoryData) => {
  // subcategoryData precisa ter o formato: { name: "Iogurtes", categoryId: 1 }
  const response = await api.post('/subcategories', subcategoryData);
  return response.data;
};