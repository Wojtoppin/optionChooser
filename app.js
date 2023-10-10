const express = require('express');
const app = express();
const db = require('./db.js');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// -------database-------
app.get('/api/currencies', (req, res) => {
  const sql = 'SELECT * FROM currency_stability';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/stability/:code', (req, res) => {
  const code = req.params.code;
  const sql = 'SELECT stability FROM currency_stability WHERE code = ?';
  
  db.query(sql, [code], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});
// -------/database-------



// -------nbp-------
app.get('/api/nbp', (req, res) => {
        fetch("http://api.nbp.pl/api/exchangerates/tables/A/")
        .then(response => response.json())
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
})

app.get('/api/nbp/:code', (req, res) => {
        const code = req.params.code;
        fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${code}/last/10/`)
        .then(response => response.json())
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
})
// -------/nbp-------




app.listen(3030, () => {
  console.log('Server is running on port 3030');
});
