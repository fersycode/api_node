// sqlDatabase.config.js
const sql = require('mssql');
require('dotenv').config()
async function connectSQLDatabase() {
    const config = {
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        server: process.env.SQL_SERVER,
        database: process.env.SQL_DATABASE,
        options: {
            encrypt: true,
            trustServerCertificate: true,
        },
    };

    try {
        await sql.connect(config);
    } catch (error) {
        console.error(error);
    }
}

function queryDatabase(queryString) {
    return sql.query(queryString);
}

module.exports = {
    connectSQLDatabase,
    queryDatabase,
};