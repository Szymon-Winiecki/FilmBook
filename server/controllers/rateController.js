const database = require('../dbconn/dbPool');
const ratesTableInfo = require('../database_info/ratesTableInfo');
const usersTableInfo = require('../database_info/usersTableInfo');
const schemas = require('../validation/rateSchemas');

function getAllRatesForMovie(req, res){
    const query = `SELECT ${ratesTableInfo.rateField}, ${ratesTableInfo.descriptionField}, ${usersTableInfo.usernameField} as autor 
                    FROM ${ratesTableInfo.tableName} JOIN ${usersTableInfo.tableName} ON ${ratesTableInfo.tableName}.${ratesTableInfo.useridField} = ${usersTableInfo.tableName}.${usersTableInfo.idField} 
                    WHERE ${ratesTableInfo.movieIdField} = ${req.params.id}`;

    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    });
}

function getAllRatesOfUser(req, res){
    const query = `SELECT ${ratesTableInfo.rateField}, ${ratesTableInfo.descriptionField}, ${usersTableInfo.usernameField} as autor 
                    FROM ${ratesTableInfo.tableName} JOIN ${usersTableInfo.tableName} ON ${ratesTableInfo.tableName}.${ratesTableInfo.useridField} = ${usersTableInfo.tableName}.${usersTableInfo.idField} 
                    WHERE ${ratesTableInfo.useridField} = ${req.params.id}`;

    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    });
}

function getRate(req, res){

}

function getOwnRateOfMovie(req, res){
    const query = `SELECT ${ratesTableInfo.rateField}, ${ratesTableInfo.descriptionField}, ${usersTableInfo.usernameField} as autor 
    FROM ${ratesTableInfo.tableName} JOIN ${usersTableInfo.tableName} ON ${ratesTableInfo.tableName}.${ratesTableInfo.useridField} = ${usersTableInfo.tableName}.${usersTableInfo.idField} 
    WHERE ${ratesTableInfo.useridField} = ${req.user.id} AND ${ratesTableInfo.movieIdField} = ${req.params.id}`;

    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    });
}

function addRate(req, res){

    const validation = schemas.newRateData.validate(req.body);
    if(validation.error){
        res.status(400).send(validation.error.message);
        return;
    }

    const query = `INSERT INTO ${ratesTableInfo.tableName}(${ratesTableInfo.rateField}, ${ratesTableInfo.descriptionField}, ${ratesTableInfo.movieIdField}, ${ratesTableInfo.useridField}) VALUES(${req.body.ocena}, '${req.body.uzasadnienie}', ${req.body.film_id}, ${req.user.id}) returning *;`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    });
}

function updateRate(req, res){
    const validation = schemas.newRateData.validate(req.body);
    if(validation.error){
        res.status(400).send(validation.error.message);
        return;
    }

    const query = `UPDATE ${ratesTableInfo.tableName} 
                    SET ${ratesTableInfo.rateField} = ${req.body.ocena}, ${ratesTableInfo.descriptionField} = '${req.body.uzasadnienie}' 
                    WHERE ${ratesTableInfo.movieIdField} = ${req.body.film_id} AND ${ratesTableInfo.useridField} = ${req.user.id} returning *;`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        if(qres.rows.length == 0){
            res.sendStatus(404);
            return;
        }
        res.status(200).json(qres.rows);
    });
}

function deleteOwnRateOfMovie(req, res){
    const query = `DELETE FROM ${ratesTableInfo.tableName} WHERE ${ratesTableInfo.movieIdField} = ${req.params.id} AND ${ratesTableInfo.useridField} = ${req.user.id} returning *;`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    });
}

function deleteRate(req, res){

}


module.exports = {
    getAllRatesForMovie,
    getAllRatesOfUser,
    getOwnRateOfMovie,
    deleteOwnRateOfMovie,
    getRate,
    addRate,
    updateRate,
    deleteRate
}