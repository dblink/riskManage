/* jshint ignore : start */
import React, { Component } from 'react';

const tip = {
    "is_name_and_idcard_in_court_black": {
        true: "在法院黑名单",
        false: "不在法院名单"
    },
    "is_name_and_idcard_in_finance_black": {
        true:"在金融机构黑名单",
        false: "不在金融机构黑名单"
    }
}

const t = {
    "name": " 姓名",
    "idcard": " 身份证号",
    "name_from_custom": "客户提供的姓名",
    "idcard_from_custom": "客户提供的身份证号",
    "mobile": "手机号",
    "gender": "性别",
    "age": "年龄",
    "constellation": "星座",
    "email": "邮箱",
    "address": "通讯地址",
    "native_place": "籍贯",
    "live_address": "手机号码归属地",
    "work_address": "居住地址,工作地址"
}

class UserInfo extends Component {
    render() {
        return (
            <div>
                <div>用户基本信息检测</div>
                <div>姓名：{this.props.name}</div>
                <div>
                    身份证：{this.props.cardId}
                    {this.props.tip.map((e)=>{
                        return <span>{tip[e][this.props.tip[e]]}</span>
                    })}
                    </div>
                <div>
                    手机号: {this.props.mobile}；运营商: {this.props.operator}
                </div>
            
                <div>
                    
                </div>
            </div>
        );
    }
}

export {UserInfo};