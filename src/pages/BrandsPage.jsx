import { useEffect, useState } from 'react';
import { getBrands, createBrand } from '../services/BrandService';

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [newBrandName, setNewBrandName] = useState('');

  // Busca as marcas assim que a tela abre
  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const data = await getBrands();
      setBrands(data);
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault(); // Evita que a página recarregue
    if (!newBrandName.trim()) return;

    try {
      await createBrand({ name: newBrandName });
      setNewBrandName(''); // Limpa o input
      fetchBrands(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao criar marca:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gerenciar Marcas</h1>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleCreate} className="flex gap-4 mb-8">
        <input
          type="text"
          value={newBrandName}
          onChange={(e) => setNewBrandName(e.target.value)}
          placeholder="Nome da nova marca (ex: Nestlé)"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Salvar
        </button>
      </form>

      {/* Lista de Marcas */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Marcas Cadastradas</h2>
        {brands.length === 0 ? (
          <p className="text-gray-500">Nenhuma marca cadastrada ainda.</p>
        ) : (
          <ul className="space-y-3">
            {brands.map((brand) => (
              <li key={brand.id} className="bg-gray-50 p-4 rounded border border-gray-100 flex justify-between items-center">
                <span className="font-medium text-gray-800">{brand.name}</span>
                <span className="text-sm text-gray-400">ID: {brand.id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}