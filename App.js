import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DogList from './components/DogList';
import DogForm from './components/DogForm';
import DogDetails from './components/DogDetails';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDogs();
  }, [filter]);

  const fetchDogs = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/dogs`;
      if (filter !== 'all') {
        url += `?adopted=${filter === 'adopted'}`;
      }
      const response = await axios.get(url);
      setDogs(response.data);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addDog = async (dogData) => {
    try {
      const response = await axios.post(`${API_URL}/dogs`, dogData);
      setDogs([response.data, ...dogs]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding dog:', error);
    }
  };

  const updateDog = async (id, dogData) => {
    try {
      const response = await axios.put(`${API_URL}/dogs/${id}`, dogData);
      setDogs(dogs.map(dog => dog.id === id ? response.data : dog));
      setSelectedDog(null);
    } catch (error) {
      console.error('Error updating dog:', error);
    }
  };

  const deleteDog = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту запись?')) {
      try {
        await axios.delete(`${API_URL}/dogs/${id}`);
        setDogs(dogs.filter(dog => dog.id !== id));
        if (selectedDog?.id === id) setSelectedDog(null);
      } catch (error) {
        console.error('Error deleting dog:', error);
      }
    }
  };

  const adoptDog = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/dogs/${id}/adopt`);
      setDogs(dogs.map(dog => dog.id === id ? response.data : dog));
      if (selectedDog?.id === id) setSelectedDog(response.data);
    } catch (error) {
      console.error('Error adopting dog:', error);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🐕 Собачий Приют "Доброе Сердце"</h1>
        <p>Электронный реестр животных</p>
      </header>

      <div className="container">
        <div className="sidebar">
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            + Добавить собаку
          </button>

          <div className="filter-section">
            <h3>Фильтр</h3>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Все собаки</option>
              <option value="false">Доступны для усыновления</option>
              <option value="adopted">Усыновленные</option>
            </select>
          </div>

          <div className="stats">
            <h3>Статистика</h3>
            <p>Всего: {dogs.length}</p>
            <p>Доступны: {dogs.filter(d => !d.is_adopted).length}</p>
            <p>Усыновлены: {dogs.filter(d => d.is_adopted).length}</p>
          </div>
        </div>

        <div className="main-content">
          {loading ? (
            <div className="loading">Загрузка...</div>
          ) : (
            <DogList
              dogs={dogs}
              onSelectDog={setSelectedDog}
              onDeleteDog={deleteDog}
              onAdoptDog={adoptDog}
            />
          )}
        </div>

        {selectedDog && (
          <DogDetails
            dog={selectedDog}
            onClose={() => setSelectedDog(null)}
            onUpdate={updateDog}
            onAdopt={adoptDog}
          />
        )}

        {showForm && (
          <DogForm
            onSubmit={addDog}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;