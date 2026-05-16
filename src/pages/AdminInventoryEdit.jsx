import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';

const AdminInventoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Спочатку завантажуємо поточні дані, щоб вставити їх у форму
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await inventoryApi.getById(id);
        setInitialData(data);
      } catch (err) {
        alert('Не вдалося завантажити дані для редагування');
        navigate('/admin/inventory');
      } finally {
        setLoading(false);
      }
    };
    
    fetchItem();
  }, [id, navigate]);

  const handleUpdate = async ({ name, description, file }) => {
    try {
      setSaving(true);
      
      // 1. Оновлюємо текстові дані (формат JSON)
      await inventoryApi.updateText(id, {
        inventory_name: name,
        description: description
      });

      // 2. Якщо вибрали нове фото, відправляємо його окремо (формат FormData)
      if (file) {
        const formData = new FormData();
        formData.append('photo', file);
        await inventoryApi.updatePhoto(id, formData);
      }

      navigate('/admin/inventory'); // Повертаємось назад після успіху
    } catch (error) {
      alert('Помилка при оновленні інвентарю');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Завантаження форми...</div>;

  return (
    <div>
      <h2>Редагування інвентарю</h2>
      <InventoryForm 
        initialData={initialData} 
        onSubmit={handleUpdate} 
        isLoading={saving} 
      />
    </div>
  );
};

export default AdminInventoryEdit;