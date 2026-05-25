import React, { useState } from 'react';

function DogForm({ onSubmit, onClose, dog }) {
  const [formData, setFormData] = useState({
    name: dog?.name || '',
    breed: dog?.breed || '',
    age: dog?.age || '',
    gender: dog?.gender || '',
    size: dog?.size || '',
    color: dog?.color || '',
    health_status: dog?.health_status || '',
    description: dog?.description || '',
    image_url: dog?.image_url || '',
    arrival_date: dog?.arrival_date || new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{dog ? 'Редактировать' : 'Добавить'} собаку</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Порода</label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Возраст (лет)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Пол</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Выберите</option>
                <option value="male">Мальчик</option>
                <option value="female">Девочка</option>
              </select>
            </div>
            <div className="form-group">
              <label>Размер</label>
              <select name="size" value={formData.size} onChange={handleChange}>
                <option value="">Выберите</option>
                <option value="small">Маленький</option>
                <option value="medium">Средний</option>
                <option value="large">Большой</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Окрас</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Состояние здоровья</label>
              <input
                type="text"
                name="health_status"
                value={formData.health_status}
                onChange={handleChange}
                placeholder="Здоров, привит и т.д."
              />
            </div>
          </div>

          <div className="form-group">
            <label>Фото (URL)</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/dog-photo.jpg"
            />
          </div>

          <div className="form-group">
            <label>Описание</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Особенности характера, история и т.д."
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Отмена
            </button>
            <button type="submit" className="btn-submit">
              {dog ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DogForm;