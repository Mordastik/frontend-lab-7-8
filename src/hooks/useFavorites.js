import { useState, useEffect } from 'react';

export const useFavorites = () => {
  // Ініціалізуємо стан даними з localStorage, або порожнім масивом
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('inventory_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Щоразу, коли favorites змінюється, оновлюємо localStorage
  useEffect(() => {
    localStorage.setItem('inventory_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => 
      prev.includes(id) 
        ? prev.filter((favId) => favId !== id) // Видаляємо, якщо вже є
        : [...prev, id] // Додаємо, якщо немає
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
};