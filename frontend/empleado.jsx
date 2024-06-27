import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/empleado')
      .then(response => {
        setEmpleados(response.data);
      })
      .catch(error => {
        console.error('Error al obtener empleados:', error);
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
    axios.post('http://localhost:3000/api/empleado', formData)
      .then(response => {
        setEmpleados([...empleados, response.data]);
        setFormData({
          nombre: '',
          email: '',
          password: '',
          telefono: ''
        });
      })
      .catch(error => {
        console.error('Error al crear empleado:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/empleado/${id}`)
      .then(response => {
        setEmpleados(empleados.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar empleado:', error);
      });
  };

  return (
    <div>
      <h1>Lista de Empleados</h1>
      <ul>
        {empleados.map(item => (
          <li key={item.id}>
            {item.nombre} - {item.email} - {item.telefono}
            <button onClick={() => handleDelete(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h2>Crear Empleado</h2>
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

export default Empleados;
