/* jshint ignore :start */
import {split} from '../split';
/**
 *
 * @param {object} data
 */
const page1 = (data) => {
    return {
        fp: {
            name: data.fp,
            x: 160,
            y: 142
        },
        fpCard: {
            name: data.fpCard,
            x: 100,
            y: 175
        },
        sp: {
            name: data.sp,
            x: 163,
            y: 212
        },
        spCard: {
            name: data.spCard,
            x: 100,
            y: 250
        },
        spAddress: {
            name: data.spAddress,
            x: 91,
            y: 285
        },
        spMobile: {
            name: data.spMobile,
            x: 133,
            y: 324
        },
        tp: {
            name: data.tp,
            x: 171,
            y: 359
        },
        tpAddress: {
            name: data.tpAddress,
            x: 90,
            y: 394
        },
        fop: {
            name: data.fop,
            x: 163,
            y: 429
        },
        fopAddress: {
            name: data.fopAddress,
            x: 90,
            y: 464
        }
    }
}

const page2 = (data) => {
    return {
        //总金额
        sumMoney: setting(data.sumMoney, 194, 111),
        //大写总金额
        sumbig: setting(split(data.sumMoney).big, 274, 147),
        //分单位写
        sumSplit: {
            type: "map",
            marginX: "30",
            first: {
                x: 327,
                y: 111
            },
            value: split(data.sumMoney).array
        },
        dot14: setting(data.serviceMoney, 260, 329),
        backMoney: setting(data.backMoney, 194, 180),
        backMoneyBig: {
            type: "map",
            marginX: "30",
            first: {
                x: 327,
                y: 180
            },
            value: split(data.backMoney).array
        },
        term: setting(data.term, 216, 212),
        startYear: setting(data.startYear, 203, 246),
        startMonth: setting(data.startMonth, 270, 246),
        startDay: setting(data.startDay, 301, 246),
        endYear: setting(data.endYear, 382, 246),
        endMonth: setting(data.endMonth, 447, 246),
        endDay: setting(data.endDay, 480, 246)
    }
}

const page5 = (data) => {
    return {
        fp: {
            type: "img",
            value: data.fp,
            x: 82,
            y: 338,
            width: 200
        },
        fpTime: {
            name: data.fpTime,
            x: 82,
            y: 410
        },
        sp: {
            name: data.sp,
            x: 82,
            y: 489
        },
        spTime:{
            name: data.spTime,
            x: 82,
            y: 530
        },
        th: {
            name: data.th,
            x: 82,
            y: 609,
        },
        thTime:{
            name: data.thTime,
            x: 82,
            y: 650
        },
        fop:{
            name: data.fop,
            x: 82,
            y: 729
        },
        fopTime:{
            name: data.fopTime,
            x: 82,
            y: 770
        },
        jfzhang: {
            type:"img",
            value: data.jinfuzhang,
            x: 50,
            y: 543,
            width: 500
        },
        phzhang: {
            type: "img",
            value: data.puhuizhang,
            x: 144,
            y: 653,
            width: 500
        }
    }
}

function setting(name, x, y, size = 16) {
    return {name: name, x: x, y: y, size: size}
}

export {page1, page2, page5}
/* jshint ignore :end */