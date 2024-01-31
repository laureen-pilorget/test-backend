const express = require('express');
const auth = require('auth');
const router = express.Router();



const stuffCtrl = require('../controllers/stuff');

// ajout du middleware auth pour vérifier la validité du token envoyé par le client et donc 
// laisser accès à ces routes uniquement si le token est valide 
// et permettre aux différentes routes d'en exploiter les différentes informations telles que le userId
router.post('/', auth, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.get('/', auth, stuffCtrl.getAllThings);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;