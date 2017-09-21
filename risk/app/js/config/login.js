/* jshint ignore : start */
import React, {Component} from 'react';
import {inter} from './interface';
import {runRequest, stopRequest} from '../module/reuqest';
import {setStorage, getStorage, clearStorage, getValue} from '../config/dataConfig';

const data = {
    data: ""
};
const login = (callback) => {
    runRequest(inter.login, (json) => {
        setStorage("user", json, 180000000);
        callback(json);
    });
}
const changePassword = (callback)=>{
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.changePassword.data.token = getValue().Token;
    runRequest(inter.changePassword, (json) => {
        callback(json)
    });
}



const dismission = (callback)=>{
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.dismission.data.token = getValue().Token;
    runRequest(inter.dismission, (json) => {
        callback(json);
    })
}

export {login, data, changePassword, dismission};
/* jshint ignore : end */