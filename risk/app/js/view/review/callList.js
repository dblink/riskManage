/* jshint ignore : start */
import React, {Component} from 'react';
import {getMessage} from '../../config/infoConfig';
import {inter} from '../../config/interface';
//import json from '../../../json/WeChat';
import setting from '../../../json/message.json';
import {formatPB} from './formatPB';
import {format} from './format';
import { ExcelTable } from '../../module/table';

import {MaterialFlatButton as FlatButton} from '../../module/buttons';
import {MaterialTextField as Input} from '../../module/input/input';
import {FormBlock} from '../../module/form/formBlock';
import {inputCode, getTaskState} from '../../config/applyConfig';

class Telephone extends Component {
    constructor(props) {
        super(props);
        inter.getMessage.data.id = this.props.appId;
        this.state = {
            data: "",
            error:{},
            input:{
                state : true,
                chinese: "提交",
            },
            inputCode:{
                code: ""
            },
            inputError: {
                code: ""
            }
        }

        getMessage((data) => {
            //console.log(1);
            if(data.error){
                this.setState({data: data.error});
                return;
            }
            
            if(data.errorCode === 1){
                console.log(data);
                this.setState({error: data});
                return;
            }
            let json = {};
            /* Object.keys(data).map((sub) => {
                json[sub] = format(data[sub], setting[sub]);
            }) */
            //console.log(data);
            json = format(data, setting);
            console.log(json);
            this.setState({data: json});
        });
        this.changeInput = this.changeInput.bind(this);
        this.createTaskCallBack = this.createTaskCallBack.bind(this);
        this.sendInput = this.sendInput.bind(this);
    }

  /*   shouldComponentUpdate(nextProps, nextState){
        return nextState.data !== this.state.data
    } */

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
                {
                    return value && <a href={value}>点击跳转至链接</a> || "无"
                }
            case "cover":
            case "headImgPath":
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
                    return value === 1
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
                    return value === 0 && "个人号" || "非公众号"
                }
            default:
                {
                    return value || "无"
                }
        }

    }

    showDom(line) {
        /* console.log(line); */
        if(line.data.setting){
            return <ExcelTable data={line.data.data} setting = {line.data.setting} firstData= {{name: "标题", attr:"no"}}/>
        }
        return line
            .data
            .map((e) => {
               /*  if(e.setting){
                    console.log(e.setting);
                    //return <ExcelTable data={e.data} setting = {e.setting} firstData= {{name: "标题", attr:"no"}}/>
                }else{ */
                    return <div style={{"display":"inline-block","vertical-align":"top"}} className="text-center">
                        <div className="listTitle">{e.title}</div>
                        <div  >
                            {this.showData(e)}
                        </div>
                    </div>
                /* } */
                /* return <div style={{"display":"inline-block","vertical-align":"top"}} className="text-center">
                    <div className="listTitle">{e.title}</div>
                    <div  >
                        {this.showData(e)}
                    </div>
                </div> */
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
                        data = <div style={{"white-space": "nowrap", "overflow": "auto","max-width": "1024px"}} > {this.showDom(e)} </div>;
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

    changeInput(name, value){
        var code = this.state.inputCode;
        code.code = value;
        this.setState({inputCode: code});
    }

    createTaskCallBack(data){
        if(!data.errorCode){
            alert("获取成功！");
            getMessage((data) => {
                //console.log(1);
                let json = {};
                /* Object.keys(data).map((sub) => {
                    json[sub] = format(data[sub], setting[sub]);
                }) */
                //console.log(data);
                json = format(data, setting);
                //console.log(json);
                this.setState({data: json, error: {}});
            })
            return;
        }else{
            switch(parseInt(data.errorCode)){
                case 1: { //如果错误码为1，显示输入验证码
                    let _input = this.state.input;
                    
                    _input.dialog = true;
                    _input.state = true;
                    this.setState({ //打开dialog
                        input: _input,
                        src: data.src
                    });
                    break;
                }
                case 2: { //如果错误码为2, 次数大于3次， 直接提示error
                    if(this.state.times > 3){
                        //console.log(data.error);
                        alert(data.error);
                        let _input = this.state.input;
                        let _action = this.state.action;
                        _input.dialog = false;
                        _input.state = false;
                        _action.state = true;
                        _action.chinese = "重新验证";
                        this.setState({ //关闭dialog，“验证”可以点
                            input: _input,
                            action: _action,
                            times: 0
                        })
                        return;
                    }
                    this.setState({
                        times : this.state.times + 1
                    }, ()=>{
                        let _this = this;
                        setTimeout(function() { //每两秒请求一次
                            getTaskState(_this.createTaskCallBack);
                        }, 5000);
                    })
                    break;
                    
                }
                case 3: {
                    alert(data.error);
                    let _input = this.state.input;
                    let _action = this.state.action;
                    //_input.dialog = false;
                    _input.state = false;
                    /* _action.state = true;
                    _action.chinese = "重新验证" */
                    this.setState({ //关闭dialog， “验证”可以点
                        input: _input,
                        times: 0
                    })
                    break;
                }
                default: {
                    alert(data);
                }
            }
        }
    }

    sendInput(){ //验证码请求
        if(!this.state.input.state){
            return;
        }
        inter.InputCode.data.id = this.state.error.id;
        inter.GetTaskState.data.id = this.state.error.id;
        inter.InputCode.data.code = this.state.inputCode.code;
        let _input = this.state.input;
        _input.state = false;
        _input.chinese = "请求中……";
        this.setState({
            input: _input
        }, ()=>{
            inputCode((data)=>{
                if(data === 0){
                    getTaskState(this.createTaskCallBack)
                }
            }); //callback 判断
        })
    }

    render() {
        return (
            <div>
                <div className="data-title">电话详单</div>
                {console.log(this.state.error)}
                {this.state.error.errorCode === 1 && <div>{this.state.error.src && <img src={this.state.error.src} />} 
                    <FormBlock tip='验证码'>
                        <Input
                            placeholder="手机验证码"
                            floatHolder="手机验证码"
                            type="tel"
                            value={this.state.inputCode.code}
                            fullWidth={true}
                            errorText={this.state.inputError.code}
                            onChange={(e) => this.changeInput('code', e.currentTarget.value, "inputCode")} />
                    </FormBlock>
                    <FlatButton label={this.state.input.chinese} onClick={this.sendInput}/>
                </div>}

                <div
                    className="clear-both"
                    style={{
                    "font-size": "14px"
                }}>
                    {/* formatPB(data, setting, this.callback) */}
                    {/* console.log(data, setting) */}
                      { this.state.data && typeof this.state.data !=="string" && this.state.data.map((line) => (
                        <div className="clear-both">
                            <div
                                style={{
                                "text-align": "center",
                                "width": "100%",
                                "margin": "20px 0"
                            }}>{line.title}</div>
                            { this.showDom(line) }
                        </div>
                    ))}
                    {
                        this.state.data && typeof this.state.data === "string" && this.state.data
                    }
                    {/* this.state.data && Object
                        .keys(this.state.data)
                        .map((data) => {
                            console.log(data, setting[data]);
                            return FormatList({data: data, setting: setting[data], child: this.list})
                        }) */}
                </div>
            </div>
        );
    }
}

export {Telephone};

/* jshint ignore : end */