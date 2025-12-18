const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔴 ENDPOINT DE PRUEBA (OBLIGATORIO)
app.get('/', (req, res) => {
  res.send('API OK');
});

// Conexión BD
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login_sena'
});

// REGISTRO
app.post('/register', (req, res) => {
  console.log('POST /register', req.body);

  const { username, password } = req.body;

  const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
    res.json({ mensaje: 'Usuario registrado correctamente' });
  });
});

// LOGIN
app.post('/login', (req, res) => {
  console.log('POST /login', req.body);

  const { username, password } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error del servidor' });
    }

    if (result.length > 0) {
      res.json({ mensaje: 'Autenticación satisfactoria' });
    } else {
      res.status(401).json({ mensaje: 'Error en la autenticación' });
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});

