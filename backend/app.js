const express = require('express');
// Middleware qui intercèpte toutes les requêtes qui ont un content-type JSON et mettent à disposition ce contenu sur l'objet requête dans req.body
// intercepte toutes les requêtes qui ont un content-type JSON et nous mettent à disposition ce contenu sur l'objet requête dans req.body
const app = express();
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// 
mongoose.connect('mongodb+srv://laureenpilo:h6n8LSoYZDSaFlYW@cluster0.apxtpog.mongodb.net',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Création d'un middleware général (pas de route précisée) car appliqué à toutes les routes, toutes les requêtes envoyées à notre serveur
app.use((req, res, next) => {
  // Ajout de headers : pour dire qu'on peut accéder à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Autorisation d'utiliser certains headers sur l'objet requête
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Pour envoyer des requêtes avec les méthodes mentionnées (GET, POST, PUT, DELETE, PATCH et OPTIONS)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Permet d'accéder au corps de la requête. Intercepte toutes les requêtes qui ont un content-type JSON 
// et nous met à disposition ce contenu sur l'objet requête dans req.body. L'ancienne version de ce middleware est le bodyParser
app.use(express.json());

// Ici on remet le début de la route : '/api/stuff' et on dit que pour cette route là, on utilise le router stuffRoutes
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;