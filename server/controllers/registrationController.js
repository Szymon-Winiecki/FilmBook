const bcrypt = require('bcrypt');

const database = require('../dbconn/dbPool');
const schemas = require('../validation/authenticationSchemas');
const validationUtils = require('../validation/validationUtils');
const usersTableInfo = require('../database_info/usersTableInfo');
const dbUtils = require('../dbconn/dbUtils');

function registerNewUser(newUserData, callback){
    const validation = schemas.newUserData.validate(newUserData);
    if(validationUtils.handleError(validation.error, callback)) return;

    const addNewUserToDB = (username, email, passwordHash, callback) => {
        database.connect((err, client, done) => {
        
            client.query('BEGIN', err => {
                if (dbUtils.handleAbort(err, client, done, callback)) { return; }
                
                const checkIfUsernameAvailableQuery = `SELECT 'a' FROM ${usersTableInfo.tableName} WHERE ${usersTableInfo.usernameField}='${username}'`;
                client.query(checkIfUsernameAvailableQuery, (err, res) => {
                    if (dbUtils.handleAbort(err, client, done, callback)) { return; }
                    if(res.rows.length > 0){
                        //user with givent username already exists - usernames conflict
                        const error = {
                            status: 409,
                            userMessage: "this username is taken, try another one",
                        };
                        callback(error, null);
                        return;
                    }
        
                    const createUserquery = `INSERT INTO ${usersTableInfo.tableName}(${usersTableInfo.usernameField}, ${usersTableInfo.passwordHashField}, ${usersTableInfo.emailField}) VALUES ('${username}', '${passwordHash}', '${email}') RETURNING *`;
                    console.log(createUserquery);
                    client.query(createUserquery, (err, res) => {
                        if (dbUtils.handleAbort(err, client, done, callback)) { return; }
                        
                        //registration successful
                        const result = {
                            status: 200,
                            data: `user ${username} registered`
                        };

                        client.query('COMMIT', err => {
                            if (dbUtils.handleAbort(err, client, done, callback)) { return; }
                            done();
        
                            callback(null, result);
                        });
                        
                    });
                });
            });
          });
    };

    bcrypt.hash(newUserData.password, 10, (err, hash) => {
        if(err){
            const error = {
                status: 500,
                userMessage: "Server error",
                systemMessage: err
            };
            callback(error, null);
            return;
        }
        addNewUserToDB(newUserData.username, newUserData.email, hash, callback);
    });

}

module.exports = {
    registerNewUser,
}