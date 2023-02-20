const express = require('express')

const router = express.Router()

const authentication = require('../middleware/authenticateWithJWT');
const authorization = require('../middleware/authorize');

const permissionController = require('../controllers/permissionController');

router.get('/', authentication, authorization('get_permissions'), (req, res) => {
    permissionController.getAllPermissions(req, res);
});

router.get('/:rankId', authentication, authorization('get_rank_permissions'), (req, res) => {
    permissionController.getPermissionsForRank(req, res);
});

module.exports = router;