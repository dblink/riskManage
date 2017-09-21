/**
 * Created by Administrator on 2017/4/21.
 */
/* jshint ignore: start */
import {browserHistory} from 'react-router';
import {Request} from './../common/request';
//import {simulation} from './simulation';

const funcRequest = (() => {
    let request = new Request();
    //接口信息, 数据内容， 成功操作， 失败操作
    return (interfaceJson, success, error) => {
        //let request = new Request();
        let parameter;
        parameter = {}; //
        if (!error) {
            error = (e) => {
                //console.log(e);
                //console.log(JSON.parse(e));
                alert(JSON.parse(e).error);
                browserHistory.push("/");
                return false;
            }
        }

        if (typeof interfaceJson === "object") {
            Object
                .keys(interfaceJson)
                .map((sub) => {
                    parameter[sub] = interfaceJson[sub];
                })
        }

        request.url = interfaceJson.url;
        request.jumpUrl = interfaceJson.jumpUrl;
        request.contentType = interfaceJson.contentType;
        request.json = parameter;
        request.success = success;
        request.error = error;
        //request.simulation = simulation && simulation[interfaceJson.name];
        return request;
    };
})();

export const runRequest = (setting, success, error) => {
    return funcRequest(setting, success, error).ajaxRequest()
};

export const stopRequest = () => {
    return funcRequest().stopRequest()
};
/* jshint ignore: end */