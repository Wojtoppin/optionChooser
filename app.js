const express = require('express');
const app = express();
const db = require('./db.js');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());




// -------database-------
app.get('/data', (req, res) => {
  const sql = `SELECT samochody.ID, name, cena, przebieg, klimatyzacja, sredni_koszt_naprawy, Producer.producer
  FROM samochody
  JOIN Producer ON Producer.id = samochody.producer_id`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;  
    }
    res.json(results);
  });
});
app.get('/data/:direction/:code/', (req, res) => {
  const code = req.params.code;
  const direction = req.params.direction;
  const sql = `SELECT samochody.ID, name, cena, przebieg, klimatyzacja, sredni_koszt_naprawy, Producer.producer
  FROM samochody
  JOIN Producer ON Producer.id = samochody.producer_id ORDER BY ${code} ${direction}`;
  db.query(sql, [code],(err, results) => {
    console.log(sql)
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;  
    }
    res.json(results);
  });
});


app.post('/addData', (req, res) => {
  const { name, cena, przebieg, klimatyzacja, sredni_koszt_naprawy, producer_id } = req.body;

  if (!name || isNaN(parseFloat(cena)) || isNaN(parseInt(przebieg)) || isNaN(parseFloat(sredni_koszt_naprawy))|| isNaN(parseFloat(producer_id))) {
    return res.status(400).json({ error: 'Invalid data format' });
  }
  const sql = `INSERT INTO samochody (name, cena, przebieg, klimatyzacja, sredni_koszt_naprawy, producer_id) VALUES (?, ?, ?, ?, ?, ?) `;
  

  db.query(sql, [name, cena, przebieg, klimatyzacja, sredni_koszt_naprawy, producer_id],(err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      console.log(sql)
      return;  
    }
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'Data inserted successfully' });
  });
});


//----------Producer------------

app.get('/producent', (req, res) => {
  const sql = `SELECT Producer.id, Producer.producer, COUNT(samochody.producer_id) AS counted
  FROM Producer
  LEFT JOIN samochody ON Producer.id = samochody.producer_id
  GROUP BY Producer.id, Producer.producer ORDER BY counted DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;  
    }
    res.json(results);
  });
});

//----------weight------------

app.get('/weight', (req, res) => {
  const sql = `SELECT * FROM weight WHERE 1=1`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;  
    }
    res.json(results);
  });
});


//---------generic_data------
app.get('/generic_data', (req, res) => {
  const sql = 'SELECT * FROM generic_data';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;  
    }
    res.json(results);
  });
});


app.post('/generic_data', (req, res) => {
  const { ID, CLOB } = req.body;

  if (!ID || !CLOB) {
    return res.status(400).json({ error: 'Invalid data format' });
  }
  
  const sql = 'INSERT INTO generic_data (ID, CLOB) VALUES (?, ?)';
  
  db.query(sql, [ID, CLOB], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;  
    }
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'Data inserted successfully' });
  });
});












// -------/database-------



app.listen(3040, () => {
  console.log('Server is running on port 3040');
});
