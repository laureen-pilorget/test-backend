const express = require('express');

const app = express();

// méthode use avec une fonction qui reçoit la requête et la réponse 
// et utilisation de l'objet réponse avec la méthode json pour renvoyer une réponse en json
app.use((req, res) => {
    res.json({message: 'Votre requête a bien été reçue'});
});

module.exports = app;