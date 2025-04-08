const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/Routes/routes');
const app = express();
const PORT = process.env.PORT || 5001;
const logger = require("./logger");
const cors = require('cors');



// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(cors());

require('dotenv').config(); 
// MongoDB connection string
// const mongoURI = 'mongodb+srv://tasksproject:RYsYgucV1gzE7sZY@cluster0.fw30kt5.mongodb.net/projet?retryWrites=true&w=majority&appName=Cluster0';
const mongoURI = process.env.MONGO_URI_commandes;

app.use((req, res, next) => {
  logger.info(`Requête reçue: ${req.method} ${req.url}`);
  next();
});


// Connecter MongoDB

mongoose.connect(mongoURI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err.message));
 

//****************les routes**************
app.use('/api', userRoutes);


// Démarrer le serveur
app.listen(PORT, () => {
  // console.log(`Le serveur tourne sur le port ${PORT}`);
  logger.info(`Serveur démarré sur le port ${PORT}`);
});

