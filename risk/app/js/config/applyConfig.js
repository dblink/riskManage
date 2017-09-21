/* jshint ignore: start */
import React, {Component} from 'react';

import {runRequest, stopRequest} from '../module/reuqest';
import {inter} from './interface';
import {getValue} from './dataConfig';

const postLoanApp = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.applyMoneyStep1.data.token = _value.Token;
    runRequest(inter.applyMoneyStep1, (data) => callback(data));
}

const selectUserMessage = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.selectUserMessage.data.token = _value.Token;
    runRequest(inter.selectUserMessage, (data) => callback(data));
}

const selectUserMessageByAppid = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.selectUserMessageByAppid.data.token = _value.Token;
    runRequest(inter.selectUserMessageByAppid, (data) => callback(data));
}

const getEditUserMessage = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.getEditUserMessage.data.token = _value.Token;
    runRequest(inter.getEditUserMessage, (data) => callback(data));
}

const postEditUserMessage = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.postEditUserMessage.data.token = _value.Token;
    runRequest(inter.postEditUserMessage, (data) => callback(data));
}

const getRepayMentListByContarctId = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.getRepayMentListByContarctId.data.token = _value.Token;
    runRequest(inter.getRepayMentListByContarctId, (data) => callback(data));
}

const getRepayMentListTitle = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.getContarctTitle.data.token = _value.Token;
    runRequest(inter.getContarctTitle, (data) => callback(data));
}

const selectUserMessageA = (callback) => {
    let _value = getValue();
}

const addUserMessage = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    let _data = inter.addUserMessage.data;
    _data.token = _value.Token;
    _data.CompanyInfo = JSON.stringify(_data.CompanyInfo);
    _data.HouseStateInfo = JSON.stringify(_data.HouseStateInfo);
    _data.OtherInfo = JSON.stringify(_data.OtherInfo);
    _data.MaritalRemark = JSON.stringify(_data.MaritalRemark);
    console.log(typeof _data.CompanyInfo);
    runRequest(inter.addUserMessage, (data) => callback(data));
}

const getCreditToken = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }

    inter.getCreditToken.data.token = _value.Token;

    runRequest(inter.getCreditToken, (data) => callback(data));
}

const createTask = (callback) => {
     let _value = getValue();
    if(!_value){
        return false;
    }
    inter.CreateTask.data.token = _value.Token;

    runRequest(inter.CreateTask, (data) => callback(data));
}

const createTaskList = (callback) =>{
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.CreateTaskList.data.token = _value.Token;

    runRequest(inter.CreateTaskList, (data) => callback(data));
}

const inputCode = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.InputCode.data.token = _value.Token;

    runRequest(inter.InputCode, (data) => callback(data));
}

const getTaskState = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.GetTaskState.data.token = _value.Token;

    runRequest(inter.GetTaskState, (data) => callback(data));
}

const updateRadar = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.UpdateRadar.data.token = _value.Token;

    runRequest(inter.UpdateRadar, (data) => callback(data));
}

const postFrom = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.PostFrom.data.token = _value.Token;
    runRequest(inter.PostFrom, (data) => callback(data));
}

const getApplyItemInfo = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.getApplyItemInfo.data.token = _value.Token;
    runRequest(inter.getApplyItemInfo, (data) => callback(data));
}

const changeTime = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.changeTime.data.token = _value.Token;
    runRequest(inter.changeTime, (json) =>{
        callback(json);
    })
}

const changeTimeAfterSet = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.changeTimeAfterSet.data.token = _value.Token;
    runRequest(inter.changeTimeAfterSet, (json)=>{
        callback(json);
    })
}

const changeFinalTerm = (callback) => {
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.changeFinalTerm.data.token = _value.Token;
    runRequest(inter.changeFinalTerm, (json) => {
        callback(json);
    })
}

const changeFinalMoney = (callback) =>{
    let _value = getValue();
    if(!_value){
        return false;
    }
    inter.changeFinalMoney.data.token = _value.Token;
    runRequest(inter.changeFinalMoney, (json) => {
        callback(json);
    })    
}

export {
    postLoanApp,
    selectUserMessage,
    addUserMessage,
    getCreditToken,
    createTask,
    createTaskList,
    inputCode,
    getTaskState,
    updateRadar,
    getApplyItemInfo,
    postFrom,
    selectUserMessageByAppid,
    getRepayMentListByContarctId,
    getRepayMentListTitle,
    changeTime,
    changeFinalTerm,
    changeFinalMoney,
    //获取修改人信息
    getEditUserMessage,
    //提交修改人信息
    postEditUserMessage,
    //生成后修改日期
    changeTimeAfterSet
}
/* jshint ignore: end */