
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path=require('path')
const app = express();
app.use(cors());
app.use(express.json());
const http = require('http').createServer(app);
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'newwebapp.c74ey066ureu.eu-north-1.rds.amazonaws.com',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASS || 'Kunjir28',
  database: process.env.DB_NAME || 'newwebapp'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL Database!');
});
app.enable('trust-proxy');
app.use(cors({ origin: '*' })); // Allow all origins (Not recommended for production)



app.post('/recommend', (req, res) => {
  const { genre, duration, mood } = req.body;
  const query = `SELECT * FROM movies WHERE genre = ? AND duration = ? AND mood = ?; `;

  db.query(query, [genre, duration, mood], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.length === 0) {
      res.json({ success: false,data:[] });
    } else {
      res.json({ success:true, data:result});
    }
  });
});

http.listen(5000, () => console.log('Server running on port 5000'));
