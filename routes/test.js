"use strict";
var express = require('express');
var db = require('../db');
var router = express.Router();
router.get('/', function (req, res) {
    var sql = 'SELECT * from user';
    var mysql = new db.db();
    mysql.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(rows[0].user);
    });
    res.send('1');
});
module.exports = router;
