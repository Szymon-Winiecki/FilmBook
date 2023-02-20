const database = require('../dbconn/dbPool');

/*function fetchData(query) {
    return new Promise((resolve, reject) => {
        database.query(query, (qerr, qres) => {
            if(qerr){
                console.error(qerr);
                console.error(query);
            }
            resolve(qres.rows);
        });
    });
}*/

/*async function getAllGenres(){
    const query = `select * from gatunek;`;
    const data = await fetchData(query);
    return data;
}*/

function getAllGenres(req, res){
    const query = `select * from gatunek`;
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function getGenresOfMovie(req, res){
    const query = `select gatunek.id, gatunek.nazwa from gatunek join gatunki_filmow on gatunek.id = gatunki_filmow.gatunek_id where gatunki_filmow.film_id = ${req.params.id};`;
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        if(qres.rows.length == 0){
            return res.sendStatus(404);
        }
        res.status(200).json(qres.rows);
    });
}

function getGenre(req, res){
    const query = `select * from gatunek where id=${req.params.id};`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function addGenre(req, res){
    const query =   `insert into gatunek(nazwa) 
                    values('${req.body.nazwa}') returning *`;
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function updateGenre(req, res){
    const query =   `update gatunek set 
                    nazwa='${req.body.nazwa}'
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

function deleteGenre(req, res){
    const query = `delete from gatunek where id=${req.params.id} returning *;`
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
    getAllGenres,
    getGenresOfMovie,
    getGenre,
    addGenre,
    updateGenre,
    deleteGenre
}