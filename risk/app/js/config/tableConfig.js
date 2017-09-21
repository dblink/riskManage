//用户信息表设
/* jshint ignore : start */
import React, {Component} from 'react';
import {moneyFormat} from '../module/dataFormat';
import dataName from '../../json/dataName.json';
import typeName from '../../json/typeName';
import {runRequest} from '../module/reuqest';
import {inter} from './interface';
import {getCompany} from './itemConfig';
import {getValue} from './dataConfig';
import option from '../../json/option.json'

const json = function () {
    return {
        employeeListTableSetting: (() => {
            let _data = inter.getEmployeesList.callback.data[0];
            let json = {};
            Object
                .keys(_data)
                .map((e) => {
                    _data[e] = e;
                });
            return [
                {
                    title: "员工名",
                    attr: _data.Name,
                    input: true,
                    className: "block-2-20"
                }, {
                    title: "手机号",
                    attr: _data.Mobile,
                    input: true,
                    className: "block-2-20"
                }, {
                    title: "公司",
                    attr: _data.Company,
                    item: inter.getCompany.addAllData,
                    format(data, attr) {
                        let callback = inter.getCompany.callback;
                        for (let i = 0; i < callback.length; i++) {
                            if (callback[i].value === data[attr]) {
                                return callback[i].primaryText;
                            }
                        }
                    },
                    className: "block-2-10"
                }, {
                    title: "职位",
                    attr: _data.RoleName,
                    className: "block-2-10"
                }, {
                    title: "是否离职",
                    attr: _data.Dismission,
                    className: "block-2-10",
                    format(data, attr) {
                        let dismission = data[attr]
                            ? <span className="wrong-color">是</span>
                            : <span className="success-color">否</span>;
                        return dismission
                    }
                }, {
                    title: "操作",
                    attr: _data.Id,
                    className: "block-2-20",
                    format: (data) => {
                        return <span>
                            <a className='href-color' data-show="dismission" data-id={data.Id}>离职</a>&nbsp;
                            <a
                                className='href-color'
                                data-show="employee"
                                data-package={JSON.stringify(data)}>修改</a>
                        </span>
                    },
                    click: "operate"
                }
            ]
        }).call(this),
        //申请列表
        applicationListTableSetting: ((company) => {
            let _data = inter.getApplicationList.callback.data[0];
            let json = {};
            Object
                .keys(_data)
                .map((e) => {
                    _data[e] = e;
                });
            return [
                {
                    title: "照片",
                    attr: _data.BorrowName,
                    className: "block-2-5",
                    format(data, attr) {
                        return <a className="href-color small-font" 
                            data-operate="addImage" data-appid={data.ID}
                        >
                            增加
                        </a>
                    },
                    click: "operate"
                }, {
                    title: "申请时间",
                    attr: "StartTime",
                    className: "block-2-10",
                    format: (data, attr) => {
                        let state = data.State <= 3 && getValue().Role === 10004;
                        return <a
                            className={state && "href-color" || ""}
                            data-operate={state
                            ? "changeTime"
                            : ""}
                            data-time={data[attr].replace(/T.*/, "")}
                            data-appid={data.ID}>{data[attr].replace(/T.*/, "")}</a>
                    },
                    click: "operate"
                }, {
                    title: "申请金额",
                    attr: _data.ApplyMoney,
                    className: "block-2-10"
                }, {
                    title: "申请周期",
                    attr: _data.ApplyTerm,
                    className: "block-2-5"
                }, {
                    title: "用户名",
                    attr: _data.Name,
                    className: "block-2-10",
                    input: true,
                    format(data, attr) {
                        return <a className='href-color' data-operate="review" data-appid={data.ID}>{data[attr] || "无"}</a>
                    },
                    click: "operate"
                }, {
                    title: "手机号",
                    attr: _data.Mobile,
                    className: "block-2-10",
                    input: true,
                    format(data, attr) {
                        return data[attr] || "无"
                    }
                }, {
                    title: "所属公司",
                    attr: _data.Company,
                    className: "block-2-10",
                    item: inter.getCompany.callback,
                    format(data, attr) {
                        let callback = inter.getCompany.callback;
                        for (let i = 0; i < callback.length; i++) {
                            if (callback[i].value === data[attr]) {
                                return callback[i].primaryText;
                            }
                        }
                    }
                }, {
                    title: "业务员",
                    attr: _data.EmpName,
                    className: "block-2-10"
                }, {
                    title: "终审借款金额",
                    attr: _data.FinalMoney,
                    className: "block-2-5",
                    format(data, attr) {
                        let state = data.State === 3 && getValue().Role === 10001;
                        return <a
                            className={state
                            ? "href-color"
                            : ""}
                            data-appid={data.ID}
                            data-money={data[attr]}
                            data-operate={state
                            ? "changeMoney"
                            : ""}>{data[attr]}</a>
                    },
                    click: "operate"
                }, {
                    title: "终审周期",
                    attr: _data.FinalTerm,
                    className: "block-2-5",
                    format(data, attr) {
                        let state = data.State === 3 && getValue().Role === 10001;
                        return <a
                            className={state
                            ? "href-color"
                            : ""}
                            data-appid={data.ID}
                            data-term={data[attr]}
                            data-operate={state
                            ? "changeFinalTerm"
                            : ""}>{data[attr]}</a>
                    },
                    click: "operate"
                }, {
                    title: "状态",
                    attr: _data.State,
                    className: "block-2-10",
                    item: option.applicationState,
                    format(data, attr) {
                        switch (data[attr]) {
                            case 0:
                                {
                                    return '待提交'
                                }
                            case 1:
                                {
                                    return '申请中'
                                }
                            case 2:
                                {
                                    return '拒绝'
                                }
                            case 3:
                                {
                                    return '待生成'
                                }
                            case 4:
                                {
                                    return '已生成合同'
                                }
                        }
                    }
                }, {
                    title: "操作",
                    attr: _data.Id,
                    className: "block-2-10",
                    format: (data, attr) => {
                        return <span>
                            {data.State === 4 && <a className='href-color' data-operate="print" data-appid={data.ID}>查看合同</a>}
                            {data.State === 3 && <a className='href-color' data-operate="set" data-appid={data.ID}>生成合同</a>}
                            {data.State < 2 && <a className='href-color' data-operate="review" data-appid={data.ID}>审核信息</a>}
                        </span>
                    },
                    click: "operate"
                }
            ]
        }).call(this),
        reviewList: (() => {
            let _data = inter.getReviewList.callback[0];
            let json = {};
            Object
                .keys(_data)
                .map((e) => {
                    _data[e] = e;
                });
            return [
                {
                    title: "姓名",
                    attr: _data.Name,
                    input: true,
                    className: "block-2-10"
                }, {
                    title: "手机号",
                    attr: _data.Mobile,
                    input: true,
                    className: "block-2-20"
                }, {
                    title: "申请金额",
                    attr: _data.Money,
                    className: "block-2-20"
                }, {
                    title: "申请周期",
                    attr: _data.Term,
                    className: "block-2-10"
                }, {
                    title: "地区",
                    attr: _data.Area,
                    className: "block-2-10",
                    item: inter.getCompany.callback,
                    format(data, attr) {
                        let callback = inter.getCompany.callback;
                        for (let i = 0; i < callback.length; i++) {
                            if (callback[i].value === data[attr]) {
                                return callback[i].primaryText;
                            }
                        }
                    }
                }, {
                    title: "开始时间",
                    attr: _data.StartTime,
                    className: "block-2-10",
                    format(data, attr) {
                        return data[attr].replace(/T.*/g, '');
                    }
                }, {
                    title: "操作",
                    attr: _data.ApplyID,
                    className: "block-2-20",
                    format(data) {
                        return <a
                            data-applyId={data.ApplyID}
                            data-postId={data.DetailInfoID}
                            className="href-color">审核</a>
                    },
                    click: "operate"
                }
            ]
        }).call(this),
        //合同列表
        loanList: (() => {
            let _data = inter.getContarctList.callback[0];
            let json = {};
            Object
                .keys(_data)
                .map((e) => {
                    _data[e] = e;
                });
            return [
                {
                    title: "姓名",
                    attr: _data.BorrowName,
                    input: true,
                    className: "block-2-10",
                    format(data, attr) {
                        return <a
                            data-empId={data.Id}
                            data-appid={data.ApplyId}
                            data-page="userMessage"
                            className="href-color">{data[attr]}
                        </a>
                    },
                    click: "operate"
                }, {
                    title: "手机号",
                    attr: _data.Mobile,
                    input: true,
                    className: "block-2-10"
                }, {
                    title: "金额（元）",
                    attr: _data.ContarctMoney,
                    className: "block-2-10"
                }, {
                    title: "服务费（元）",
                    attr: "ServiceMoney",
                    className: "block-2-5"
                }, {
                    title: "放款",
                    attr: "RMoney",
                    className: "block-2-5"
                }, {
                    title: "批款",
                    attr: "Money",
                    className: "block-2-5"
                }, {
                    title: "周期",
                    attr: _data.Term,
                    className: "block-2-5"
                }, {
                    title: "地区",
                    attr: _data.Area,
                    className: "block-2-10",
                    item: inter.getCompany.callback,
                    format(data, attr) {
                        let callback = inter.getCompany.callback;
                        for (let i = 0; i < callback.length; i++) {
                            if (callback[i].value === data[attr]) {
                                return callback[i].primaryText;
                            }
                        }
                    }
                }, {
                    title: "开始时间",
                    attr: _data.StartTime,
                    className: "block-2-10",
                    format: (data, attr) => {
                        let state = data.State === 0  && getValue().Role === 10008;
                        return <a
                            className={state && "href-color" || ""}
                            data-page={state
                            ? "changeTime"
                            : ""}
                            data-time={data[attr].replace(/T.*/, "")}
                            data-empid={data.Id}>{data[attr].replace(/T.*/, "")}</a>
                    },
                    click: "operate"
                }, {
                    title: "借款状态",
                    attr: _data.State,
                    className: "block-2-10",
                    item: option.loanStateItem,
                    format(data, attr) {
                        let state = data[attr];
                        return option.loanState[state];
                    }
                }, {
                    title: "操作",
                    attr: _data.ApplyID,
                    className: "block-2-20",
                    format(data) {
                        return <p>
                                {data
                                    .State
                                    .toString() === "0" && (getValue().ID === 10127 || getValue().ID === 10106) && <a data-empId={data.Id} data-page="daikou" className="href-color">系统付</a>}
                                    &nbsp;&nbsp;
                                {
                                    data.State.toString() === "0" && (getValue().Role === 10008) && <a data-empId={data.Id} data-name={data.BorrowName} data-page="delete" className="href-color">删除</a>
                                }
                                {data
                                    .State
                                    .toString() !== "0" && data.State.toString() !== "6" && <a
                                        data-empId={data.Id}
                                        data-appid={data.ApplyId}
                                        data-page="showLoanList"
                                        className="href-color">还款表
                                    </a>}
                                    &nbsp;&nbsp;
                                {(data
                                    .State
                                    .toString() === "1" 
                                    || data
                                        .State
                                        .toString() === "2")&&  (getValue().Role === 10010 || getValue().Role === 10008) && <a
                                            data-empId={data.Id}
                                            data-appid={data.ApplyId}
                                            data-page="jieqing"
                                            className="href-color">结清
                                        </a>}
                            {data
                                .State
                                .toString() === "0" && (getValue().ID === 10127 || getValue().ID === 10106) && <a data-empId={data.Id} data-page="pDaikou" className="href-color">人工付</a>}
                            &nbsp;&nbsp; 
                            {data.State.toString() !== "6" && <a className = 'href-color' data-page="print" data-appid = {data.ApplyId} > 合同 </a>}
                        </p>
                    },
                    click: "operate"
                }
            ]
        }).call(this),
        loadListOne: (() => {
            return [
                {
                    title: "本金",
                    attr: "Corpus",
                    className: "width-percent-10"
                }, {
                    title: "已还",
                    attr: "RepayMoney",
                    className: "width-percent-10"
                }, {
                    title: "期数",
                    attr: "Times",
                    className: "width-percent-5"
                }, {
                    title: "总金额",
                    attr: "TotalMoney",
                    className: "width-percent-10 phone-percent-20"
                }, {
                    title: "还款日期",
                    attr: "RepayTime",
                    className: "width-percent-10 phone-percent-10",
                    format: (data, attr) => {
                        let time = data[attr].replace(/T.*/g, "");
                        return <span className="small-font">{time}</span>
                    }
                }, {
                    title: "地区",
                    attr: "Company",
                    className: "width-percent-10",
                    format(data, attr) {
                        let callback = inter.getCompany.callback;
                        for (let i = 0; i < callback.length; i++) {
                            if (callback[i].value === data[attr]) {
                                return callback[i].primaryText;
                            }
                        }
                    }
                }, {
                    title: "状态",
                    attr: "State",
                    className: "width-percent-5",
                    format: (data, attr) => {
                        let className;
                        let _state = "";
                        switch (data[attr]) {
                            case 0:
                                {
                                    className = "warming-color";
                                    _state = "待还款";
                                    break;
                                }
                            case 1:
                                {
                                    className = "success-color";
                                    _state = "已还款";
                                    break;
                                }
                            case 2:
                                {
                                    className = "wrong-color";
                                    _state = "逾期";
                                    break;
                                }
                            case 3:
                                {
                                    className = "wrong-color";
                                    _state = "划扣失败";
                                    break;
                                }
                            case 4: {
                                    className = "wrong-color";
                                    _state = "欺诈";
                                    break;
                            }
                            default:
                                {
                                    _state = "未知状态";
                                    break;
                                }
                        }
                        return <span className={className}>{_state}</span>
                    }
                }, {
                    title: "确认时间",
                    attr: "ConfirmTime",
                    className: "width-percent-10",
                    format: (data, attr) => {
                        return !data[attr]
                            ? "无"
                            : data[attr].replace(/T.*/g, "");
                    }
                }, {
                    title: "确认人",
                    attr: "EmpName",
                    className: "width-percent-10",
                    format: (data, attr) => {
                        return !data[attr]
                            ? "无"
                            : data[attr]
                    }
                }, {
                    title: "备注",
                    attr: "Remark",
                    className: "width-percent-10",
                    format: (data, attr) => {
                        return !data[attr]
                            ? "无"
                            : data[attr]
                    }
                }, {
                    title: "划扣",
                    attr: "State",
                    className: "width-percent-10",
                    format: (data, attr) => {
                        return data[attr].toString() === "1"
                            ? "已还款"
                            : <p>
                                <span
                                    className="href-color pointer"
                                    data-row={JSON.stringify(data)}
                                    data-show="autoHK">系统</span>
                                &nbsp;&nbsp; {getValue().Role === 10010 || getValue().Role === 10008 && <span
                                    className="href-color pointer"
                                    data-row={JSON.stringify(data)}
                                    s
                                    data-show="manHK">人工</span>}
                            </p>
                    },
                    click: "operate"
                }
            ]
        }).call(this),
        recode: (() => {
            return [
                {
                    title: "审核金额",
                    attr: "ApproveMoney",
                    className: "width-percent-10",
                    format: (data, attr) => {
                        return data[attr] || "无"
                    }
                }, {
                    title: "审核人",
                    attr: "ApproveName",
                    className: "width-percent-10",
                    format: (data, attr) => {
                        return data[attr] || "无"
                    }
                }, {
                    title: "期数",
                    attr: "Term",
                    className: "width-percent-5",
                    format: (data, attr) => {
                        return data[attr] || "无"
                    }
                }, {
                    title: "确认时间",
                    attr: "ConfirmTime",
                    className: "width-percent-10",
                    format: (data, attr) => {
                        return data[attr] && data[attr].replace(/T.*/, "") || "无";
                    }
                }, {
                    title: "状态",
                    attr: "State",
                    format: (data, attr) => {
                        switch (data[attr].toString()) {
                            case "0":
                                return "通过"
                            case "1":
                                return "拒绝"
                            case "-1":
                                return "待审核"
                        }
                    },
                    className: "width-percent-10"
                }, {
                    title: "备注",
                    attr: "Reamrk",
                    className: "width-percent-30"
                }
            ]
        }).call(this),
        //交易明细表
        tradingManager: (() => {
            return [
                {
                    title: "金额",
                    attr: "Money",
                    className: "width-percent-20",
                    format(data, attr) {
                        if (data.State.toString() === "0") {
                            return <span className="wrong-color">{data[attr]}</span>
                        } else {
                            return <span className="success-color">
                                {data[attr]}
                            </span>
                        }

                    }
                }, {
                    title: "客户",
                    attr: "CustomerName",
                    className: "width-percent-10"
                }, {
                    title: "公司",
                    attr: "Company",
                    className: "width-percent-10",
                    item: inter.getCompany.callback,
                    format(data, attr) {
                        let callback = inter.getCompany.callback;
                        for (let i = 0; i < callback.length; i++) {
                            if (callback[i].value === data[attr]) {
                                return callback[i].primaryText;
                            }
                        }
                    }
                }, {
                    title: "操作人姓名",
                    attr: "Name",
                    className: "width-percent-20",
                    format: (data, attr) => {
                        return data[attr] || "无";
                    }
                }, {
                    title: "时间",
                    attr: "Time",
                    className: "width-percent-20",
                    format: (data, attr) => {
                        return data[attr].replace(/T.*/, "") || "无"
                    }
                }, {
                    title: "状态",
                    attr: "State",
                    className: "width-percent-20",
                    item: option.TradingState,
                    format: (data, attr) => {
                        switch (data[attr].toString()) {
                            case "0":
                                {
                                    return "放款"
                                }
                            case "1":
                                {
                                    return "已还款"
                                }
                            case "2":
                                {
                                    return "逾期"
                                }
                            case "4":
                                {
                                    return "催款结清"
                                }
                            case "6":
                                {
                                    return "正常结清"
                                }
                            case "7":
                                {
                                    return "划扣"
                                }
                            case "8":
                                {
                                    return "开销"
                                }
                            case "10":
                                {
                                    return "上门费"
                                }
                        }
                    }
                }
            ]
        }).call(this),
        //还款计划表
        repaymentList: (() => {
            return [
                {
                    title: "姓名",
                    attr: "BorrowName",
                    input: true,
                    className: "width-percent-5"
                }, {
                    title: "手机号",
                    attr: "Mobile",
                    input: true,
                    className: "width-percent-10"
                }, {
                    title: "已还",
                    attr: "RepayMoney",
                    className: "width-percent-10"
                }, {
                    title: "期数",
                    attr: "Times",
                    className: "width-percent-5"
                }, {
                    title: "总金额",
                    attr: "TotalMoney",
                    className: "width-percent-10"
                }, {
                    title: "还款日期",
                    attr: "RepayTime",
                    className: "width-percent-10",
                    format: (data, attr) => {
                        let time = data[attr].replace(/T.*/g, "");
                        return <span className="small-font">{time}</span>
                    }
                }, {
                    title: "地区",
                    attr: "Company",
                    className: "width-percent-10",
                    item: inter.getCompany.noAllData,
                    format(data, attr) {
                        let callback = inter.getCompany.callback;
                        for (let i = 0; i < callback.length; i++) {
                            if (callback[i].value === data[attr]) {
                                return callback[i].primaryText;
                            }
                        }
                    }
                }, {
                    title: "状态",
                    attr: "State",
                    className: "width-percent-10",
                    item: option.repaymentState,
                    format: (data, attr) => {
                        let className;
                        let _state = "";
                        switch (data[attr]) {
                            case 0:
                                {
                                    className = "warming-color";
                                    _state = "待还款";
                                    break;
                                }
                            case 1:
                                {
                                    className = "success-color";
                                    _state = "已还款";
                                    break;
                                }
                            case 2:
                                {
                                    className = "wrong-color";
                                    _state = "逾期";
                                    break;
                                }
                            case 3:
                                {
                                    className = "wrong-color";
                                    _state = "划扣失败";
                                    break;
                                }
                            case 4:
                                {
                                    className = "wrong-color";
                                    _state = "欺诈";
                                    break;
                                }
                            default:
                                {
                                    _state = "未知状态";
                                    break;
                                }
                        }
                        return <span className={className}>{_state}</span>
                    }
                }, {
                    title: "确认时间",
                    attr: "ConfirmTime",
                    className: "width-percent-10",
                    format: (data, attr) => {
                        return !data[attr]
                            ? "无"
                            : data[attr].replace(/T.*/g, "");
                    }
                }, {
                    title: "确认人",
                    attr: "EmpName",
                    className: "width-percent-10",
                    format: (data, attr) => {
                        return !data[attr]
                            ? "无"
                            : data[attr]
                    }
                }, {
                    title: "划扣",
                    attr: "Id",
                    className: "width-percent-10",
                    format: (data, attr) => {
                        return data
                            .State
                            .toString() === "1"
                            ? "已还款"
                            : <p>
                                <span
                                    className="href-color pointer"
                                    data-row={JSON.stringify(data)}
                                    data-show="autoHK">系统</span>
                                &nbsp;&nbsp; {getValue().Role === 10010 || getValue().Role === 10008 && <span
                                    className="href-color pointer"
                                    data-row={JSON.stringify(data)}
                                    s
                                    data-show="manHK">人工</span>}
                            </p>
                    },
                    click: "operate"
                }
            ]
        }).call(this),
        //门店汇总
        /* citySum: (()=>{
            return [{
                {
                    title: "总行款户数",
                    attr: "BorrowName",
                    className: "width-percent-5"
                },{
                    title: "总逾期户数",
                    attr: "BorrowName",
                    className: "width-percent-10"
                },{
                    title:"4期之内逾期",
                    attr: "BorrowName",
                    className: "width-percent-10"
                },{
                    title:"户数逾期率",
                    attr: "BorrowName"
                },{
                    title: "总放款金额（元）",
                    attr: "BorrowName"
                },{
                    title: "所有客户的剩余本金",
                    attr: "BorrowName"
                },{
                    title: "剩余本金逾期",
                    attr: "BorrowName"
                },{
                    title: "总放款金额（元）",
                    attr: "BorrowName"
                },{
                    title: "总放款金额（元）",
                    attr: "BorrowName"
                },{
                    title: "总放款金额（元）",
                    attr: "BorrowName"
                }
            }]
        }).call(this) */
    }
}

const dataTableConfig = (titleName, number) => {
    let json,
        end,
        array;
    array = [];
    end = 0;
    let _obj = dataName[titleName];
    if (!_obj) 
        return;
    for (var key of Object.keys(_obj)) {
        if (number === end) {
            break;
        }
        json = {
            title: _obj[key],
            attr: key,
            className: "block-2-20"
        }
        array.push(json);
        end += 1;
    }
    /*    Object.keys(_obj).map((key)=>{

    });*/

    return array
}

const getEmployeeList = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    let data = inter.getEmployeesList.data;
    data.token = _value.Token;
    runRequest(inter.getEmployeesList, (e) => {
        callback(e);
    })
}

const getApplicationList = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    let data = inter.getApplicationList.data;
    data.token = _value.Token;
    runRequest(inter.getApplicationList, (data) => {
        callback(data);
    })
}

const getReviewList = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    let _data = inter.getReviewList.data;
    _data.token = _value.Token;
    _data.company = _data.company !== "string" && _data.company || "-1";
    _data.mobile = _data.mobile !== "string" && _data.mobile || "";
    _data.name = _data.name !== "string" && _data.name || "";
    _data.pageIndex = _data.pageIndex !== "string" && _data.pageIndex || "1";
    _data.pageSize = _data.pageSize !== "string" && _data.pageSize || "10";
    _data.state = _data.state !== "string" && _data.state || "-1";
    runRequest(inter.getReviewList, (data) => callback(data));
}

const getLoanList = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    let _data = inter.getContarctList.data;
    _data.token = _value.Token;
    /* _data.company = _data.company !== "string" && _data.company || "";
    _data.mobile = _data.mobile !== "number" && _data.mobile || "";
    _data.name = _data.name !== "string" && _data.name || "";
    _data.pageIndex = _data.pageIndex !== "string" && _data.pageIndex || "1";
    _data.pageSize = _data.pageSize !== "string" && _data.pageSize || "10";
    _data.state = _data.state !== "string" && _data.state || "-1"; */
    runRequest(inter.getContarctList, (data) => callback(data));
}

const getRecode = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    inter.getRecode.data.token = _value.Token;
    runRequest(inter.getRecode, (data) => callback(data));
}

const getTradingManagerList = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    let _data = inter.getTradingManagerList.data;
    _data.token = _value.Token;
    runRequest(inter.getTradingManagerList, (data) => callback(data));
}

const getRepaymentList = (callback) => {
    let _value = getValue();
    if (!_value) {
        return false;
    }
    let _data = inter.getRepaymentList.data;
    _data.token = _value.Token;
    runRequest(inter.getRepaymentList, (data) => callback(data));
}

export {
    dataTableConfig,
    getEmployeeList,
    getApplicationList,
    getReviewList,
    getLoanList,
    getRecode,
    getTradingManagerList,
    getRepaymentList,
    json
}

/* jshint ignore : end */