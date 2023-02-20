const express = require('express')

const router = express.Router()

const authentication = require('../middleware/authenticateWithJWT');
const authorization = require('../middleware/authorize');

const usersController = require('../controllers/userController');

//get your own permissions
router.get('/permissions', authentication, usersController.getOwnPermissions);

//change your own password
router.put('/changepassword', authentication, usersController.changeOwnPassword);

router.get('/', authentication, authorization('get_users'), (req, res) => {
    usersController.getAllUsers(req, res);
});

router.get('/:id', authentication, authorization('get_user'), (req, res) => {
    usersController.getUser(req, res);
});

router.post('/', (req, res) => {
    usersController.addUser(req, res);
});

router.put('/:id', (req, res) => {
    usersController.updateUser(req, res);
});

router.put('/updateRank/:id', authentication, authorization('alter_user_rank'), (req, res) => {
    usersController.updateUserRank(req, res);
});

router.delete('/:id', authentication, authorization('delete_user'), (req, res) => {
    usersController.deleteUser(req, res);
});

module.exports = router;