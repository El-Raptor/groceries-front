import { useEffect, useState } from 'react';
import { getStores, createStore } from '../services/StoreService';

export default function StoresPage() {
  const [stores, setStores] = useState([]);
  const [newStoreName, setNewStoreName] = useState('');

  // Busca os supermercados assim que o ecrã carrega
  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const data = await getStores();
      setStores(data);
    } catch (error) {
      console.error("Erro ao buscar supermercados:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newStoreName.trim()) return;

    try {
      await createStore({ name: newStoreName });
      setNewStoreName(''); // Limpa o campo de texto
      fetchStores(); // Atualiza a lista automaticamente
    } catch (error) {
      console.error("Erro ao criar supermercado:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gerir Supermercados</h1>

      {/* Formulário de Registo */}
      <form onSubmit={handleCreate} className="flex gap-4 mb-8">
        <input
          type="text"
          value={newStoreName}
          onChange={(e) => setNewStoreName(e.target.value)}
          placeholder="Nome do supermercado (ex: Continente, Auchan)"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </form>

      {/* Lista de Supermercados */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Supermercados Registados</h2>
        {stores.length === 0 ? (
          <p className="text-gray-500">Nenhum supermercado registado ainda.</p>
        ) : (
          <ul className="space-y-3">
            {stores.map((store) => (
              <li key={store.id} className="bg-gray-50 p-4 rounded border border-gray-100 flex justify-between items-center">
                <span className="font-medium text-gray-800">{store.name}</span>
                <span className="text-sm text-gray-400">ID: {store.id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}