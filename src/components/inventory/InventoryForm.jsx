import { useState } from 'react';

const InventoryForm = ({ initialData, onSubmit, isLoading }) => {
  const [name, setName] = useState(initialData?.inventory_name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Назва інвентарю є обов'язковою!");
      return;
    }
    onSubmit({ name, description, file });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
      <div>
        <label>Назва інвентарю *</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ width: '100%' }}
        />
      </div>
      <div>
        <label>Опис</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>
      <div>
        <label>Фото</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Збереження...' : 'Зберегти'}
      </button>
    </form>
  );
};

export default InventoryForm;