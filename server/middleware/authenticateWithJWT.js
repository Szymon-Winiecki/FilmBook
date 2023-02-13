const jwt = require('jsonwebtoken')
require('dotenv').config();

const database = require('../dbconn/dbPool');
const usersTableInfo = require('../database_info/usersTableInfo');

function authenticateWithJWT(req, res, next){
    const authHeader = req.headers.authorization || req.headers.Authorization || req.headers.authentication || req.headers.Authentication;
    if(!authHeader) return res.status(401).send();
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).send(); //invalid token

        const username = decoded.username;

        //get user id
        const query = `SELECT ${usersTableInfo.idField} FROM ${usersTableInfo.tableName} WHERE ${usersTableInfo.usernameField} = '${username}'`;
        database.query(query, (qerr, qres) => {
            if(qerr) return res.status(500).send();
            if(qres.rows.length == 0) return res.status(401).send();
            const userID = qres.rows[0].id;

            const user = {
                id: userID,
                username: username
            }
            req.user = user;

            next();
        });
    });
}

module.exports = authenticateWithJWT;