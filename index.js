const express = require('express');
const cors = require('cors');
require('dotenv').config();

const appartementRoutes = require('./routes/appartements');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/appartements', appartementRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('API Gestion Appartements est en ligne !');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur http://192.168.88.209:${PORT}`);
});
