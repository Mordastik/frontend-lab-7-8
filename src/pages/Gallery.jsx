import { useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import { useFavorites } from '../hooks/useFavorites';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Для модалки Quick View
  
  // Дістаємо наш кастомний хук
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await inventoryApi.getAll();
        setItems(data);
      } catch (err) {
        setError('Не вдалося завантажити галерею');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Стани завантаження та помилки
  if (loading) return <div className="state-message loading">Завантаження галереї...</div>;
  if (error) return <div className="state-message error">{error}</div>;
  if (items.length === 0) return <div className="state-message empty">Галерея порожня. Додайте інвентар через адмінку.</div>;

  return (
    <div className="gallery-page">
      <h2 style={{ marginBottom: '20px' }}>Галерея інвентарю</h2>
      
      {/* Адаптивний Grid */}
      <div className="inventory-grid">
        {items.map(item => (
          <InventoryCard
            key={item.id}
            item={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggleFavorite}
            onClick={setSelectedItem} // Відкриваємо модалку по кліку
          />
        ))}
      </div>

      {/* Модалка розширеного перегляду (з'являється тільки якщо вибрано елемент) */}
      {selectedItem && (
        <InventoryQuickView
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Gallery;