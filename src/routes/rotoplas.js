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

// Crear rotoplas
router.post("/rotoplas", (req, res) => {
  const { num_rotoplas, capacidad, nivel, localidad } = req.body;
  const query = 'INSERT INTO rotoplas (num_rotoplas, capacidad, nivel, localidad) VALUES (?, ?, ?, ?)';
  connection.query(query, [num_rotoplas, capacidad, nivel, localidad], (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json({ id: results.insertId, ...req.body });
  });
});

// Obtener todos los rotoplas
router.get("/rotoplas", (req, res) => {
  const query = 'SELECT * FROM rotoplas';
  connection.query(query, (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json(results);
  });
});

// Obtener un solo rotoplas
router.get("/rotoplas/:id", (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM rotoplas WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json(results[0]);
  });
});

// Actualizar rotoplas
router.put("/rotoplas/:id", (req, res) => {
  const { id } = req.params;
  const { num_rotoplas, capacidad, nivel, localidad } = req.body;
  const query = 'UPDATE rotoplas SET num_rotoplas = ?, capacidad = ?, nivel = ?, localidad = ? WHERE id = ?';
  connection.query(query, [numeroRotoplas, capacidad, nivel, localidad, id], (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json(results);
  });
});

// Eliminar rotoplas
router.delete("/rotoplas/:id", (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM rotoplas WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      return res.json({ message: error });
    }
    res.json(results);
  });
});

module.exports = router;
