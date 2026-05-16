import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryTable from '../components/inventory/InventoryTable';

const AdminInventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const data = await inventoryApi.getAll();
      setItems(data);
    } catch (err) {
      setError('Помилка завантаження інвентарю');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await inventoryApi.delete(id);
      fetchInventory(); // Оновлюємо список після видалення
    } catch (err) {
      alert('Помилка видалення');
    }
  };

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
        <h2>Список Інвентарю</h2>
        <Link to="/admin/inventory/create">
          <button>+ Додати позицію</button>
        </Link>
      </div>
      
      {items.length === 0 ? (
        <div>Інвентар порожній</div>
      ) : (
        <InventoryTable items={items} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default AdminInventory;