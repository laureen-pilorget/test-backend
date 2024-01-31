const jwt = require('jsonwebtoken');


// Création d'un middleware qui prend le token envoyé par le client et en vérifie la validité
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ') [1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
    } catch(error) {
        res.status(401).json({ error });
    }
};