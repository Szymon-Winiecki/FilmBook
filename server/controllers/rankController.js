const database = require('../dbconn/dbPool');

function getAllRanks(req, res){
    const query = `select * from ranga;`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function getRank(req, res) {
    const query = `select * from ranga where id = ${req.params.id};`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function addRank(req, res){
    let client = null;
    database.connect()
    .then((response) => {
        client = response;
    })
    .then(() => {
        const query = `insert into ranga(nazwa) values('${req.body.nazwa}') returning id;`;
        return client.query(query);
    })
    .then((response) => {
        let rankId = response.rows[0].id;
        let queries = [];
        req.body.uprawnienia.forEach(permission => {
            const query = `call nadaj_uprawnienie(${rankId}, '${permission}');`;
            queries.push(client.query(query));
        });

        return Promise.all(queries);
    })
    .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
}

function updateRank(req, res){
    let client = null;
    database.connect()
    .then((response) => {
        client = response;
    })
    .then(() => {
        const query = `update ranga set nazwa = '${req.body.nazwa}' where id = ${req.params.id};`;
        return client.query(query);
    })
    .then(() => {
        const query = `delete from uprawnienia_rang where ranga_id = ${req.params.id};`;
        return client.query(query);
    })
    .then(() => {
        let queries = [];
        req.body.uprawnienia.forEach(permission => {
            const query = `call nadaj_uprawnienie(${req.params.id}, '${permission}');`;
            queries.push(client.query(query));
        });

        return Promise.all(queries);
    })
    .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
}

function deleteRank(req, res){
    const query = `delete from ranga where id = ${req.params.id};`;
    // cascade delete ranga_uprawnienia
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
    getAllRanks,
    getRank,
    addRank,
    updateRank,
    deleteRank
}