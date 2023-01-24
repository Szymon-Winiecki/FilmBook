const express = require('express')

const router = express.Router()

const roleController = require('../controllers/roleController');

// might be used with query parameter: ?movie=movieId
router.get('/', (req, res) => {
    roleController.getAllRoles(req, res);
});

router.get('/:id', (req, res) => {
    roleController.getRole(req, res);
});

router.post('/', (req, res) => {
    roleController.addRole(req, res);
});

router.put('/:id', (req, res) => {
    roleController.updateRole(req, res);
});

router.delete('/:id', (req, res) => {
    roleController.deleteRole(req, res);
});

module.exports = router;