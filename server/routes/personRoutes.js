const express = require('express')

const router = express.Router()

const authentication = require('../middleware/authenticateWithJWT');
const authorization = require('../middleware/authorize');

const personController = require('../controllers/personController');

router.get('/', (req, res) => {
    personController.getAllPeople(req, res);
});

router.get('/:id', (req, res) => {
    personController.getPerson(req, res);
});

router.post('/', authentication, authorization('add_person'), (req, res) => {
    personController.addPerson(req, res);
});

router.put('/:id', authentication, authorization('alter_person'), (req, res) => {
    personController.updatePerson(req, res);
});

router.delete('/:id', authentication, authorization('delete_person'), (req, res) => {
    personController.deletePerson(req, res);
});

module.exports = router;