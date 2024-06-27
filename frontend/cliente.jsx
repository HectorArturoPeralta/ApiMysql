import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    email: '',
    password: '',
    telefono: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/cliente')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener clientes:', error);
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
    axios.post('http://localhost:3000/api/cliente', formData)
      .then(response => {
        setClientes([...clientes, response.data]);
        setFormData({
          nombre: '',
          direccion: '',
          email: '',
          password: '',
          telefono: ''
        });
      })
      .catch(error => {
        console.error('Error al crear cliente:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/cliente/${id}`)
      .then(response => {
        setClientes(clientes.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar cliente:', error);
      });
  };

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clientes.map(item => (
          <li key={item.id}>
            {item.nombre} - {item.direccion} - {item.email} - {item.telefono}
            <button onClick={() => handleDelete(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h2>Crear Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleInputChange}
          placeholder="Dirección"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          placeholder="Teléfono"
          required
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default Clientes;
