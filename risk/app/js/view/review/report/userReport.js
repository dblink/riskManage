/* jshint ignore: start */
import React, {Component} from 'react';
import {Table} from '../../../module/table';
import option from '../../../../json/option';
import {BlockTwo, FullWidth} from './reportModule';

class UserReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationSetting: [
                {
                    title: "通话地",
                    attr: "city",
                    className: "width-10"
                }, {
                    title: "通话次数",
                    attr: "call_num",
                    className: "width-20"
                }, {
                    title: "通话时长",
                    attr: "call_time",
                    className: "width-20",
                    format(data, attr) {
                        return `${Math.floor(data[attr] / 60)}分钟`;
                    }
                }, {
                    title: "通话号码数",
                    attr: "peer_number_count",
                    className: "width-10"
                }, {
                    title: "主叫次数",
                    attr: "dial_num",
                    className: "width-20"
                }, {
                    title: "被叫次数",
                    attr: "dialed_num",
                    className: "width-20"
                }
            ],
            relationSetting: [
                {
                    title: "对方号码",
                    attr: "peer_number",
                    className: "width-25",
                    format(data, attr){
                        //console.log(props.contect);
                        let relation,
                        name,
                        _contect;
                        _contect = props.contect;
                        relation = "无";
                        name = "无";
                        console.log(_contect);
                        for(let i = 0; i<_contect.length; i++){
                            if(_contect[i].Mobile.toString() === data[attr].toString()){
                                name = _contect[i].Name;
                                relation = option.relationShip[_contect[i].Relation];
                                break;
                            }
                        }
                        return `${data[attr]}[${name}][${relation}]`//标注关系
                    }
                }, {
                    title: "通话地",
                    attr: "city",
                    className: "width-10"
                }, {
                    title: "通话次数",
                    attr: "call_num",
                    className: "width-10"
                }, {
                    title: "通话时长",
                    attr: "call_time",
                    className: "width-15",
                    format(data, attr) {
                        return `${Math.floor(data[attr] / 60)}分钟`;
                    }
                }, {
                    title: "主叫次数",
                    attr: "dial_num",
                    className: "width-20"
                }, {
                    title: "被叫次数",
                    attr: "dialed_num",
                    className: "width-20"
                }
            ],
            riskSetting:[
                {
                    title: "风险类别",
                    attr: "item",
                    className: "width-20",
                    format(data,attr){
                        let _data = data[attr];
                        switch(_data){
                            case "call_credit_card":{
                                return "信用卡电话";
                            }
                            case "call_loan":{
                                return "法院电话";
                            }
                            case "call_collection":{
                                return "催收公司";
                            }
                            case "call_110":{
                                return "110电话";
                            }
                            case "call_120":{
                                return "120电话";
                            }
                        }
                    }
                },{
                    title: "近3月通话次数",
                    attr: "call_num_3m",
                    className: "width-20",
                },{
                    title: "近6月通话次数",
                    attr: "call_num_6m",
                    className: "width-20",
                },{
                    title: "近3月通话时长(分钟)",
                    attr: "call_time_3m",
                    className: "width-20",
                    format(data, attr){
                        return Math.floor(data[attr] / 60)
                    }
                },{
                    title: "近6月通话时长(分钟)",
                    attr: "call_time_6m",
                    className: "width-20",
                    format(data, attr){
                        return Math.floor(data[attr] / 60)
                    }
                }
            ]
        }
    }
    render() {
        let _props = this.props;
        return (
            <div className="report-user-mssage">
                <div className="container letter-spacing-normal white-color text-center report-title red-bg offset-top-20">
                    用户信息检测
                </div>
                
                <BlockTwo title="近3月联系号码数" info={`${_props.friend_circle.friend_num_3m}条`} />
                <BlockTwo title="近6月联系号码数" info={`${_props.friend_circle.friend_num_6m}条`} />
                <BlockTwo title="近3月联系十次以上的号码数" info={`${_props.friend_circle.good_friend_num_3m}条`} />
                <BlockTwo title="近6月联系十次以上的号码数" info={`${_props.friend_circle.good_friend_num_6m}条`} />
                <BlockTwo title="近3月联系次数最多的归属地" info={_props.friend_circle.friend_city_center_3m} />
                <BlockTwo title="近6月联系次数最多的归属地" info={_props.friend_circle.friend_city_center_6m} />
                <div className="container layer width-50 offset-top-10 bottom-border bottom-padding ">
                    <div className="layer width-80 nav_all">
                        <div className="layer  nav1 text-left p-09rem">近3月朋友圈中心地是否与手机归属地一致</div>
                    </div>
                    <div className={`layer width-20 content1 ${_props.friend_circle.is_city_match_friend_city_center_3m === "是" 
                        && "success-color" || "wrong-color"}`}>
                        {_props.friend_circle.is_city_match_friend_city_center_3m}
                    </div>
                </div>
                <div className="container layer width-50 offset-top-10 bottom-border bottom-padding ">
                    <div className="layer width-80 nav_all">
                        <div className="layer  nav1 text-left p-09rem">近6月朋友圈中心地是否与手机归属地一致</div>
                    </div>
                    <div className={`layer width-20 content1 ${_props.friend_circle.is_city_match_friend_city_center_6m === "是" 
                        && "success-color" || "wrong-color"}`}>
                        {_props.friend_circle.is_city_match_friend_city_center_6m}
                    </div>
                </div>
                <BlockTwo title="近3月互通电话的号码数目" info={`${_props.friend_circle.inter_peer_num_3m}条`} />
                <BlockTwo title="近6月互通电话的号码数目" info={`${_props.friend_circle.inter_peer_num_6m}条`} />
                    
                <FullWidth title="联系人号码归属地top3(近3月)" >
                    <Table
                        setting={this.state.locationSetting}
                        data={_props.friend_circle.call_location_top3_3m}/>
                </FullWidth>

                <FullWidth title="联系人号码归属地top3(近6月)" >
                    <Table
                        setting={this.state.locationSetting}
                        data={_props.friend_circle.call_location_top3_6m}/>
                </FullWidth>

                <FullWidth title="联系人top3(近3月)">
                    <Table
                        setting={this.state.relationSetting}
                        data={_props.friend_circle.call_num_top3_3m}/>
                </FullWidth>

                <FullWidth title="联系人top3(近6月)">
                    <Table
                        setting={this.state.relationSetting}
                        data={_props.friend_circle.call_num_top3_6m}/>
                </FullWidth>
                
                <FullWidth title="风险关联电话" >
                    <Table
                        setting={this.state.riskSetting}
                        data={_props.friend_circle.risk_analysis.risk_check_item}/>
                </FullWidth>
            </div>
        );
    }
}

export {UserReport};