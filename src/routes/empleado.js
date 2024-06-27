const express = require("express");
const mysql = require('mysql2');
require('dotenv').config();

const router = express.Router();

// Conexión a MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect(error => {
  if (error) {
    console.error('Error conectando a la base de datos:', error.stack);
    return;
  }
});

// Crear empleado
router.post("/empleado", (req, res) => {
  const { nombre, email, password, telefono } = req.body;
  const query = 'INSERT INTO empleados (nombre, email, contraseña, telefono) VALUES (?, ?, ?, ?)';
  connection.query(query, [nombre, email, contraseña, telefono], (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json({ id: results.insertId, ...req.body });
  });
});

// Obtener todos los empleados
router.get("/empleado", (req, res) => {
  const query = 'SELECT * FROM empleados';
  connection.query(query, (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json(results);
  });
});

// Obtener un solo empleado
router.get("/empleado/:id", (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM empleados WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json(results[0]);
  });
});

// Actualizar empleado
router.put("/empleado/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email, contraseña, telefono } = req.body;
  const query = 'UPDATE empleados SET nombre = ?, email = ?, contraseña = ?, telefono = ? WHERE id = ?';
  connection.query(query, [nombre, email, contraseña, telefono, id], (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json(results);
  });
});

// Eliminar empleado
router.delete("/empleado/:id", (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM empleados WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json(results);
  });
});

module.exports = router;
