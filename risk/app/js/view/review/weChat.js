/* jshint ignore : start */
import React, {Component} from 'react';
import {getWechatJson} from '../../config/infoConfig';
import {inter} from '../../config/interface';
import json from '../../../json/WeChat';
import {FormatList} from './formatList';
import {format} from './format';

class WeChat extends Component {
    constructor(props) {
        super(props);
        inter.getWechatJson.data.id = this.props.appId;
        this.state = {
            weChatKey: {},
            weBankKey: {}
        }
         getWechatJson((data)=>{
            if(data.error){
                return;
            }
            this.setState({
                weChatKey: JSON.parse(data).weChatKey,
                weBankKey: JSON.parse(data).weBankKey
            });
        }) 
        
        this.list = this.list.bind(this);
    }

    formatData(type, value) {
        switch (type) {
            case "cardType":
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
            case "url":{
                return <a href={value}>点击跳转至链接</a>
            }
            case "cover":
            case "headImgPath":{
                return <img src={value} style={{width: "50px"}} />
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
            case "sex":{
                switch(value){
                    case "2": {
                        return "女"
                    }
                    case "1": {
                        return "男"
                    }
                    default:{
                        return "未知"
                    }
                }
            }
            case "verifyFlag": {
                return value === 0 && "个人号" || "非公众号"
            }
            default:
                {
                    return value
                }
        }

    }

    list(props){
        if(typeof props.value === "object"){
            return (<div style={{width: "100%", float:"left", "text-align": "center"}} >
            <div style={{margin: "10px 0"}}>{props.chinese}</div>
                <div>
                {
                    Object.keys(props.setting).map((value)=>{
                        let _type = typeof props.setting[value];
                        if(_type === "object"){
                            let _json = {};
                            let _value = {};
                            _json[value] = props.setting[value] ;
                            _value[value] = props.value;
                            return FormatList({data:_value, setting: _json, child: this.list})
                        }else{
                            return (<div style={{float:"left"}}>
                            <div className="listTitle">
                                {props.setting[value]}
                            </div>
                            <div data-adata="1">
                                { props.value.map((data)=>{
                                    return <div className="listContent">{ this.formatData(value, data[value]) }</div>
                                })}
                            </div>
                        </div>)
                        }
                        
                    })
                }</div>
            </div>)
        }else{
            return(<div
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
            </div>)
        }
        
    }

    render() {
        return (
            <div>
                <div className="data-title">{json.weBankKey.chinese}</div>
                <div className="clear-both" style={{"font-size": "14px"}}>
                     {FormatList({data:this.state.weBankKey, setting:json.weBankKeyList.value, child: this.list})}
                </div>
                <div className="data-title">{json.weChatKey.chinese}</div>
                <div className="clear-both" style={{"font-size": "14px"}}>
                     {FormatList({data:this.state.weChatKey, setting:json.weChatKeyList.value, child: this.list})}
                </div>
            </div>
        );
    }
}

export {WeChat};

/* jshint ignore : end */