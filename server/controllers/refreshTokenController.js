const jwt = require('jsonwebtoken')
require('dotenv').config();

const database = require('../dbconn/dbPool');
const usersTableInfo = require('../database_info/usersTableInfo');
const dbUtils = require('../dbconn/dbUtils');

//userdata format: { username:'xyz', password:'abc' }
function refreshToken(cookies, callback){
    if(!cookies?.jwt){
        const error = {
            status: 401
        };
        callback(error, null);
        return;
    }
    const refreshToken = cookies.jwt;

    const query = `SELECT ${usersTableInfo.usernameField} FROM ${usersTableInfo.tableName} WHERE ${usersTableInfo.refreshTokenField}='${refreshToken}'`;
    database.query(query, (err, res) => {
        if (dbUtils.handleError(err, callback)) return;
        if (res.rowCount == 0){
            //there is no user with given refresh token
            const error = {
                status: 403
            }
            callback(error, null);
            return;
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err || decoded.username != res.rows[0][usersTableInfo.usernameField]) {
                const error = {
                    status: 403
                }
                callback(error, null);
                return;
            }
            const accessToken = jwt.sign(
                {"username" : decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME }
            );
            result = {
                status: 200,
                data: {
                    accessToken: accessToken,
                    username: decoded.username
                }
            }
            callback(null, result);
        });
    });
}

module.exports = {
    refreshToken,
}