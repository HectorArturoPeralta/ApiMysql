const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const empleadoRoutes = require('./routes/empleado');
const clienteRoutes = require('./routes/cliente');
const rotoplasRoutes = require('./routes/rotoplas');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/api', clienteRoutes);
app.use('/api', empleadoRoutes);
app.use('/api', rotoplasRoutes);

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

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido');
});

app.listen(port, () => {
  console.log(`Servidor en el puerto ${port}`);
});
