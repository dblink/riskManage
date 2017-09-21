/* jshint ignore : start */
import React, {Component} from 'react';
import {inter} from './interface';
import {runRequest, stopRequest} from '../module/reuqest';
import {getValue} from './dataConfig';

const getWechatJson = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.getWechatJson.data.token = _value.Token;
    runRequest(inter.getWechatJson, (data) => callback(data));
}

const getTaobao = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.getTaobao.data.token = _value.Token;
    runRequest(inter.getTaobao, (data) => callback(data));
}

const getMessage = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.getMessage.data.token = _value.Token;
    runRequest(inter.getMessage, (data) => callback(data));
}

const postAudit = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.postAudit.data.token = _value.Token;
    runRequest(inter.postAudit, (data) => callback(data));
}

const postImage = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.postImage.data.token = _value.Token;
    runRequest(inter.postImage, (data) => callback(data));
}

const getImage = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.getImage.data.token = _value.Token;
    runRequest(inter.getImage, (data) => callback(data));
}

const getLaoLai = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.getLaoLai.data.token = _value.Token;
    runRequest(inter.getLaoLai, (data) => callback(data));
}

const getAgreement = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.getAgreement.data.token = _value.Token;
    runRequest(inter.getAgreement, (data) => callback(data));
}

const getConvertFormalContract = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.getConvertFormalContract.data.token = _value.Token;
    runRequest(inter.getConvertFormalContract, (data) => callback(data));
}

const daiFu = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.daiFu.data.token = _value.Token;
    runRequest(inter.daiFu, (data) => callback(data));
}

const daiKou = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.daiKou.data.token = _value.Token;
    runRequest(inter.daiKou, (data) => callback(data));
}

const daiKouRenGong = (callback) => {
    let _value = getValue();
    if(!_value) {
        return false;
    }
    inter.daiKouRenGong.data.token = _value.Token;
    runRequest(inter.daiKouRenGong, (data) => callback(data));
}

const confirmDaiFu = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.ConfirmDaiFu.data.token = _value.Token;
    runRequest(inter.ConfirmDaiFu, (data) => callback(data));
}

const loanConfirm = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.loanConfirm.data.token = _value.Token;
    runRequest(inter.loanConfirm, (data) => callback(data));
}

const getGetLoanInfo = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.getLoanInfo.data.token = _value.Token;
    runRequest(inter.getLoanInfo, (data) => callback(data));
}

const getStateListByTime = (callback)=> {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.getStateListByTime.data.token = _value.Token;
    runRequest(inter.getStateListByTime, (data)=> callback(data));
}

const getStateListOnMouseOver = (callback) =>{
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.getStateListOnMouseOver.data.token = _value.Token;
    runRequest(inter.getStateListOnMouseOver, (data) => callback(data));
}

const deletePeople = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.delete.data.token = _value.Token;
    runRequest(inter.delete, (data)=>{
        callback(data);
    })
}

export {
    getWechatJson,
    getMessage,
    postAudit,
    postImage,
    getImage,
    getTaobao,
    getLaoLai,
    getAgreement,
    getConvertFormalContract,
    daiFu,
    confirmDaiFu,
    //获取借款信息
    getGetLoanInfo,
    loanConfirm,
    //系统代扣
    daiKou,
    //人工代扣
    daiKouRenGong,
    getStateListByTime,
    getStateListOnMouseOver,
    //删除合同人
    deletePeople
}

/* jshint ignore : end */
