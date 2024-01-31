const multer = require('multer');
// On créé un 'dictionnaire' des mime types que l'on peut retrouver
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Création d'un objet de configuration pour multer avec utilisation de la fonction diskStorage pour dire qu'on va l'enregistrer sur le disque
const storage = multer.diskStorage({
    // Élément destination pour expliquer dans quel dossier enregistrer les fichiers
    destination: (req, file, callback) => {
        // On appelle le callback en passant l'argument null pour dire qu'il n'y a pas eu d'erreur à ce niveau-là, et le nom du dossier images 
        callback(null, 'images')
    },
    // Élément filename qui explique à multer quel nom de fichier utiliser 
    // (on ne peut pas utiliser le nom du fichier d'origine car problème lorsque 2 fichiers ont le même nom par exemple)
    filename: (req, file, callback) => {
        // On créé son nom en utilisant le nom d'origine en enlevant les espaces possibles et en les remplacant par des underscores
        const name = file.originalname.split(' ').join('_');
        // On créé une extension au fichier qui sera l'élément du dictionnaire qui correspond au mime type du fichier envoyé par le frontend
        const extension = MIME_TYPES[file.mimetype];
        // On appelle le callback en passant l'argument null pour dire qu'il n'y a pas eu d'erreur à ce niveau-là, et on créé le filename entier
        // À savoir le name de base + un timestamp (à la milliseconde près) + un point + l'extension
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage}).single('image');