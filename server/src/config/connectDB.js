const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: 'root',
    database: 'tv_shop',
    waitForConnections: true,
});

module.exports = pool;
