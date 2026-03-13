// server-export.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const appartementRoutes = require('./routes/appartements');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/appartements', appartementRoutes);
app.get('/', (req, res) => res.send('API Gestion Appartements est en ligne !'));

module.exports = app; // ici on exporte l'app
