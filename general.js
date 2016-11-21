"use strict";
var general = (function () {
    function general() {
    }
    general.getServerID = function (req) {
        if (req.session.userid) {
            return req.session.userid;
        }
        else
            return 0;
    };
    general.setError = function (err, message) {
        return ({ err: err, message: message });
    };
    general.setState = function (state, param) {
        if (param === void 0) { param = null; }
        var resJson = {
            state: state
        };
        if (param)
            resJson['param'] = param;
        return resJson;
    };
    general.setApp = function () {
        var list = [];
        list.push(this.randStr(20));
        list.push(this.randStr(20));
        return list;
    };
    general.randStr = function (num) {
        var str = '1234567890abcdefghigkmnopqrstuvwxyzABCDEFGHIJKMNOPQRSTUVWXYZ';
        var resStr = '';
        for (var i = 0; i < num; i++) {
            var rand = Math.floor(Math.random() * (str.length));
            resStr += str[rand];
        }
        return resStr;
    };
    return general;
}());
exports.general = general;
console.log(general.randStr(20));
