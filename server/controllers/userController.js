const bcrypt = require('bcrypt');

const database = require('../dbconn/dbPool');

const usersTableInfo = require('../database_info/usersTableInfo');
const ranksTableInfo = require('../database_info/ranksTableInfo');

const schemas = require('../validation/authenticationSchemas');

function getAllUsers(req, res){
    const query = `select id, nazwa, email, ranga_id from uzytkownik;`;
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

function getOwnPermissions(req, res){
    const query = ``;
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

function changeOwnPassword(req, res){

    const userData = req.body;

    const validation = schemas.changePasswordData.validate(userData);
    if(validation.error){
        res.status(400).send(validation.error.message);
        return;
    }

    userData.username = req.user.username;

    const setPassword = (username, passwordHash) => {
        const query = `UPDATE ${usersTableInfo.tableName} SET ${usersTableInfo.passwordHashField} = '${passwordHash}' WHERE ${usersTableInfo.usernameField}='${username}' RETURNING *`;
        database.query(query, (qerr, qres) => {
            if(qerr){
                res.sendStatus(500);
                return;
            }
            if (qres.rowCount == 0){
                //there is no user with given username
                res.sendStatus(401);
                return;
            }

            res.sendStatus(204);
        });

    }

    const query = `SELECT ${usersTableInfo.passwordHashField} FROM ${usersTableInfo.tableName} WHERE ${usersTableInfo.usernameField}='${userData.username}'`;
    database.query(query, (qerr, qres) => {
        if(qerr){
            res.sendStatus(500);
            return;
        }
        if (qres.rowCount == 0){
            //there is no user with given username
            res.sendStatus(401);
            return;
        }

        savedHash = qres.rows[0][usersTableInfo.passwordHashField];

        bcrypt.compare(userData.oldPassword, savedHash, (err, match) => {
            if(err){
                res.sendStatus(500);
                return;
            }

            if(match){
                bcrypt.hash(userData.newPassword, 10, (err, hash) => {
                    if(err){
                        res.sendStatus(500);
                        return;
                    }
                    setPassword(userData.username, hash);
                });
            }
            else{
                res.sendStatus(401);
                return;
            }
        })
    })
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getOwnPermissions,
    changeOwnPassword
}