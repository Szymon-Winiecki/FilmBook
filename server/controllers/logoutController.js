const database = require('../dbconn/dbPool');
const usersTableInfo = require('../database_info/usersTableInfo');
const dbUtils = require('../dbconn/dbUtils');

function logout(cookies, callback){
    if(!cookies?.jwt){
        //user hasn't been logged in
        const result = {
            status: 204
        };
        callback(null, result);
        return;
    }
    const refreshToken = cookies.jwt;

    const findUserWithTokenQuery = `SELECT ${usersTableInfo.usernameField} FROM ${usersTableInfo.tableName} WHERE ${usersTableInfo.refreshTokenField}='${refreshToken}'`;
    database.query(findUserWithTokenQuery, (qerr, qres) => {
        if (dbUtils.handleError(qerr, callback)) return;
        if (qres.rowCount == 0){
            //there is no user with given refresh token
            const result = {
                status: 204,
                clearCookies:[
                    {
                        name: 'jwt',
                        options: { httpOnly: true, sameSite: 'None', secure: true}
                    }
                ]
            }
            callback(null, result);
            return;
        }
            
        const deleteTokenQuery = `UPDATE ${usersTableInfo.tableName} SET ${usersTableInfo.refreshTokenField} = '' WHERE ${usersTableInfo.refreshTokenField} = '${refreshToken}'`;
        database.query(deleteTokenQuery, (qerr, qres) => {
            if (dbUtils.handleError(qerr, callback)) return;
            const result = {
                status: 204,
                clearCookies:[
                    {
                        name: 'jwt',
                        options: { httpOnly: true, sameSite: 'None', secure: true}
                    }
                ]
            }
            callback(null, result);
        });
    });
}

module.exports = {
    logout
}