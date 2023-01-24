const express = require('express')

const router = express.Router()

const personController = require('../controllers/personController');

router.get('/', (req, res) => {
    personController.getAllPeople(req, res);
});

router.get('/:id', (req, res) => {
    personController.getPerson(req, res);
});

router.post('/', (req, res) => {
    personController.addPerson(req, res);
});

router.put('/:id', (req, res) => {
    personController.updatePerson(req, res);
});

router.delete('/:id', (req, res) => {
    personController.deletePerson(req, res);
});

module.exports = router;