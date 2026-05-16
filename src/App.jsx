import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Система складу - Адмін Панель</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/admin/inventory" />} />
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