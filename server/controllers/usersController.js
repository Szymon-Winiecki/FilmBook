const database = require('../dbconn/dbPool');

function getAllUsers(req, res){
    res.status(200).json( {function: 'get all users'} );
}

function getUser(req, res){
    res.status(200).json( {function: `get user ${req.params.id}`} );
}

function addUser(req, res){
    res.status(200).json( {function: 'add user'} );
}

function updateUser(req, res){
    res.status(200).json( {function: 'update user'} );
}

function deleteUser(req, res){
    res.status(200).json( {function: 'delete user'} );
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}