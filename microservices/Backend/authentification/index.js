const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  
const userRoutes = require('./src/Routes/routes');

const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const logger = require("./logger");

require('dotenv').config(); 

const mongoURI = 'mongodb+srv://tasksproject:nKvR6JejpYd3QDqN@cluster0.fw30kt5.mongodb.net/projet?retryWrites=true&w=majority&appName=Cluster0';



app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));

// logs
app.use((req, res, next) => {
  logger.info(`Requête reçue: ${req.method} ${req.url}`);
  next();
});



// Connecter MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err.message));
 
// Routes
app.use('/api', userRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  // console.log(`Le serveur tourne sur le port ${PORT}`);
  logger.info(`Serveur démarré sur le port ${PORT}`);

});



