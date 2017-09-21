/* jshint ignore : start */
import React, { Component } from 'react';

import {runRequest, stopRequest} from '../module/reuqest';
import {inter} from './interface';
import { getValue } from '../config/dataConfig';

const format = (e) => {
    let array = [];
    e.map((line)=>{
        array.push({"value":line.Value,"primaryText": line.PrimaryText || "无"})
    });
    return array;
}

const getCompany = (callback, fresh)=>{
    let _value = getValue();
    if(!_value){
        return false;
    }

    if(inter.getCompany.callback[0].value && !fresh){
        setTimeout(function() {
            callback(inter.getCompany.callback);
        }, 200); 
        return;
    }

    inter.getCompany.data.token = _value.Token; 
    runRequest(inter.getCompany, (data)=>{
        inter.getCompany.callback = format(data);
        inter.getCompany.noAllData = format(data).splice(1, inter.getCompany.callback.length);
        inter.getCompany.addAllData = [].concat.call({value: "-2", primaryText: "公司"}, format(data));
        callback(inter.getCompany.callback);
    });
}

const getRole = (callback)=>{
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.getRole.data.token = _value.Token;
    runRequest(inter.getRole, (data)=>{
        inter.getRole.callback = format(data);
        callback(inter.getRole.callback);
    });
}

const getLeader = (callback) =>{
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.getLeader.data.token = _value.Token;
    runRequest(inter.getLeader, (data)=>{
        inter.getLeader.callback = format(data||[]);
        callback(inter.getLeader.callback);
    });
}

const addEmployee = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.addEmployee.data.token = _value.Token;
    runRequest(inter.addEmployee, (data)=>{
        typeof data === inter.addEmployee.callback.success
        ? callback('success')
        : callback(data.error)
    })
}

const changeEmployee = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.changeEmployee.data.token = _value.Token;
    runRequest(inter.changeEmployee, (data)=>{
        typeof data === inter.changeEmployee.callback.success
        ? callback('success')
        : callback(data.error)
    })
}

const settleByPeople = (callback) =>{
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.settleByPeople.data.token = _value.Token;
    runRequest(inter.settleByPeople, callback)
}

const settleBySystem = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.settleBySystem.data.token = _value.Token;
    runRequest(inter.settleBySystem, callback);
}

export {getCompany, getLeader, getRole, addEmployee, changeEmployee, settleByPeople, settleBySystem};

/* jshint ignore : end */