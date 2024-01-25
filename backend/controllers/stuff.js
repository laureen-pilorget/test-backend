// le fichier controller sert à stocker toute la logique métier (pour chaque fonction de route)

const Thing = require('../models/Thing');

// Pour intercepter uniquement les requêtes post (pour l'instant on log à la console parce qu'on a pas encore de DB). 
// 201 est le code pour création de ressource
exports.createThing = (req, res, next) => {
    console.log(req.body);
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

// Création du middleware pour retourner un objet avec la méthode get
exports.getOneThing = (req, res, next) => {
    // utilisation du modèle mongoose Thing avec la méthode findOne 
    // à laquel on passe l'objet de comparaison : on veut que l'ID de l'objet en vente soit le même que le paramètre de requête 
    Thing.findOne({_id: req.params.id})
      // un promise 
      .then(thing => res.status(200).json(thing))
      // une erreur 404 pour objet non trouvé
      .catch(error => res.status(404).json({ error }));
};

// Création d'un middleware. 
// On lui passe la méthode get avec les arguments req pour request, res pour response et next pour passer l'exécution
// Mais aussi l'argument en string /api/stuff qui est la route pour laquelle on souhaite enregistrer cet élément middleware
  exports.getAllThings = (req, res, next) => {
    // on lui demande renvoyer un tableau contenant toutes les Things de la DB 
    Thing.find()
      // Et de nous retourner soit les éléments créés en json, soit une erreur 400
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
};

// Création du middleware pour modifier un objet avec la méthode put
exports.modifyThing = (req, res, next) => {
    // utilisation du modèle mongoose Thing avec la méthode updateOne 
    // à laquel on passe 2 arguments : l'objet de comparaison (on veut que l'ID de l'objet en vente soit le même que le paramètre de requête) 
    // ET le nouvel objet
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
      .then(() => res.status(200).json({message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({error}));
};

// Création du middleware pour supprimer un objet avec la méthode delete
exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({_id: req.params.id})
      .then(() => res.status(200).json({message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({error}));
};