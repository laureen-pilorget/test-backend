const express = require('express');

const app = express();

// 1er middleware qui enregistre "requête reçue" dans la console et passe l'exécution grâce à next
app.use((req, res, next) => {
    console.log('requête reçue');
    next();
});

// 2ème middleware qui ajoute un code d'état 201 à la réponse et passe l'exécution
app.use((req,res,next) => {
    res.status(201);
    next();
})
// méthode use avec une fonction qui reçoit la requête et la réponse 
// et utilisation de l'objet réponse avec la méthode json pour renvoyer une réponse en json
// 3ème middleware qui envoie la réponse JSON et passe l'exécution
app.use((req, res, next) => {
    res.json({message: 'Votre requête a bien été reçue'});
    next();
});

// dernier middleware qui enregistre "Réponse envoyée avec succès" dans la console
app.use((req, res) => {
    console.log('Réponse envoyée avec succès')
})

module.exports = app;