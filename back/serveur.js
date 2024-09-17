// back/serveur.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

app.use(cors()); // Use the cors middleware

// Chemin vers le fichier CSV
const csvFilePath = path.join(__dirname, './Data/data.csv');

// Route pour servir le fichier CSV
app.get('/data', (req, res) => {
  fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Erreur lors de la lecture du fichier CSV');
      return;
    }
    res.header('Content-Type', 'text/csv');
    res.send(data);
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});