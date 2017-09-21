/* jshint ignore: start */
import React, { Component } from 'react';
import {inter} from '../../../config/interface';
import {getMessage, getLaoLai} from '../../../config/infoConfig';
import {getApplyItemInfo, selectUserMessageByAppid} from '../../../config/applyConfig';
import {BasicInfo} from './basicReport';
import {UserReport} from './userReport';
import {ActiveDegree} from './activeDegree';
import {CostReport} from './costReport';
import option from '../../../../json/option';
import {} from '../../../../css/report.css';

class FullReport extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                error: "载入中，请稍等"
            },
            userMessage: {
                data: ""
            },
            laolai:{}
        }
        this.getUserMessageByAppid = this.getUserMessageByAppid.bind(this);
        this.getMobuileMessage = this.getMobuileMessage.bind(this);
        this.getLaoLaiMessage = this.getLaoLaiMessage.bind(this);
        this.getLaoLaiMessage();
    }

    getUserMessageByAppid(){
        inter.selectUserMessageByAppid.data.applyId = this.props.appId;
        selectUserMessageByAppid((data)=>{
            if(data.error){
                alert(data.error);
                return;
            }
            this.setState({
                userMessage: data
            },this.getMobuileMessage)
        })
    }
    getMobuileMessage(){
        inter.getMessage.data.id = this.props.appId;
        getMessage((data)=>{
            if(!data.error){
                let _data = data.basic_info_check_items;
                _data = this.checkFormat(_data);
                data.basic_info_check_items = _data;
            }
            this.setState({
                data: data
            })
        })
    }
    getLaoLaiMessage(){
        inter.getLaoLai.data.id = this.props.appId;
        getLaoLai((data)=>{
            this.setState({
                laolai: JSON.parse(data).data
            },()=>{
                this.getUserMessageByAppid();
            })
            
        })
    }

    checkFormat(array){
        var _json = {};
        array.map((e)=>_json[e.check_item] = e.result)
        return _json;
    }
    render() {
        let _basic={};
        let _user ={};
        let _active = {};
        let _cost = {}
        if(!this.state.data.error){
            _basic = {
                user_basic_info: this.state.data.user_basic_info,
                basic_info_check_items: this.state.data.basic_info_check_items,
                risk_analysis: this.state.data.friend_circle.risk_analysis,
                data_source: this.state.data.data_source,
                userMessage: this.state.userMessage,
                laolai: this.state.laolai,
                call_contact_detail: this.state.data.friend_circle.call_contact_detail
            };
            _user={
                friend_circle: this.state.data.friend_circle,
                contect: JSON.parse(this.state.userMessage.OtherInfo).contect
            }
            _active = {
                active_degree: this.state.data.friend_circle.active_degree
            }
            _cost = {
                consumption_analysis: this.state.data.friend_circle.consumption_analysis
            }
        }
        return (
            <div>
                {!this.state.data.error && <BasicInfo {..._basic} />}
                {!this.state.data.error && <UserReport {..._user} />}
                {!this.state.data.error && <ActiveDegree {..._active} />}
                {!this.state.data.error && <CostReport {..._cost} />}
                {this.state.data.error && this.state.data.error}
            </div>
        );
    }
}

export {FullReport};