import React from 'react';

function DogList({ dogs, onSelectDog, onDeleteDog, onAdoptDog }) {
  return (
    <div className="dog-list">
      <h2>Реестр животных</h2>
      <div className="dogs-grid">
        {dogs.map(dog => (
          <div key={dog.id} className={`dog-card ${dog.is_adopted ? 'adopted' : ''}`}>
            <div className="dog-image">
              {dog.image_url ? (
                <img src={dog.image_url} alt={dog.name} />
              ) : (
                <div className="placeholder-image">🐕</div>
              )}
            </div>
            <div className="dog-info">
              <h3>{dog.name}</h3>
              <p><strong>Порода:</strong> {dog.breed || 'Не указана'}</p>
              <p><strong>Возраст:</strong> {dog.age ? `${dog.age} лет` : 'Не указан'}</p>
              <p><strong>Пол:</strong> {dog.gender === 'male' ? 'Мальчик' : dog.gender === 'female' ? 'Девочка' : 'Не указан'}</p>
              <div className="status-badge">
                {dog.is_adopted ? '✅ Усыновлен' : '🏠 Ищет дом'}
              </div>
            </div>
            <div className="dog-actions">
              <button onClick={() => onSelectDog(dog)} className="btn-view">
                Просмотр
              </button>
              {!dog.is_adopted && (
                <button onClick={() => onAdoptDog(dog.id)} className="btn-adopt">
                  Усыновить
                </button>
              )}
              <button onClick={() => onDeleteDog(dog.id)} className="btn-delete">
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
      {dogs.length === 0 && (
        <div className="empty-state">
          <p>Нет животных в реестре</p>
        </div>
      )}
    </div>
  );
}

export default DogList;