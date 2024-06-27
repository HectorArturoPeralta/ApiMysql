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

// Crear cliente
router.post("/cliente", (req, res) => {
  const { nombre, direccion, email, password, telefono } = req.body;
  const query = 'INSERT INTO clientes (nombre, direccion, email, contraseña, telefono) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [nombre, direccion, email, contraseña, telefono], (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json({ id: results.insertId, ...req.body });
  });
});

// Obtener todos los clientes
router.get("/cliente", (req, res) => {
  const query = 'SELECT * FROM clientes';
  connection.query(query, (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json(results);
  });
});

// Obtener un solo cliente
router.get("/cliente/:id", (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM clientes WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json(results[0]);
  });
});

// Actualizar cliente
router.put("/cliente/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, email, contraseña, telefono } = req.body;
  const query = 'UPDATE clientes SET nombre = ?, direccion = ?, email = ?, password = ?, telefono = ? WHERE id = ?';
  connection.query(query, [nombre, direccion, email, contraseña, telefono, id], (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json(results);
  });
});

// Eliminar cliente
router.delete("/cliente/:id", (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM clientes WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json(results);
  });
});

module.exports = router;
