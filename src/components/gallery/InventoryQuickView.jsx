const InventoryQuickView = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Зупиняємо клік, щоб модалка не закривалась при кліку на саму картку модалки */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✖</button>
        
        <div className="modal-body">
          <div className="modal-image-wrapper">
            {item.photo_url ? (
              <img src={item.photo_url} alt={item.inventory_name} />
            ) : (
              <div className="modal-placeholder">Немає зображення</div>
            )}
          </div>
          
          <div className="modal-info">
            <h2>{item.inventory_name}</h2>
            <p className="modal-desc">
              {item.description ? item.description : 'Опис відсутній.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryQuickView;