import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';

const AdminInventoryCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async ({ name, description, file }) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('inventory_name', name);
      formData.append('description', description);
      if (file) {
        formData.append('photo', file);
      }

      await inventoryApi.create(formData);
      navigate('/admin/inventory'); // Повертаємось до списку
    } catch (error) {
      alert('Помилка при створенні інвентарю');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Додати новий інвентар</h2>
      <InventoryForm onSubmit={handleCreate} isLoading={loading} />
    </div>
  );
};

export default AdminInventoryCreate;