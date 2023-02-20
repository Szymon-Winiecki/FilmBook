const express = require('express')

const router = express.Router()

const permissionController = require('../controllers/permissionController');

router.get('/', (req, res) => {
    permissionController.getAllPermissions(req, res);
});

router.get('/:rankId', (req, res) => {
    permissionController.getPermissionsForRank(req, res);
});

module.exports = router;