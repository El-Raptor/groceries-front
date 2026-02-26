import { useEffect, useState } from 'react';
import { getProducts, createProduct } from '../services/productService';
import { getBrands } from '../services/brandService';
import { getSubcategories } from '../services/categoryService';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Estados do Formulário
  const [name, setName] = useState('');
  const [brandId, setBrandId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, brandsData, subcatsData] = await Promise.all([
        getProducts(),
        getBrands(),
        getSubcategories()
      ]);
      setProducts(productsData);
      setBrands(brandsData);
      setSubcategories(subcatsData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !brandId || !subcategoryId) return;

    try {
      await createProduct({ 
        name, 
        brandId: parseInt(brandId), 
        subcategoryId: parseInt(subcategoryId) 
      });
      setName('');
      setBrandId('');
      setSubcategoryId('');
      loadData(); // Recarrega a lista
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gerenciar Produtos</h1>

      <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-gray-50 p-4 rounded border">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do Produto"
          className="border border-gray-300 rounded px-3 py-2 md:col-span-2"
        />
        
        <select value={brandId} onChange={(e) => setBrandId(e.target.value)} className="border border-gray-300 rounded px-3 py-2 bg-white">
          <option value="">Marca...</option>
          {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>

        <select value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)} className="border border-gray-300 rounded px-3 py-2 bg-white">
          <option value="">Subcategoria...</option>
          {subcategories.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-4 mt-2">
          Cadastrar Produto
        </button>
      </form>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Lista de Produtos</h2>
        <ul className="space-y-2">
          {products.map((prod) => (
            <li key={prod.id} className="bg-white p-4 rounded border flex justify-between items-center shadow-sm">
              <div>
                <span className="font-bold text-gray-800 block">{prod.name}</span>
                <span className="text-sm text-gray-500">
                  {prod.brand.name} • {prod.subcategory.name} ({prod.subcategory.category.name})
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}