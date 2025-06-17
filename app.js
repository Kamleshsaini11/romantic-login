const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: 'bpzpqawnfxlabbc9sys3-mysql.services.clever-cloud.com',
  user: 'uptz90cchwr783z8',
  password: 'Lh9uYxdrOOgDKIzgjOvp',
  database: 'bpzpqawnfxlabbc9sys3'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
    if (err) throw err;

    const passwordIsValid = /^(?=.*\d).{6,}$/.test(password);
    if (username && passwordIsValid && (username.toLowerCase() == 'umashankarsaini11' || username.toLowerCase() == 'lizel_rose8')) res.render('love');
    else res.render('invalid');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});