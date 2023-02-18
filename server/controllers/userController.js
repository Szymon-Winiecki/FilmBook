const database = require('../dbconn/dbPool');

const usersTableInfo = require('../database_info/usersTableInfo');
const usersRanksTableInfo = require('../database_info/usersRanksTableInfo');
const ranksTableInfo = require('../database_info/ranksTableInfo');

function getAllUsers(req, res){
    const query = `select id, nazwa, email from uzytkownik;`;
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    });
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

function getUserRanks(req, res){
    const query = `SELECT r.${ranksTableInfo.nameField} FROM ${usersTableInfo.tableName} u join ${usersRanksTableInfo.tableName} ur on u.${usersTableInfo.idField} = ur.${usersRanksTableInfo.userIdField} join ${ranksTableInfo.tableName} r on ur.${usersRanksTableInfo.rankIdField} = r.${ranksTableInfo.idField} WHERE u.${usersTableInfo.idField} = '${req.params.id}'`;
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        if(qres.rowCount == 0){
            return res.sendStatus(404);
        }
        const ranks = qres.rows.map((row) => {return row[ranksTableInfo.nameField];});
        res.status(200).json(ranks);
    })
}

function getOwnRanks(req, res){
    const query = `SELECT r.${ranksTableInfo.nameField} FROM ${usersTableInfo.tableName} u join ${usersRanksTableInfo.tableName} ur on u.${usersTableInfo.idField} = ur.${usersRanksTableInfo.userIdField} join ${ranksTableInfo.tableName} r on ur.${usersRanksTableInfo.rankIdField} = r.${ranksTableInfo.idField} WHERE u.${usersTableInfo.idField} = '${req.user.id}'`;
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        if(qres.rowCount == 0){
            return res.sendStatus(404);
        }
        const ranks = qres.rows.map((row) => {return row[ranksTableInfo.nameField];});
        res.status(200).json(ranks);
    })
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getUserRanks,
    getOwnRanks
}