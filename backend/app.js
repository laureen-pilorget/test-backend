const express = require('express');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://laureenpilo:h6n8LSoYZDSaFlYW@cluster0.apxtpog.mongodb.net',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((e) => console.log(e));

// Middleware qui intercèpte toutes les requêtes qui ont un content-type JSON et mettent à disposition ce contenu sur l'objet requête dans req.body
// intercepte toutes les requêtes qui ont un content-type JSON et nous mettent à disposition ce contenu sur l'objet requête dans req.body
app.use(express.json());

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

// Pour intercepter uniquement les requêtes post (pour l'instant on log à la console parce qu'on a pas encore de DB). 
// 201 est le code pour création de ressource
app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé'
  });
});

// Création d'un middleware. 
// On lui passe la méthode get avec les arguments req pour request, res pour response et next pour passer l'exécution
// Mais aussi l'argument en string /api/stuff qui est la route pour laquelle on souhaite enregistrer cet élément middleware
app.get('/api/stuff', (req, res, next) => {
  //  Création d'un groupe d'articles avec le schéma de données spécifique requis par le front
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  //  Envoi de ces articles sour la forme de données JSON, avec un code 200 pour une demande réussie
  res.status(200).json(stuff);
});

module.exports = app;