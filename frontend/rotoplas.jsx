import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Rotoplas = () => {
  const [rotoplas, setRotoplas] = useState([]);
  const [formData, setFormData] = useState({
    numeroRotoplas: '',
    capacidad: '',
    nivel: '',
    localidad: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/rotoplas')
      .then(response => {
        setRotoplas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener rotoplas:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/rotoplas', formData)
      .then(response => {
        setRotoplas([...rotoplas, response.data]);
        setFormData({
          numeroRotoplas: '',
          capacidad: '',
          nivel: '',
          localidad: ''
        });
      })
      .catch(error => {
        console.error('Error al crear rotoplas:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/rotoplas/${id}`)
      .then(response => {
        setRotoplas(rotoplas.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar rotoplas:', error);
      });
  };

  return (
    <div>
      <h1>Lista de Rotoplas</h1>
      <ul>
        {rotoplas.map(item => (
          <li key={item.id}>
            {item.numeroRotoplas} - {item.capacidad} - {item.nivel} - {item.localidad}
            <button onClick={() => handleDelete(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h2>Crear Rotoplas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="numeroRotoplas"
          value={formData.numeroRotoplas}
          onChange={handleInputChange}
          placeholder="Número Rotoplas"
          required
        />
        <input
          type="text"
          name="capacidad"
          value={formData.capacidad}
          onChange={handleInputChange}
          placeholder="Capacidad"
          required
        />
        <input
          type="text"
          name="nivel"
          value={formData.nivel}
          onChange={handleInputChange}
          placeholder="Nivel"
          required
        />
        <input
          type="text"
          name="localidad"
          value={formData.localidad}
          onChange={handleInputChange}
          placeholder="Localidad"
          required
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default Rotoplas;
