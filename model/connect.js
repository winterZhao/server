"use strict";
const wrapper = require('co-mysql');
const mysql = require('mysql');
const options = {
    connectionLimit : 10,
    host     : '127.0.0.1',
    port     : 3306,
    user     : 'root',
    password : 'root',
    database : 'server'
};
const pool = mysql.createPool(options);

const p = wrapper(pool);

module.exports = p;





