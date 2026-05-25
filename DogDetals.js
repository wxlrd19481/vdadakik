import React, { useState } from 'react';
import DogForm from './DogForm';

function DogDetails({ dog, onClose, onUpdate, onAdopt }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <DogForm
        dog={dog}
        onSubmit={(data) => {
          onUpdate(dog.id, data);
          setIsEditing(false);
        }}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="modal">
      <div className="modal-content details-modal">
        <div className="modal-header">
          <h2>{dog.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="details-content">
          {dog.image_url && (
            <div className="details-image">
              <img src={dog.image_url} alt={dog.name} />
            </div>
          )}
          
          <div className="details-info">
            <p><strong>Порода:</strong> {dog.breed || 'Не указана'}</p>
            <p><strong>Возраст:</strong> {dog.age ? `${dog.age} лет` : 'Не указан'}</p>
            <p><strong>Пол:</strong> {dog.gender === 'male' ? 'Мальчик' : dog.gender === 'female' ? 'Девочка' : 'Не указан'}</p>
            <p><strong>Размер:</strong> {dog.size === 'small' ? 'Маленький' : dog.size === 'medium' ? 'Средний' : dog.size === 'large' ? 'Большой' : 'Не указан'}</p>
            <p><strong>Окрас:</strong> {dog.color || 'Не указан'}</p>
            <p><strong>Состояние здоровья:</strong> {dog.health_status || 'Не указано'}</p>
            <p><strong>Дата поступления:</strong> {new Date(dog.arrival_date).toLocaleDateString('ru-RU')}</p>
            {dog.is_adopted && dog.adopted_date && (
              <p><strong>Дата усыновления:</strong> {new Date(dog.adopted_date).toLocaleDateString('ru-RU')}</p>
            )}
            <p><strong>Статус:</strong> {dog.is_adopted ? 'Усыновлен' : 'Ищет дом'}</p>
            {dog.description && (
              <div className="description">
                <strong>Описание:</strong>
                <p>{dog.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="details-actions">
          <button onClick={() => setIsEditing(true)} className="btn-edit">
            Редактировать
          </button>
          {!dog.is_adopted && (
            <button onClick={() => onAdopt(dog.id)} className="btn-adopt">
              Отметить как усыновленного
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DogDetails;