const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const database = require('../dbconn/dbPool');
const schemas = require('../validation/authenticationSchemas');
const validationUtils = require('../validation/validationUtils');
const usersTableInfo = require('../database_info/usersTableInfo');
const dbUtils = require('../dbconn/dbUtils');

//userdata format: { username:'xyz', password:'abc' }
function login(userData, callback){
    const validation = schemas.loginData.validate(userData);
    if(validationUtils.handleError(validation.error, callback)) return;

    const query = `SELECT ${usersTableInfo.passwordHashField} FROM ${usersTableInfo.tableName} WHERE ${usersTableInfo.usernameField}='${userData.username}'`;
    database.query(query, (err, res) => {
        if (dbUtils.handleError(err, callback)) return;
        if (res.rowCount == 0){
            //there is no user with given username
            const error = {
                status: 404,
                userMessage: 'Wrong username'
            }
            callback(error, null);
            return;
        }

        savedHash = res.rows[0][usersTableInfo.passwordHashField];

        bcrypt.compare(userData.password, savedHash, (err, match) => {
            if(err){
                const error = {
                    status: 500,
                    userMessage: "Server error",
                    systemMessage: err
                };
                callback(error, null);
                return;
            }

            if(match){
                const accessToken = jwt.sign(
                    { "username":userData.username }, 
                    process.env.ACCESS_TOKEN_SECRET, 
                    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME }
                );
                const refreshToken = jwt.sign(
                    { "username":userData.username }, 
                    process.env.REFRESH_TOKEN_SECRET, 
                    { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME }
                );

                const updateRefreshTokenQuery = `UPDATE ${usersTableInfo.tableName} SET ${usersTableInfo.refreshTokenField} = '${refreshToken}' WHERE ${usersTableInfo.usernameField} = '${userData.username}'`;
                database.query(updateRefreshTokenQuery, (err, res) => {
                    if(dbUtils.handleError(err, callback)) return;
                    
                    const result = {
                        status: 200,
                        data: accessToken,
                        cookies: [
                            {
                                name: 'jwt',
                                value: refreshToken,
                                options: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
                            }
                        ]
                    };
                    callback(null, result);
                });
            }
            else{
                const error = {
                    status: 401,
                    userMessage: "Wrong username or password"
                };
                callback(error, null);
            }
        })
    })
}

module.exports = {
    login,
}