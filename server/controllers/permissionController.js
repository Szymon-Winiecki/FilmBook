const database = require('../dbconn/dbPool');

function getAllPermissions(req, res){
    const query = `select * from uprawnienie;`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function getPermissionsForRank(req, res){
    const query = `select nazwa, opis from uprawnienie u
     join uprawnienia_rang ur on u.nazwa = ur.uprawnienie_nazwa 
     where ranga_id = ${req.params.rankId};`;
    
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

module.exports = {
    getAllPermissions,
    getPermissionsForRank
}