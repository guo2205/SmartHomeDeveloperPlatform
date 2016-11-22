/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/supertest/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />
/// <reference path="../typings/globals/expect/index.d.ts" />
import mocha = require('mocha');
import assert = require('assert');
import supertest = require('supertest');
import expect = require('expect');

//let api = supertest('10.10.3.41:3978');
let api = supertest('http://localhost:3978');

/*
assert.ok(fun1,fun);  如果为fun1为false 就执行后面的fun
*/

viko_test();
function viko_test()
{
    describe("接口测试", api_test);
}

function api_test()
{
    describe("登陆接口测试", login);
    describe("主机注册接口测试", RegisterDevice);
    describe("获取已经配置过的主机接口测试", GetFinishedDevice);
    describe("获取没有配置过的主机接口测试", GetUnfinishedDevice);
    describe("获取区域昵称接口测试", GetLocationPetName);
}

/*用户登陆*/
function login()
{
    it('用户登录成功测试', function (done)
    {
        api.post('/api/UserLogin')
            .set('Accept', 'application/json')
            .send({
                username: 'android',
                password: 'android',
                msgcode: '111'
            })
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function (err, res)
            {
                log("登陆成功，返回的数据是：" + res.text);
                let js = JSON.parse(res.text);
                assert.ok(js.st == "10000", "这里应该得到服务器处理的状态码");
                assert.ok(js.fid != undefined, "成功登陆后应该得到返回的家庭ID");
                done()
            })

    })
    it('用户登录失败测试', function (done)
    {
        api.post('/api/UserLogin')
            .set('Accept', 'application/json')
            .send({
                username: 'android',
                password: 'android1',
                msgcode: '111'
            })
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function (err, res)
            {
                log("登陆失败，返回的数据是：" + res.text);
                let js = JSON.parse(res.text);
                assert.ok(js.st != undefined, "这里应该得到服务器处理的状态码");
                assert.ok(js.fid == undefined, "成功登陆后不应该得到返回的家庭ID");
                done()
            })

    })
}
/*家电注册*/
function RegisterDevice()
{
    it('家电注册成功测试', function (done)
    {
        api.post('/api/RegisterDevice')
            .set('Accept', 'application/json')
            .send({
                dcdk: 'fghdfh',
                fid: '1'
            })
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function (err, res)
            {
                log("注册成功，返回的数据是：" + res.text);
                let js = JSON.parse(res.text);
                assert.ok(js.st == "10000", "这里应该得到服务器处理的状态码");
                done()
            })

    })
    it('家电注册失败测试', function (done)
    {
        api.post('/api/RegisterDevice')
            .set('Accept', 'application/json')
            .send({
                dcdk: 'fghdfh',
                fid: '1'
            })
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function (err, res)
            {
                log("注册失败，返回的数据是：" + res.text);
                let js = JSON.parse(res.text);
                assert.ok(js.st != "10000","这里应该得到服务器处理的状态码");
                done()
            })

    })
}
/*获取已经配置过的主机*/
function GetFinishedDevice()
{
    it('获取已经配置过的主机成功', function (done)
    {
        api.post('/api/GetFinishedDevice')
            .set('Accept', 'application/json')
            .send({
                fid: '88'
            })
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function (err, res)
            {
                log("获取成功，返回的数据是：" + res.text);
                let js = JSON.parse(res.text);
                assert.ok(js.st == "10000", "这里应该得到服务器处理的状态码");
                assert.ok(js.msg.length > 0, "这里应该得到获取到的数据");
                done()
            })

    })
    it('获取已经配置过的主机失败', function (done)
    {
        api.post('/api/GetFinishedDevice')
            .set('Accept', 'application/json')
            .send({
                fid: '77'
            })
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function (err, res)
            {
                log("获取失败，返回的数据是：" + res.text);
                let js = JSON.parse(res.text);
                assert.ok(js.st == "10000", "这里应该得到服务器处理的状态码");
                assert.ok(js.msg.length == 0, "这里应该得到获取到的数据");
                done()
            })

    })
}
/*获取没有配置过的主机*/
function GetUnfinishedDevice()
{
    it('获取没有配置过的主机成功', function (done)
    {
        api.post('/api/GetUnfinishedDevice')
            .set('Accept', 'application/json')
            .send({
                fid: '88'
            })
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function (err, res)
            {
                log("获取成功，返回的数据是：" + res.text);
                let js = JSON.parse(res.text);
                assert.ok(js.st == "10000", "这里应该得到服务器处理的状态码");
                assert.ok(js.msg.length > 0, "这里应该得到获取到的数据");
                done()
            })

    })
    it('获取没有配置过的主机失败', function (done)
    {
        api.post('/api/GetUnfinishedDevice')
            .set('Accept', 'application/json')
            .send({
                fid: '77'
            })
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function (err, res)
            {
                log("获取失败，返回的数据是：" + res.text);
                let js = JSON.parse(res.text);
                assert.ok(js.st == "10000", "这里应该得到服务器处理的状态码");
                assert.ok(js.msg.length == 0, "这里应该得到获取到的数据");
                done()
            })

    })
}
/*获取区域昵称列表*/
function GetLocationPetName()
{
    it('获取区域昵称列表成功', function (done)
    {
        api.post('/api/GetLocationPetName')
            .set('Accept', 'application/json')
            .send({
                fid : "88",
                locationid :"1"
            })
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function (err, res)
            {
                log("获取成功，返回的数据是：" + res.text);
                let js = JSON.parse(res.text);
                assert.ok(js.st == "10000", "这里应该得到服务器处理的状态码");
                assert.ok(js.msg.length > 0, "这里应该得到获取到的数据");
                done()
            })

    })
    it('获取区域昵称列表失败', function (done)
    {
        api.post('/api/GetLocationPetName')
            .set('Accept', 'application/json')
            .send({
                fid: "88",
                locationid: "11"
            })
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function (err, res)
            {
                log("获取失败，返回的数据是：" + res.text);
                let js = JSON.parse(res.text);
                assert.ok(js.st == "10000", "这里应该得到服务器处理的状态码");
                assert.ok(js.msg.length == 0, "这里不应该得到获取到的数据");
                done()
            })
    })
}
/*配置主机*/
function SetDeviceConfig()
{
    it('获取区域昵称列表成功', function (done)
    {
        api.post('/api/GetLocationPetName')
            .set('Accept', 'application/json')
            .send({
                dcdk: "123123",
                locationID: "1",
                locationPetName: "",
            })
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function (err, res)
            {
                log("获取成功，返回的数据是：" + res.text);
                let js = JSON.parse(res.text);
                assert.ok(js.st == "10000", "这里应该得到服务器处理的状态码");
                assert.ok(js.msg.length > 0, "这里应该得到获取到的数据");
                done()
            })

    })
}



function log(str: string)
{
    //console.log(str);
}