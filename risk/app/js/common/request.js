/**
 * Created by Administrator on 2017/3/14.
 */

/* jshint ignore : start */
import $ from './lvlup';
function cRequest(json, success, error, simulation) {
    let req,
        data,
        rAjax;
    req = json;
    data = {};
    //parameter = this.state.parameter;
    if (simulation) {
        setTimeout(() => {
            success(simulation);
        }, 500);
        return;
    }
    rAjax = $.ajax({
        url: req.url,
        data: req.data,
        type: req.type,
        jumpUrl: req.jumpUrl,
        contentType: req.contentType,
        dataType: req.dataType,
        success: (data) => {
            /*document.getElementsByClassName("mainWindow")[0].scrollTop = 0;*/
            success(data)
        },
        error: (data) => {
            error(data);
        }
    });
    return rAjax;
}
const cStop = () => {
    let array = [];
    return (ajx) => {
        if (ajx === "stop") {
            array.map((line) => {
                line
                    ? line.abort()
                    : "";
            });
            return;
        }
        array.push(ajx)
    }
};

function Request(json, success, error, simulation) {
    this.json = json;
    this.success = success;
    this.error = error;
    this.simulation = simulation;
    this.stop = cStop();
}

Request.prototype = {
    ajaxRequest() {
        let _ajax = cRequest(this.json, this.success, this.error, this.simulation);

        this.stop(_ajax);
    },
    stopRequest() {
        this.stop("stop");
    }
};

export {Request}
/* jshint ignore : end*/