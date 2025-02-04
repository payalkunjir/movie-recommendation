
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'movies_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database!');
});

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Redirect all other routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

app.listen(3000, () => console.log('Server running on port 3000'));
