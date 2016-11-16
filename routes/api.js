"use strict";
var express = require('express');
var mysql = require('mysql');
var general = require('../general');
var router = express.Router();
var pool;
router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "http://lingfeng.me");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.hostname == 'localhost') {
        pool = mysql.createPool({
            connectionLimit: 1000,
            host: '47.89.23.37',
            user: 'root',
            password: 'hb10Good',
            database: 'zhinengjiaju'
        });
    }
    else {
        pool = mysql.createPool({
            connectionLimit: 1000,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'zhinengjiaju'
        });
    }
    next();
});
var query = function (sql, callback) {
    if (!sql) {
        callback();
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err)
            throw err;
        connection.query(sql, function (err, rows, fields) {
            connection.release();
            if (err)
                throw err;
            callback(null, rows, fields);
        });
    });
};
router.get('/register', function (req, res) {
    var user = req.query['user'];
    var password = req.query['password'];
    if (user && password) {
        query("call createUser('" + user + "','" + password + "')", function (err, rows) {
            if (rows[0][0].lastid == 0) {
                res.send(general.general.setError(500, '重复的名字'));
                return;
            }
            res.json(general.general.setState(200));
        });
    }
    else
        res.json(general.general.setError(500, '缺少参数'));
});
router.get('/login', function (req, res) {
    var user = req.query['user'];
    var password = req.query['password'];
    if (user && password) {
        query("call loginselect('" + user + "','" + password + "',@flg);", function (err, rows) {
            var userid = parseInt(JSON.stringify(rows[0][0].res));
            if (userid == 0) {
                res.json(general.general.setError(500, '用户名密码不正确'));
                return;
            }
            req.session.userid = userid;
            res.json(general.general.setState(200));
        });
        return;
    }
    res.json({});
});
//创建应用
router.get('/createApp', function (req, res) {
    var appname = req.query['appname'];
    if (appname) {
        var userid = general.general.getServerID(req);
        if (userid > 0) {
            var list = general.general.setApp();
            var appid = list[0];
            var appkey = list[1];
            query("call appcreate('" + appname + "','" + userid + "','" + appid + "','" + appkey + "')", function (err, rows) {
                if (rows[0][0].lastid == 0) {
                    res.json(general.general.setError(500, '重复的名字'));
                    return;
                }
                var param = {
                    appid: appid,
                    appkey: appkey
                };
                res.json(general.general.setState(200, param));
            });
        }
        else {
            res.json(general.general.setError(500, 'unknown error'));
        }
    }
    else {
        res.json(general.general.setError(500, '缺少参数'));
    }
});
//查询APP
router.get('/queryApp', function (req, res) {
    var userid = general.general.getServerID(req);
    if (userid > 0) {
        var sql = "select `name`,`appid` from `app` where `userid` = " + userid;
        query(sql, function (error, rows) {
            if (error) {
                res.json(general.general.setError(500, 'sql error'));
                return;
            }
            res.json(general.general.setState(200, rows));
        });
    }
    else
        res.json(general.general.setError(500, 'unknown error'));
});
//查询APPKEY
router.get('/queryAppKey', function (req, res) {
    var appid = req.query['appid'];
    if (appid) {
        var userid = general.general.getServerID(req);
        if (userid > 0) {
            var sql = "select `appkey` from `app` where `userid` = " + userid + " and appid = '" + appid + "'";
            query(sql, function (err, rows) {
                if (err) {
                    res.json(general.general.setError(500, 'sql error'));
                    return;
                }
                res.json(general.general.setState(200, rows[0].appkey));
            });
        }
        else
            res.json(general.general.setError(500, 'unknown error'));
    }
    else
        res.json(general.general.setError(500, '缺少参数'));
});
//查询所有可以创建的虚拟设备
router.get('/querySmartDevice', function (req, res) {
    query("select `id`,`name` from smartDevice where status = 1", function (err, rows) {
        if (err) {
            res.json(general.general.setError(500, 'sql error'));
            return;
        }
        res.json(general.general.setState(200, rows));
    });
});
//创建虚拟设备
router.get('/createDevice', function (req, res) {
    var deviceId = req.query['deviceid'];
    var deviceName = req.query['devicename'];
    if (deviceId && deviceName) {
        var userid = general.general.getServerID(req);
        if (userid > 0) {
            query("select count(*) as num from smartDevice where status = 1 and `id` = " + deviceId, function (err, rows) {
                if (rows[0]['num'] > 0) {
                    var userid = req.session.userid;
                    var deviceCDK = general.general.randStr(20);
                    query("call createUserDevice('" + deviceName + "','" + deviceCDK + "','" + userid + "')", function (err, rows) {
                        res.json(general.general.setState(200, { deviceCDK: deviceCDK }));
                    });
                }
                else {
                    res.json(general.general.setError(500, 'no this device'));
                }
            });
        }
        else
            res.json(general.general.setError(500, 'unknown error'));
    }
    else
        res.json(general.general.setError(500, '缺少参数'));
});
//创建场景
router.get('/createScene', function (req, res) {
    var list = req.query['list'];
    var listJson = JSON.parse(list);
    var array = [];
    recAsyn(0, listJson, array, function (resArray) {
        res.json(general.general.setState(200, resArray));
    });
});
router.get('/setDebug', function (req, res) {
    var flag = req.query['flag'];
    var appid = req.query['appid'];
    if ((parseInt(flag) == 0 || parseInt(flag) == 1) && appid) {
        var userid = general.general.getServerID(req);
        if (userid > 0) {
            var sql = "select count(*) as num from `app` where `appid` = '" + appid + "' and `userid` = " + userid;
            query(sql, function (err, rows) {
                if (err || rows[0].num == 0)
                    res.json(general.general.setError(500, 'Record not found'));
                else {
                    var sql = "update `app` set `debug` = " + flag + " where `appid` = '" + appid + "'";
                    query(sql, function (err, rows) {
                        if (err)
                            res.json(general.general.setError(500, 'sql error'));
                        else
                            res.json(general.general.setState(200));
                    });
                }
            });
        }
        else
            res.json(general.general.setError(500, 'login error'));
    }
    else
        res.json(general.general.setError(500, 'error'));
});
router.get('/queryLocal', function (req, res) {
    query("select `id`,`name` from `local`", function (err, rows) {
        if (err) {
            res.json(general.general.setError(500, 'sql error'));
            return;
        }
        res.json(general.general.setState(200, rows));
    });
});
var recAsyn = function (index, listJson, data, fun) {
    index++;
    var cdk = listJson[index - 1]['cdk'];
    var local = listJson[index - 1]['local'];
    query("update userDevice set `local` = " + local + " where deviceCDK = '" + cdk + "'", function (err, rows) {
        if (err)
            data.push({ state: 'error', cdk: cdk });
        else
            data.push({ state: 'ok', cdk: cdk });
        if (index < listJson.length)
            recAsyn(index, listJson, data, fun);
        else
            fun(data);
    });
};
module.exports = router;
