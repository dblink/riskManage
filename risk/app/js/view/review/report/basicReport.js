/* jshint ignore: start */
import React, {Component} from 'react';
import option from '../../../../json/option.json';
const check = {
    success: "success-color",
    wrong: "wrong-color"
}
class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "user_basic_info": {
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
            },
            "basic_info_check_items": {
                "idcard_check": "身份证号码有效性",
                "email_check": "邮箱有效性",
                "address_check": "地址有效性",
                "idcard_match": "身份证号码是否与运营商数据匹配",
                "call_data_check": "通话记录",
                "name_match": "姓名是否与运营商数据匹配"
            },
            "risk_analysis": {
                "in_time": "入网时长(月)",
                "mobile_silence_3m": "号码沉默度(近3月)",
                "mobile_silence_6m": "号码沉默度(近6月)",
                "arrearage_risk_3m": "欠费风险度(近3月)",
                "arrearage_risk_6m": "欠费风险度(近6月)",
                "binding_risk": "亲情网风险度",
                "is_name_and_idcard_in_court_black": "申请人姓名+身份证号码是否出现在法院黑名单",
                "is_name_and_idcard_in_finance_black": "申请人姓名+身份证号码是否出现在金融机构黑名单",
                "is_name_and_mobile_in_finance_black": "申请人姓名+手机号码是否出现在金融机构黑名单",
                "risk_check_item": "风险关联项"
            },
            "data_source": {
                "source_name": "运营商"
            },
            "userMessage": {
                "ApplyId": 0,
                "BankMobile": "17761296637",
                "BankCode": "ICBC",
                "Liabilities": "null",
                "Education": "大专",
                "HouseStateInfo": "{\"HouseHost\":\"张大伟\",\"WaterCard\":\"0474587902\",\"NearThreeCost\":\"10\",\"H" +
                        "ouseArea\":\"2\",\"MonthCost\":\"\"}",
                "BackupMobile": null,
                "MaritalRemark": "{\"ChildAge\":\"9\",\"ChildSchool\":\"无\"}",
                "MaritalStatus": "0",
                "Sex": 0,
                "Age": 39,
                "OtherInfo": "{\"contect\":[{\"Relation\":\"0\",\"Mobile\":\"18081157957\",\"Name\":\"张兴奎\",\"" +
                        "Address\":\"\"},{\"Relation\":\"1\",\"Mobile\":\"18081159087\",\"Address\":\"成都市" +
                        "天府新区华阳南湖西路175号9栋1单元806号\",\"Name\":\"黄继华\"},{\"Relation\":\"2\",\"Mobile\":\"134" +
                        "38861781\",\"Address\":\"成都市天府新区华阳南湖西路175号9栋1大白天押宝806号\",\"Name\":\"刘期玲\"},{\"Re" +
                        "lation\":\"5\",\"Mobile\":\"13658079016\",\"Address\":\"八益家具城\",\"Name\":\"吴超\"}" +
                        ",{\"Relation\":\"3\",\"Mobile\":\"15892436193\",\"Address\":\"动物园旁雍华府\",\"Name\"" +
                        ":\"岳贤\"}],\"loanCard\":[{\"Bank\":\"广发银行\",\"Quota\":\"29000\",\"Used\":\"23000" +
                        "\"},{\"Bank\":\"招商\",\"Quota\":\"22000\",\"Used\":\"17000\"},{\"Bank\":\"平安\",\"" +
                        "Quota\":\"16000\",\"Used\":\"11000\"}],\"loanWe\":[{\"Name\":\"众投\",\"GetMoney\"" +
                        ":\"20000\",\"Rplay\":\"8\"},{\"Name\":\"金投\",\"Rplay\":\"3\",\"GetMoney\":\"1500" +
                        "0\"},{\"Name\":\"赞投\",\"Rplay\":\"6\",\"GetMoney\":\"15000\"},{\"Name\":\"飞秒\"," +
                        "\"Rplay\":\"3\",\"GetMoney\":\"10000\"},{\"Name\":\"联投\",\"Rplay\":\"5\",\"GetMo" +
                        "ney\":\"12000\"},{\"Name\":\"鸿旭\",\"Rplay\":\"7\",\"GetMoney\":\"12000\"},{\"Nam" +
                        "e\":\"天弘\",\"Rplay\":\"2\",\"GetMoney\":\"10000\"},{\"Name\":\"博汇\",\"Rplay\":\"" +
                        "3\",\"GetMoney\":\"8000\"},{\"Name\":\"百度米斗\",\"Rplay\":\"4\",\"GetMoney\":\"100" +
                        "00\"},{\"Name\":\"铭晟\",\"Rplay\":\"3\",\"GetMoney\":\"10000\"},{\"Name\":\"亿升\"," +
                        "\"Rplay\":\"6\",\"GetMoney\":\"12000\"},{\"Name\":\"聚成\",\"Rplay\":\"3\",\"GetMo" +
                        "ney\":\"10000\"},{\"Name\":\"仁信\",\"Rplay\":\"6\",\"GetMoney\":\"12000\"}]}",
                "BankNo": "6222024402064418423",
                "MobilePwd": "119000",
                "Address": "成都市武侯区双楠259号4-6-16",
                "HouseholdRegister": "成都市天府新区南湖西路175号9栋1单元806号",
                "CompanyInfo": "{\"Name\":\"成都以木家具有限公司\",\"Department\":\"销售\",\"Position\":\"主管\",\"Address\":" +
                        "\"高新区盛和一路88号2栋1单元2210\",\"Mobile\":\"85565917\",\"EnterTime\":\"2010-9-1\",\"Mon" +
                        "ey\":\"12000\",\"Fund\":\"无\",\"FundPassword\":\"无\"}",
                "BankAddress": "工商银行双楠支行",
                "BankName": "中国工商银行",
                "Mobile": "17761296637",
                "PersonCardNo": "513001197805260012",
                "Name": "张大伟",
                "ID": 10146
            },
            "call_contact_detail":{
                peer_num:"电话号码"
            }
        }
        this.numberMessage = this.numberMessage.bind(this);
    }
    numberMessage(number){
        let _call = this.props.call_contact_detail;
        let message = null;
        for(let i=0; i<_call.length; i++){
            if(_call[i].peer_num.toString() === number.toString()){
                
                message = _call[i];
                return message;
            }
        }
    }
    render() {
        var _props = this.props;
        var _isNameTrue = _props.basic_info_check_items.name_match === "匹配成功"
            ? check.success
            : check.wrong;
        var _isCardTrue = _props.basic_info_check_items.idcard_check === "通过检验"
            ? check.success
            : check.wrong;
        var _isCardIdTrue = _props.basic_info_check_items.idcard_match === "匹配成功"
            ? check.success
            : check.wrong;
        var _isAddressTrue = _props.basic_info_check_items.address_check === "通过检验"
            ? check.success
            : check.wrong;
        var _isEmailTrue = _props.basic_info_check_items.email_check === "通过检验"
            ? check.success
            : check.wrong;
        var _isCallDataTrue = _props.basic_info_check_items.call_data_check === "通话记录正常"
            ? check.success
            : check.wrong;
        var _otherInfo = _props.userMessage.OtherInfo;
        var _isNameAndCardCourt = _props.risk_analysis.is_name_and_idcard_in_court_black === "否"; //是否在法院黑名单
        var _isNameAndCardFinance = _props.risk_analysis.is_name_and_idcard_in_finance_black === "否"; //身份证是否在金融黑名单
        var _isNameAndMobileFinance = _props.risk_analysis.is_name_and_mobile_in_finance_black === "否"; //手机是否在金融黑名单
        _otherInfo = JSON.parse(_otherInfo);
        return (
            <div>
                <div
                    className="container letter-spacing-normal white-color text-center report-title red-bg">
                    用户基本信息检测
                </div>

                <div className="container">
                    <div className="container offset-top-10 bottom-border bottom-padding">
                        <div className="layer width-10 report-nav text-right">姓名</div>
                        <div className="layer width-60 report-content">
                            <div className="layer">{_props.userMessage.Name}</div>
                            <div className="layer report-tip">
                                {
                                    _props.laolai ? <a className="wrong-color" data-report="老赖">有老赖嫌疑</a>
                                    : <a className="success-color">记录良好</a>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="container offset-top-10 bottom-border bottom-padding">
                        <div className="layer width-10 report-nav text-right">身份证</div>
                        <div className="layer width-60 report-content">
                            <div className="layer">{_props.userMessage.PersonCardNo}</div>
                            <div className={`layer ${!_isNameAndCardCourt ? "success-bg-color" : "wrong-bg-color"} report-tip`}>{!_isNameAndCardCourt && "不"}在法院名单</div>
                            <div className={`layer ${!_isNameAndCardFinance ? "success-bg-color" : "wrong-bg-color"} report-tip`}>{!_isNameAndCardFinance && "不"}在金融机构黑名单</div>
                        </div>
                        <div className="layer width-30 report-content">
                            <span
                                style={{
                                "margin": "0 5px"
                            }}>{_props.user_basic_info.gender}</span>
                            |
                            <span
                                style={{
                                "margin": "0 5px"
                            }}>{_props.user_basic_info.age}</span>
                            |
                            <span
                                style={{
                                "margin": "0 5px"
                            }}>{_props.user_basic_info.native_place}</span>
                        </div>
                    </div>
                    <div className="container offset-top-10 bottom-border bottom-padding">
                        <div className="layer width-10 report-nav text-right vertical-top">手机号</div>
                        <div className="layer width-60 report-content vertical-top">
                            <div className="layer">{_props.userMessage.Mobile}</div>
                            {<div className={`layer ${!_isNameAndMobileFinance ? "success-bg-color" : "wrong-bg-color"} report-tip`}>{!_isNameAndMobileFinance && "不"}在金融机构黑名单</div>}
                            <div className="report-little_tip">
                                <p className={_isNameTrue}>用户姓名与运营商提供的姓名[{_props.user_basic_info.name}]{_props.basic_info_check_items.name_match}</p>
                                <p className={_isCardIdTrue}>用户身份证[{_props.basic_info_check_items.idcard_match}]</p>
                                <p className={_isCallDataTrue}>{_props.basic_info_check_items.call_data_check}</p>
                                <p className={_isCardTrue}>身份证[{_props.basic_info_check_items.idcard_check}]</p>
                                <p className={_isEmailTrue}>用户邮箱[{_props.basic_info_check_items.email_check}]</p>
                                <p className={_isAddressTrue}>用户地址[{_props.basic_info_check_items.address_check}]</p>
                            </div>
                        </div>
                        <div className="layer width-30 report-content vertical-top">{_props.data_source.source_name}
                            | 入网时长[{_props.risk_analysis.in_time}]月</div>
                    </div>
                    <div className="container offset-top-10 bottom-border bottom-padding">
                        <div className="layer width-10 report-nav text-right vertical-top">居住地址</div>
                        <div className="layer width-90 report-content vertical-top">
                            {_props.userMessage.Address}
                        </div>
                        {/* <div className="layer width-30 report-content red-color vertical-top">居住地址可通过地图定位技术精确到,坐标(117.041315034E,25.0530365992N)</div> */}
                    </div>
                    <div className="container offset-top-10 bottom-border bottom-padding">
                        <div className="layer width-10 report-nav text-right vertical-top">户口所在地</div>
                        <div className="layer width-90 report-content vertical-top">
                            {_props.userMessage.HouseholdRegister}
                        </div>
                    </div>
                    <div className="container offset-top-10 bottom-border bottom-padding">
                        {
                            _otherInfo.contect.map((contect)=>{
                                let _message = this.numberMessage(contect.Mobile);
                                return <div>
                                    <div className="layer width-10 report-nav text-right vertical-top">联系人</div>
                                    <div className="layer width-90 report-content vertical-top">
                                        <div className="layer">{option.relationShip[contect.Relation]} | {contect.Name} ｜ {contect.Mobile} | {contect.Address}</div>
                                        {
                                            _message && <div className="report-little_tip">
                                                <p className={"success-color"}>一周内联系[<span className="info-color">{_message.call_num_1w}</span>]次</p>
                                                <p className={"success-color"}>一月内联系[<span className="info-color">{_message.call_num_1m}</span>]次</p>
                                                <p className={"success-color"}>三月内联系[<span className="info-color">{_message.call_num_3m}</span>]次[<span className="info-color">{Math.floor(_message.call_time_3m / 60)}</span>]分钟</p>
                                                <p className={" success-color"}>六月个内联系[<span className="info-color">{_message.call_num_6m}</span>]次[<span className="info-color">{Math.floor(_message.call_time_6m / 60)}</span>]分钟</p>
                                                </div>
                                            ||
                                            <p className={"wrong-color report-little_tip"}>不在联系范围内</p>

                                        }
                                        
                                    </div> 
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export {BasicInfo};
/* jshint ignore: end */
