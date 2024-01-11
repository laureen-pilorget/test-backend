const express = require('express');

const app = express();

// Création d'un middleware. 
// On lui passe la méthode use avec les arguments req pour request, res pour response et next pour passer l'exécution
// Mais aussi l'argument en string /api/stuff qui est la route pour laquelle on souhaite enregistrer cet élément middleware
app.use('/api/stuff', (req, res, next) => {
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