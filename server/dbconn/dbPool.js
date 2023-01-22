const Pool = require('pg').Pool;
const fs = require('fs');

let credentials = JSON.parse(fs.readFileSync('dbconn/credentials.json'));

const pool = new Pool(credentials)

module.exports = pool;