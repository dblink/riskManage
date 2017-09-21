/* jshint ignore : start */
const data = {
    htbh: "合同编号",
    qxrq: "起息日期",
    qsrq: "起始日期",
    jsrq: "结束日期",
    jkhtje: "借款合同金额",
    jkqs: "借款期数",
    cplb: "产品类别",
    zhje: "周还金额",
    fze: "管理费",
    khm: "开户名",
    khh: "开户行",
    zh: "账号",
    qs: "期数",
    rq: "日期",
    qcbj: "期初本金",
    zhbj: "周还本金",
    zhlx: "周还利息",
    zhke: "周还款额",
    zmbj: "周末本金",
    tqjq: "提前结清"
}
const page1 = (data) => {
    return [
        {
            "name": data.htbh,
            "x": 119,
            "y": 63
        }, {
            "name": data.qxrq,
            "x": 120,
            "y": 90
        }, {
            "name": data.qsrq,
            "x": 330,
            "y": 90
        }, {
            "name": data.jsrq,
            "x": 495,
            "y": 90
        }, {
            "name": data.jkhtje,
            "x": 120,
            "y": 121
        }, {
            "name": data.jkqs,
            "x": 255,
            "y": 121
        }, {
            "name": data.cplb,
            "x": 375,
            "y": 121
        }, {
            "name": data.zhje,
            "x": 506,
            "y": 121
        }, {
            "name": data.fze,
            "x": 199,
            "y": 157
        }, {
            "name": data.khm,
            "x": 389,
            "y": 157
        }, {
            "name": data.khh,
            "x": 128,
            "y": 195
        }, {
            "name": data.zh,
            "x": 390,
            "y": 195
        }, {
            "type": "map",
            "marginY": "23.96",
            "first": {
                "x": 30,
                "y": 312
            },
            "value": data.qs
        }, {
            "type": "map",
            "value": data.rq,
            "marginY": "23.96",
            "first": {
                "x": 73,
                "y": 312
            }
        }, {
            "type": "map",
            "value": data.qcbj,
            "marginY": "23.96",
            "first": {
                "x": 158,
                "y": 312
            }

        }, {
            "type": "map",
            "value": data.zhbj,
            "marginY": "23.96",
            "first": {
                "x": 227,
                "y": 312
            }
        }, {
            "type": "map",
            "value": data.zhlx,
            "marginY": "23.96",
            "first": {
                "x": 294,
                "y": 312
            }
        }, {
            "type": "map",
            "value": data.zhke,
            "marginY": "23.96",
            "first": {
                "x": 356,
                "y": 312
            }
        }, {
            "type": "map",
            "value": data.zmbj,
            "marginY": "23.96",
            "first": {
                "x": 419,
                "y": 312
            }
        }, {
            "type": "map",
            "value": data.tqjq,
            "marginY": "23.96",
            "first": {
                "x": 510,
                "y": 312
            }
        },{
            name: data.time,
            "x": 386,
            "y": 1070
        }
    ]
}

function setting(name, x, y, size = 16) {
    return {name: name, x: x, y: y, size: size}
}

export {page1}
/* jshint ignore : end */