/**
 * Created by guolingfeng on 2016/11/3.
 */
import express = require('express');
export class general
{
    static getServerID(req:express.Request):number
    {
        if(req.session.userid) {
            return req.session.userid;
        }
        else
            return 0;
    }

    static setError(err:number,message:string):{}
    {
        return ({err:err,message:message});
    }
    static setState(state:number,param:{} = null):{}
    {
        var resJson = {
            state:state
        };
        if(param)
            resJson['param'] = param;
        return resJson;
    }
    static setApp():string[]
    {
        var list:string[] = [];
        list.push(this.randStr(20));
        list.push(this.randStr(20));
        return list;
    }

    static randStr(num:number):string
    {
        var str:string = '1234567890abcdefghigkmnopqrstuvwxyzABCDEFGHIJKMNOPQRSTUVWXYZ';
        var resStr:string = '';
        for(var i=0;i<num;i++)
        {
            var rand:number = Math.floor(Math.random()*(str.length));
            resStr += str[rand];
        }
        return resStr;
    }
}
console.log(general.randStr(20));