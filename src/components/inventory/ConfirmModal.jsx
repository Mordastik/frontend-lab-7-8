const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', 
      justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
        <h3>Ви впевнені, що хочете видалити цю позицію?</h3>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button className="danger" onClick={onConfirm}>Видалити</button>
          <button onClick={onCancel}>Скасувати</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;