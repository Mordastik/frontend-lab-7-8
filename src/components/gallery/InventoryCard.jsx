const InventoryCard = ({ item, onClick, isFavorite, onToggleFavorite }) => {
  return (
    <div className="inventory-card" onClick={() => onClick(item)}>
      <div className="card-image-container">
        {item.photo_url ? (
          <img src={item.photo_url} alt={item.inventory_name} className="card-image" />
        ) : (
          <div className="card-placeholder">Немає фото</div>
        )}
        
        {/* Кнопка "Улюблене". e.stopPropagation() потрібен, щоб при кліку на серце не відкривалася модалка */}
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{item.inventory_name}</h3>
      </div>
    </div>
  );
};

export default InventoryCard;