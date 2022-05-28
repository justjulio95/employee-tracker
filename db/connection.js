const mysql = require('mysql2');
const config = require('config');
const user = config.get('server.user');
const pw = config.get('server.pw')

//Connect to database
const db = mysql.createConnection(
    {
        host:'localhost',
        //SQL username 'default is root'
        user: user,
        // MySQL password
        password: pw,
        database:'company_db'
    }
);

module.exports = db;