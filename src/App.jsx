import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

// Нові сторінки
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Система Інвентарю</h1>
          <nav style={{ display: 'flex', gap: '15px' }}>
            <Link to="/gallery" className="nav-link">Галерея</Link>
            <Link to="/favorites" className="nav-link">Улюблені ❤️</Link>
            <Link to="/admin/inventory" className="nav-link">Адмінка</Link>
          </nav>
        </header>

        <main>
          <Routes>
            {/* Редирект за замовчуванням на галерею */}
            <Route path="/" element={<Navigate to="/gallery" />} />
            
            {/* Користувацька частина */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/favorites" element={<Favorites />} />

            {/* Адмін панель */}
            <Route path="/admin/inventory" element={<AdminInventory />} />
            <Route path="/admin/inventory/create" element={<AdminInventoryCreate />} />
            <Route path="/admin/inventory/edit/:id" element={<AdminInventoryEdit />} />
            <Route path="/admin/inventory/:id" element={<AdminInventoryDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;