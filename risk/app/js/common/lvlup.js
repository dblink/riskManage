/* jshint ignore:start */
let dom = new Map();

/**
 *
 * @param {string} className
 * @param {boolean} update
 * @return Array
 */
const getClassDom = function (className, update) {
    if (update) {
        dom[className] = document.getElementsByClassName(className);
    } else {
        dom[className] = dom[className] || document.getElementsByClassName(className);
    }
    return dom[className];
};

const formatParams = function (jsonParams) {
    let array = [];
    Object
        .keys(jsonParams)
        .map(function (e) {
            array.push(e + "=" + jsonParams[e]);
        });
    return array.join("&");
};

const addClass = function (addClassName) {
    let className = this
        .dom
        .getAttribute("class") || "";
    if (className.indexOf(addClassName) !== -1) {
        return;
    }
    className += " " + addClassName;
    this
        .dom
        .setAttribute("class", className);
};

const removeClass = function (removeClass) {
    let className = this
        .dom
        .getAttribute("class") || "";
    let exp = new RegExp(" " + removeClass, "g");
    className = className.replace(exp, "");
    this
        .dom
        .setAttribute("class", className);
};

const addStyle = function (json) {
    let arrayKeys = Object.keys(json);
    let arrayStyle = [];
    let style = this
        .dom
        .getAttribute("style");
    arrayKeys.map(function (key) {
        arrayStyle.push(key + ":" + json[key]);
    });

    style += arrayStyle.join(";") + ";";
    this
        .dom
        .setAttribute("style", style);
};

function Request(options){
    this.options = options;
    this.xhr = (function () {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        return xhr;
    })();
}

const ajax = function (options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    options.contentType = options.contentType || "application/x-www-form-urlencoded";
    let _Request = new Request(options);
    _Request.sendMessage();
    _Request.callBack();
};

Request.prototype = {
    sendMessage: function () {
        if (!this.options.data) {
            console.error("nodata");
            return;
        }
        let params = formatParams(this.options.data);
        if (this.options.type === "GET") {
            this
                .xhr
                .open("GET", this.options.url + "?" + params, true);
            this
                .xhr.setRequestHeader("Control-Allow-Origin", this.options.jumpUrl || "*")
            this
                .xhr
                .send(null);
        } else if (this.options.type == "POST") {
            this
                .xhr
                .open("POST", this.options.url, true);
                if(this.options.contentType !== "application/x-www-form-urlencoded"){
                    params = this.options.data;
                }else{
                    this
                        .xhr
                        .setRequestHeader("Content-Type", this.options.contentType);
                }
            
            this
                .xhr
                .send(params);
        }
    },
    callBack: function () {
        let xhr = this.xhr;
        let options = this.options;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success(JSON.parse(xhr.response), xhr.responseXML);
                } else {
                    options.error(xhr.responseText, xhr.responseXML);
                }
            }
        };
    }
};

const jsonDeepCompare = function (param1, param2) {
    let type1 = typeof param1;
    let type2 = typeof param2;
    let length1 = type1 === "object" ? param1.length || Object.keys(param1).length : 1;
    let length2 = type2 === "object" ? param2.length || Object.keys(param2).length : 1;

    if (type1 === type2 && length1 === length2) {
        switch (type1) {
            case "number":
            case "string":
            case "boolean":
            case "undefined":
                {
                    return param1 === param2 ? true :  console.log(param1,param2,'str&number') && false;
                }
            case "object":
                {
                    for (var k of Object.keys(param1)) {
                        if (!jsonDeepCompare(param1[k], param2[k])) {
                            return false;
                        }
                    }
                    return true;
                }
            case "function":{
                return true;   
            }
            case "symbol":{
                return false;
            }
            default:
            {
                console.log(type1);
                return console.log(param1,param2,'de') && false;
            }
        }
    } else {
        return false;
    }
};

function LvlDOM(getDom) {
    this.dom = getDom;
}

LvlDOM.prototype = {
    addClass: addClass,
    removeClass: removeClass,
    addStyle: addStyle,
    eq: function (num) {
        return new LvlDOM(this.dom[num]);
    }
};

const lvlDOM = function (className) {
    let getDom;
    if (typeof className === "string") {
        getDom = getClassDom(className);
    } else {
        getDom = className;
    }
    return new LvlDOM(getDom);
};

lvlDOM.ajax = function (json) {
    ajax(json);
};

lvlDOM.jsonDeepCompare = function (param1, param2) {
   return jsonDeepCompare(param1, param2);
};

export default lvlDOM;

/**
 * lvlDOM(classnames).addClass
 * lvlDOM(classnames).removeClass
 * lvlDOM(classnames).addStyle
 * lvlDOM(classnames).eq()
 * lvlDOM(classnames).ajax
 * lvlDOM(classnames).jsonDeepCompare
 */

/* jshint ignore:end */