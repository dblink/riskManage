/* jshint ignore : start */
import { browserHistory } from 'react-router';
import { restore } from './interface';
const setStorage = (name, value, time = 0) => {
    let json = {};
    if (typeof value === "object") {
        json.value = JSON.stringify(value);
        json.time = time;
        json.setTime = new Date().getTime();
        localStorage[name] = JSON.stringify(json);
        return "ok";
    }
    json.value = value;
    json.time = time;
    json.setTime = new Date().getTime();
    localStorage[name] = JSON.stringify(json);
    return "ok";
}

const getStorage = (name, type = "string") => {
    if (type === "object") {
        return localStorage[name] && JSON.parse(localStorage[name]) || "";
    }
    return localStorage[name];
}
const clearStorage = () => {
    localStorage.clear();
    restore();
};

const getValue = () => {
    let json = getStorage("user", "object");
    if (!json) {
        browserHistory.push("/");
        return;
    }
    // if (new Date().getTime() - json.setTime > json.time) {
    //     clearStorage();
    //     browserHistory.push("/");
    //     return false;
    // } else {
    //     return JSON.parse(json.value);
    // }
    return JSON.parse(json.value);
}

export { setStorage, getStorage, clearStorage, getValue };
/* jshint ignore : end */