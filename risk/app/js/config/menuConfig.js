/* jshint ignore: start */
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {runRequest, stopRequest} from '../module/reuqest';
//import interJson from '../../json/interface.json';
import {inter as interJson} from './interface';
import {getValue} from '../config/dataConfig';
import {data} from './login';

const formate = (data) => {
    let array = [];
    data.map((e) => {
        let paramter = {
            primaryText: e.MeunName,
            nextParameter: "nestedItems",
            initiallyOpen: false,
            primaryTogglesNestedList: true,
            nestedItems: e.Items && e.Items.length && formate(e.Items),
            "data-rl": e.Url && e
                .Url
                .replace(/\s/g, '') || "",
            "data-id": e.Id,
            "data-gropId": e.GroupID,
            onClick: function (e) {
                let url = e
                    .currentTarget
                    .getAttribute("data-rl");
                if (url === "null" || !url) {
                    return;
                }
                browserHistory.push(url)
            }
        }
        array.push(paramter);
    })
    return array;
}

const menuConfig = (callback) => {

    let _setting = getValue();
    if (!_setting) {
        return;
    }
    if(interJson.getMenu.callback[0].GroupID !== "string"){
        callback(interJson.getMenu.callback);
    }
    interJson.getMenu.data.token = _setting.Token;
    runRequest(interJson.getMenu, (data) => {
        let _callback = data;
        _callback = formate(_callback);
        interJson.getMenu.callback = _callback;
        callback(_callback);
        //formate(_callback);
    });

};

export default menuConfig;
/* jshint ignore: end */