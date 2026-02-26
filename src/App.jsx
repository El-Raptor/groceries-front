import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BrandsPage from './pages/BrandsPage';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* Barra de Navegação Simples */}
        <nav className="bg-blue-600 p-4 text-white shadow-md">
          <div className="max-w-4xl mx-auto flex gap-6">
            <Link to="/" className="font-bold text-xl hover:text-blue-200">Groceries App</Link>
            <Link to="/brands" className="hover:text-blue-200 mt-1">Marcas</Link>
            <Link to="/categories" className="hover:text-blue-200 mt-1">Categorias</Link>
            <Link to="/products" className="hover:text-blue-200 mt-1">Produtos</Link>
          </div>
        </nav>

        {/* Onde as páginas vão aparecer */}
        <div className="p-4">
          <Routes>
            <Route path="/" element={<h1 className="text-center mt-10 text-xl text-gray-600">Bem-vindo ao Groceries! Escolha uma opção no menu.</h1>} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;