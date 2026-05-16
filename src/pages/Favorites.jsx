import { useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import { useFavorites } from '../hooks/useFavorites';

const Favorites = () => {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await inventoryApi.getAll();
        setAllItems(data);
      } catch (err) {
        console.error('Помилка завантаження', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Фільтруємо масив: залишаємо тільки ті об'єкти, чий id є в списку favorites
  const favoriteItems = allItems.filter(item => favorites.includes(item.id));

  if (loading) return <div className="state-message loading">Шукаємо ваші улюблені товари...</div>;

  return (
    <div className="gallery-page">
      <h2 style={{ marginBottom: '20px' }}>Улюблені позиції ❤️</h2>
      
      {favoriteItems.length === 0 ? (
        <div className="state-message empty">У вас поки немає улюблених предметів.</div>
      ) : (
        <div className="inventory-grid">
          {favoriteItems.map(item => (
            <InventoryCard
              key={item.id}
              item={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
              onClick={setSelectedItem}
            />
          ))}
        </div>
      )}

      {selectedItem && (
        <InventoryQuickView
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Favorites;