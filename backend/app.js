const express = require('express');
// Middleware qui intercèpte toutes les requêtes qui ont un content-type JSON et mettent à disposition ce contenu sur l'objet requête dans req.body
// intercepte toutes les requêtes qui ont un content-type JSON et nous mettent à disposition ce contenu sur l'objet requête dans req.body
const app = express();
const mongoose = require('mongoose');

const Thing = require('./models/Thing');

// 
mongoose.connect('mongodb+srv://laureenpilo:h6n8LSoYZDSaFlYW@cluster0.apxtpog.mongodb.net',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

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
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});


// Création du middleware pour retourner un objet avec la méthode get
app.get('/api/stuff/:id', (req, res, next) => {
  // utilisation du modèle mongoose Thing avec la méthode findOne 
  // auquel on passe l'objet de comparaison : on veut que l'ID de l'objet en vente soit le même que le paramètre de requête 
  Thing.findOne({_id: req.params.id})
    // un promise 
    .then(thing => res.status(200).json(thing))
    // une erreur 404 pour objet non trouvé
    .catch(error => res.status(404).json({ error }));
});


// Création d'un middleware. 
// On lui passe la méthode get avec les arguments req pour request, res pour response et next pour passer l'exécution
// Mais aussi l'argument en string /api/stuff qui est la route pour laquelle on souhaite enregistrer cet élément middleware
app.get('/api/stuff', (req, res, next) => {
  // on lui demande renvoyer un tableau contenznt toutes les Things de la DB 
  Thing.find()
    // Et de nous retourner soit les éléments créés en json, soit une erreur 400
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;