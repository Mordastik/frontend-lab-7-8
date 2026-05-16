import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

const InventoryTable = ({ items, onDelete }) => {
  const [deleteId, setDeleteId] = useState(null);

  return (
    <>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Назва (inventory_name)</th>
            <th>Опис</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                {item.photo_url && <img src={item.photo_url} alt={item.inventory_name} width="50" />}
              </td>
              <td>{item.inventory_name}</td>
              <td>{item.description}</td>
              <td>
                <Link to={`/admin/inventory/${item.id}`}><button>Переглянути</button></Link>
                <Link to={`/admin/inventory/edit/${item.id}`}><button>Редагувати</button></Link>
                <button onClick={() => setDeleteId(item.id)}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteId && (
        <ConfirmModal 
          onConfirm={() => {
            onDelete(deleteId);
            setDeleteId(null);
          }} 
          onCancel={() => setDeleteId(null)} 
        />
      )}
    </>
  );
};

export default InventoryTable;