const jwt = require('jsonwebtoken');


// Création d'un middleware qui prend le token envoyé par le client et en vérifie la validité
module.exports = (req, res, next) => {
    try {
        // On extrait le token du header Authorization de la requête entrante
        // Comme il y aura également le mot-clé Bearer, on utilise la fonction split pour ne récupérer que ce qu'il y a après l'espace dans le header
        const token = req.headers.authorization.split(' ') [1];
        // On utilise la fonction verify pour décoder le token. Une erreur sera générée s'il n'est pas valide
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        // On extrait l'ID utilisateur du token et on le rajoute à l'objet req pour que nos différentes routes puissent l'exploiter
        req.auth = {
            userId: userId
        };
    } catch(error) {
        res.status(401).json({ error });
    }
};