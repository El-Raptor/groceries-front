import { useEffect, useState } from 'react';
import { getCategories, createCategory, createSubcategory } from '../services/CategoryService';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  
  // Estados para nova Categoria
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // Estados para nova Subcategoria
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      await createCategory({ name: newCategoryName });
      setNewCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  const handleCreateSubcategory = async (e) => {
    e.preventDefault();
    if (!newSubcategoryName.trim() || !selectedCategoryId) return;
    try {
      await createSubcategory({ 
        name: newSubcategoryName, 
        categoryId: parseInt(selectedCategoryId) 
      });
      setNewSubcategoryName('');
      setSelectedCategoryId('');
      // Para ver a subcategoria recém-criada, idealmente nosso GET de categorias 
      // deveria trazer as subcategorias aninhadas, ou faremos um GET separado depois!
      alert("Subcategoria criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar subcategoria:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Coluna 1: Categorias */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Nova Categoria</h2>
        <form onSubmit={handleCreateCategory} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Ex: Laticínios"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Salvar
          </button>
        </form>

        <h3 className="font-semibold text-gray-700 mb-2">Categorias Cadastradas</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id} className="bg-gray-50 p-3 rounded border flex justify-between">
              <span>{cat.name}</span>
              <span className="text-gray-400 text-sm">ID: {cat.id}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Coluna 2: Subcategorias */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Nova Subcategoria</h2>
        <form onSubmit={handleCreateSubcategory} className="flex flex-col gap-3">
          
          <select 
            value={selectedCategoryId} 
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 bg-white"
          >
            <option value="">Selecione a Categoria Pai...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <input
            type="text"
            value={newSubcategoryName}
            onChange={(e) => setNewSubcategoryName(e.target.value)}
            placeholder="Ex: Iogurtes"
            className="border border-gray-300 rounded px-3 py-2"
          />
          
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Salvar Subcategoria
          </button>
        </form>
      </div>

    </div>
  );
}