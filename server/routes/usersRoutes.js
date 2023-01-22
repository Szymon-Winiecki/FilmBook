const express = require('express')

const router = express.Router()

const usersController = require('../controllers/usersController');

router.get('/', (req, res) => {
    usersController.getAllUsers(req, res);
});

router.get('/:id', (req, res) => {
    usersController.getUser(req, res);
});

router.post('/', (req, res) => {
    usersController.addUser(req, res);
});

router.put('/:id', (req, res) => {
    usersController.updateUser(req, res);
});

router.delete('/:id', (req, res) => {
    usersController.deleteUser(req, res);
});

module.exports = router;