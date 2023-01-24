const database = require('../dbconn/dbPool');

function getAllPeople(req, res){
    const query = `select * from czlowiek_kina;`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function getPerson(req, res){
    const query = `select * from czlowiek_kina where id=${req.params.id};`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function addPerson(req, res){
    const query =   `insert into czlowiek_kina(imie, nazwisko, data_urodzenia, opis) 
                    values('${req.body.imie}', '${req.body.nazwisko}', '${req.body.data_urodzenia}', '${req.body.opis}') returning *`;
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function updatePerson(req, res){
    const query =   `update czlowiek_kina set 
                    imie='${req.body.imie}', nazwisko='${req.body.nazwisko}', data_urodzenia='${req.body.data_urodzenia}', opis='${req.body.opis}'
                    where id=${req.params.id} returning *;`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function deletePerson(req, res){
    const query = `delete from czlowiek_kina where id=${req.params.id} returning *;`
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
    getAllPeople,
    getPerson,
    addPerson,
    updatePerson,
    deletePerson
}