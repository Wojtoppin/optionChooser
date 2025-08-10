const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

// Load data from JSON file once at startup
const dataPath = path.join(__dirname, 'CARS_DATA.json');
let carsData = { producer: [], samochody: [] };

try {
  carsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (err) {
  console.error('Could not load CARS_DATA.json:', err);
}

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Get all cars with producer name
app.get('/data', (req, res) => {
  const result = carsData.samochody.map(car => {
    const producer = carsData.producer.find(p => p.ID === car.producer_id);
    return {
      ...car,
      producer: producer ? producer.producer : null
    };
  });
  res.json(result);
});

// Get all producers with count of cars
app.get('/producent', (req, res) => {
  const result = carsData.producer.map(prod => {
    const counted = carsData.samochody.filter(car => car.producer_id === prod.ID).length;
    return {
      id: prod.ID,
      producer: prod.producer,
      counted
    };
  }).sort((a, b) => b.counted - a.counted);
  res.json(result);
});

// Get all producers
app.get('/producers', (req, res) => {
  res.json(carsData.producer);
});

// Get all cars
app.get('/cars', (req, res) => {
  res.json(carsData.samochody);
});

// Get car by ID
app.get('/cars/:id', (req, res) => {
  const car = carsData.samochody.find(c => c.ID === parseInt(req.params.id));
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json(car);
});

// Get producer by ID
app.get('/producers/:id', (req, res) => {
  const producer = carsData.producer.find(p => p.ID === parseInt(req.params.id));
  if (!producer) return res.status(404).json({ error: 'Producer not found' });
  res.json(producer);
});

app.listen(3040, () => {
  console.log('Server is running on port 3040');
});
