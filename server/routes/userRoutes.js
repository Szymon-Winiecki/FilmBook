const express = require('express')

const router = express.Router()

const authentication = require('../middleware/authenticateWithJWT');
const authorization = require('../middleware/authorize');

const usersController = require('../controllers/userController');

//get ranks of specific user
router.get('/ranks/:id', authentication, authorization('show_user_rank'), usersController.getUserRanks);

//get your own ranks
router.get('/ranks/', authentication, usersController.getOwnRanks);

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