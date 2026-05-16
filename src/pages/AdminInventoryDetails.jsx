import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

const AdminInventoryDetails = () => {
  const { id } = useParams(); // Отримуємо ID з URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await inventoryApi.getById(id);
        setItem(data);
      } catch (err) {
        setError('Помилка завантаження деталей інвентарю');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetails();
  }, [id]);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;
  if (!item) return <div>Інвентар не знайдено</div>;

  return (
    <div>
      <h2>Деталі інвентарю: {item.inventory_name}</h2>
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        {item.photo_url ? (
          <img 
            src={item.photo_url} 
            alt={item.inventory_name} 
            style={{ maxWidth: '300px', borderRadius: '8px' }} 
          />
        ) : (
          <div style={{ width: '300px', height: '300px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Немає фото
          </div>
        )}
        
        <div>
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Назва:</strong> {item.inventory_name}</p>
          <p><strong>Опис:</strong> {item.description || 'Опис відсутній'}</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to="/admin/inventory">
          <button>Назад до списку</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminInventoryDetails;