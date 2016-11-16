"use strict";
var express = require('express');
var data = require('../db');
var router = express.Router();
router.get('/', function (req, res) {
    var user = req.query['user'];
    var password = req.query['password'];
    if (user && password) {
        var db = new data.db();
        db.query("call loginselect('" + user + "','" + password + "',@flg);", function (err, rows, fields) {
            var userid = parseInt(JSON.stringify(rows[0][0].res));
            req.session.userid = userid;
            res.send('登陆成功');
        });
        return;
    }
    res.send('');
});
module.exports = router;
