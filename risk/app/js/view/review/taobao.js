/* jshint ignore : start */
import React, {Component} from 'react';
import {getTaobao} from '../../config/infoConfig';
import {inter} from '../../config/interface';
import json from '../../../json/WeChat';
import {FormatList} from './formatList';
import {format} from './format';
import { ExcelTable } from '../../module/table';

class Taobao extends Component {
    constructor(props) {
        super(props);
        inter.getTaobao.data.id = this.props.appId;
        this.state = {
            taobao: {},
            json: ""
        }
        getTaobao((data)=>{
            if(data.error){
                return;
            }
            this.setState({
                json: format(JSON.parse(data), json.taobaoList)
            });
            console.log(format(JSON.parse(data), json.taobaoList));
        }) 
        this.list = this
            .list
            .bind(this);
        // this.showDom = this.showDom.bind(this); console.log(format(this.state.taobao,
        // json.taobaoList));
        //this.state.json = format(this.state.taobao, json.taobaoList);
    }

    formatData(type, value) {
        switch (type) {
            case "bankaccType":
                {
                    return value === "1"
                        ? "借记卡"
                        : "信用卡"
                }
            case "idType":
                {
                    return value === "1"
                        ? "身份证"
                        : value
                }
            case "tradeDetailUrl":
            case "url":
            case "itemUrl":
                {
                    return value && <a href={value} className="href-color">点击跳转至链接</a> || "无"
                }
            case "cover":
            case "headImgPath":
            case "itemPic":
                {
                    return <img
                        src={value}
                        style={{
                        width: "50px"
                    }}/>
                }
            case "isOverdue":
            case "isFirstLoan":
            case "isActivated":
            case "overDueFlag":
            case "payOffFlag":
            case "pmtInd":
            case "active":
            case "starFriend":
            case "isGroup":
            case "isOwner":
            case "isCollection":
            case "statues":
            case "isBlack":
            case "isTopContact":
            case "isMuted":
            case "isContact":
            case "hasContacted":
            case "snsNotLookOther":
            case "snsOtherNotLook":
                {
                    return value === "1"
                        ? "是"
                        : "否"
                }
            case "sex":
                {
                    switch (value) {
                        case "2":
                            {
                                return "女"
                            }
                        case "1":
                            {
                                return "男"
                            }
                        default:
                            {
                                return "未知"
                            }
                    }
                }
            case "verifyFlag":
                {
                    return value === "0" && "个人号" || "非公众号"
                }
            default:
                {
                    return value || "无"
                }
        }

    }

    list(props) {
        if (typeof props.value === "object") {
            return (
                <div
                    style={{
                    width: "100%",
                    float: "left",
                    "text-align": "center"
                }}>
                    <div style={{
                        margin: "10px 0"
                    }}>{props.chinese}</div>
                    {Object
                        .keys(props.setting)
                        .map((value) => {
                            let _type = typeof props.setting[value];
                            if (_type === "object") {
                                let _json = {};
                                let _value = {};
                                _json[value] = props.setting[value];
                                _value[value] = props.value;
                                return FormatList({data: _value, setting: _json, child: this.list})
                            } else {
                                return (
                                    <div
                                        style={{
                                        float: "left"
                                    }}>
                                        <div className="listTitle">
                                            {props.setting[value]}
                                        </div>
                                        {props
                                            .value
                                            .map((data) => {
                                                return <div className="listContent">{this.formatData(value, data[value])}</div>
                                            })}
                                    </div>
                                )
                            }

                        })}</div>
            )
        } else {
            return (
                <div
                    style={{
                    float: "left"
                }}
                    className="text-center">
                    <div className="listTitle">
                        <span className="listTitleSpan">{props.chinese}</span>
                    </div>
                    <div className="listContent">
                        {this.formatData(props.name, props.value)}
                    </div>
                </div>
            )
        }

    }

    showDom(line) {
        if(line.data.setting){
            return <ExcelTable data={line.data.data} setting = {line.data.setting} firstData= {{name: "标题", attr:"no"}}/>
        }
        return line
            .data
            .map((e) => {
                return <div style={{display:"inline-block"}} className="text-center">
                    <div className="listTitle">{e.title}</div>
                    {this.showData(e)}
                </div>
            })
    }

    showData(e){
        let data;
        switch(typeof e.data){
            case "number":
            case "string": {
                data = <div className="listContent">{this.formatData(e.name, e.data.toString()) }</div>
                break;
            }
            case "object": {
                let _type = typeof e.data[0];
                switch(typeof e.data[0]){
                    case "number":
                    case "boolean":
                    case "string": {
                        data = e.data.map((sub)=><div className="listContent">{this.formatData(e.name, sub.toString())}</div>);
                        break
                    }
                    case "object": {
                        data = this.showDom(e);
                        break;
                    }
                    default:{
                        <div className="listContent">无效字符</div>
                    }
                }
                break;
            }
            default: {
                data = <div className="listContent">无</div>;
            }
        }
        return data;
    }

    render() {
        return (
            <div>
                <div className="data-title">{json.taobaoList.chinese}</div>
                <div
                    className="clear-both"
                    style={{
                    "font-size": "14px"
                }}>
                    {/* console.log(this.state.taobao, json.taobaoList.value) */}
                    {/* FormatList({data: this.state.taobao, setting: json.taobaoList.value, child: this.list}) */}
                    {this.state.json && this.state.json.map((line) => (
                        <div className="clear-both" >
                            <div
                                style={{
                                "text-align": "center",
                                "width": "100%",
                                "margin": "20px 0"
                            }}>{line.title}</div>
                            <div style={{"white-space": "nowrap", "overflow": "auto","max-width": "1024px"}}>
                                { this.showDom(line) }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export {Taobao};

/* jshint ignore : end */