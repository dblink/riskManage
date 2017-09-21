/* jshint ignore : start */
import React, {Component} from 'react';
//import {selectUserMessage} from '../config/applyConfig';
import {inter} from '../../config/interface';
import {MaterialFlatButton as FlatButton} from '../../module/buttons';
import DatePicker from 'material-ui/DatePicker';
import {MaterialTextField as Input, MaterialTextSelect as Select} from '../../module/input/input';
import {ChosePayType} from '../../module/input/select';
import {FormBlock} from '../../module/form/formBlock';
import {addUserMessage, getApplyItemInfo} from '../../config/applyConfig';
import {SelectPopover} from './popover';
import {DiyDialog as Dialog, Progressive} from '../../module/dialog/dialog';

class ApplyStep4 extends Component {
    constructor(props) {
        super(props);
        let _data = inter.addUserMessage.data;
        /*_data.CompanyInfo = typeof _data.CompanyInfo === "string" && JSON.parse(_data.CompanyInfo) || {};
        let _info = _data.CompanyInfo;*/
        this.state = {
            value: {
                contect: [
                    {
                        Relation: "",
                        Mobile: "",
                        Name: "",
                        Address: ""
                    }
                ],
                loanCard: [
                    {
                        Bank: "",
                        Quota: "",
                        Used: ""
                    }
                ],
                loanWe: [
                    {
                        Name: "",
                        GetMoney: "",
                        Rplay: ""
                    }
                ]
            },
            popover: false,
            connectTimes: 0,
            loanCardTimes: 0,
            loanWeTimes: 0,
            except: {
                Fund: true,
                FundPassword: true
            },
            obj: {
                date: ""
            },
            error: {
                summary: "",
                contect: [
                    {
                        Relation: "",
                        Mobile: "",
                        Name: "",
                        Address: ""
                    }
                ],
                loanCard: [
                    {
                        Bank: "",
                        Quota: "",
                        Used: ""
                    }
                ],
                loanWe: [
                    {
                        Name: "",
                        GetMoney: "",
                        Rplay: ""
                    }
                ]
            },
            setting: {
                contect: {
                    Relation: {
                        tip: "关系",
                        condition: {
                            floatHolder: "关系",
                            placeholder: "请选择关系",
                            disabled: this.props.disabled
                        },
                        item: [
                            {
                                value: "0",
                                primaryText: "父亲"
                            }, {
                                value: "1",
                                primaryText: "母亲"
                            }, {
                                value: "2",
                                primaryText: "配偶"
                            }, {
                                value: "3",
                                primaryText: "同事"
                            }, {
                                value: "4",
                                primaryText: "子女"
                            }, {
                                value: "5",
                                primaryText: "朋友"
                            }, {
                                value: "6",
                                primaryText: "其他"
                            }, {
                                value: "7",
                                primaryText: "兄弟"
                            }, {
                                value: "8",
                                primaryText: "姐妹"
                            }
                        ]
                    },
                    Name: {
                        tip: "姓名",
                        condition: {
                            floatHolder: "姓名",
                            placeholder: "输入姓名",
                            type: "text",
                            disabled: this.props.disabled
                        }
                    },
                    Mobile: {
                        tip: "电话",
                        condition: {
                            floatHolder: "电话",
                            placeholder: "请选择电话",
                            type: "text",
                            disabled: this.props.disabled
                        }
                    },
                    Address: {
                        tip: "地址",
                        condition: {
                            floatHolder: "地址",
                            placeholder: "请选择地址",
                            type: "text",
                            disabled: this.props.disabled
                        }
                    }
                },
                loanCard: {
                    Bank: {
                        tip: "借款银行",
                        condition: {
                            floatHolder: "借款银行",
                            placeholder: "请借款借款银行",
                            disabled: this.props.disabled
                        }
                    },
                    Quota: {
                        tip: "借款额度",
                        condition: {
                            floatHolder: "借款额度",
                            placeholder: "请填写借款额度",
                            disabled: this.props.disabled
                        }
                    },
                    Used: {
                        tip: "已用金额",
                        condition: {
                            floatHolder: "已用金额",
                            placeholder: "请填写已用金额",
                            disabled: this.props.disabled
                        }
                    }
                },
                loanWe: {
                    Name: {
                        tip: "用户名",
                        condition: {
                            floatHolder: "用户名",
                            placeholder: "请输入用户名",
                            disabled: this.props.disabled
                        }
                    },
                    GetMoney: {
                        tip: "批款金额",
                        condition: {
                            floatHolder: "批款金额",
                            placeholder: "请输入批款金额",
                            disabled: this.props.disabled
                        }
                    },
                    Rplay: {
                        tip: "已还期数",
                        condition: {
                            floatHolder: "已还期数",
                            placeholder: "请输入已还期数",
                            disabled: this.props.disabled
                        }
                    }
                }
            },
            show: false
        }
        this.inputConnectChange = this
            .inputConnectChange
            .bind(this);
        this.addConnection = this
            .addConnection
            .bind(this);
        this.addLoanCard = this
            .addLoanCard
            .bind(this);
        this.addLoanWe = this
            .addLoanWe
            .bind(this);
        this.backConnect = this
            .backConnect
            .bind(this);
        this.apply = this
            .apply
            .bind(this);
        this.open = this
            .open
            .bind(this);
        this.close = this
            .close
            .bind(this);

        let info = inter.addUserMessage.data.OtherInfo;
        info = info && typeof info === "string" && info !== "string" && JSON.parse(info);

        this.state.value.contect = typeof info === "object"
            ? info.contect
            : this.state.value.contect;
        this.state.value.loanCard = typeof info === "object"
            ? info.loanCard
            : this.state.value.loanCard;
        this.state.value.loanWe = typeof info === "object"
            ? info.loanWe
            : this.state.value.loanWe;

        this.state.error.contect = this
            .state
            .value
            .contect
            .map((e) => {
                return {Relation: "", Mobile: "", Address: ""}
            })

        this.state.error.loanCard = this
            .state
            .value
            .loanCard
            .map((e) => {
                return {Bank: "", Quota: "", Used: ""}
            })
        this.state.error.loanWe = this
            .state
            .value
            .loanWe
            .map((e) => {
                return {Name: "", GetMoney: "", Rplay: ""}
            })

        this.state.connectTimes = this.state.value.contect.length - 1;
        this.state.loanWeTimes = this.state.value.loanWe.length - 1;
        this.state.loanCardTimes = this.state.value.loanCard.length - 1;
    }
    inputConnectChange(name, value, key, type) {
        let _value = this.state.value;
        let _error = this.state.error;
        let _attr = Object.keys(_error[type][key]);

        _value[type][key][name] = value;
        _error.summary = "";
        _attr.map((sub) => this.state.error[type][key][sub] = '')
        this.setState({value: _value, error: _error})
    }

    addConnection() {
        let _connect = this.state.value;
        let _error = this.state.error;
        let _lastConnection = _connect.contect[this.state.connectTimes];
        if (!_lastConnection.Address && !_lastConnection.Mobile && !_lastConnection.Relation) {
            _error.contect[this.state.connectTimes].Address = "不能全为空";
            _error.contect[this.state.connectTimes].Mobile = "不能全为空";
            _error.contect[this.state.connectTimes].Relation = "不能全为空";
            this.setState({error: _error})
            return;
        }
        _connect
            .contect
            .push({Relation: "", Mobile: "", Address: ""});
        _error
            .contect
            .push({Relation: "", Mobile: "", Address: ""});
        this.setState({
            contect: _connect,
            error: _error,
            connectTimes: this.state.connectTimes + 1
        })
    }

    addLoanCard() {
        let _loanCard = this.state.value;
        let _error = this.state.error;
        let _lastConnection = _loanCard.loanCard[this.state.loanCardTimes];
        console.log(_lastConnection, this.state.loanCardTimes);
        if (!_lastConnection.Bank && !_lastConnection.Quota && !_lastConnection.Used) {
            _error.loanCard[this.state.loanCardTimes].Bank = "不能全为空";
            _error.loanCard[this.state.loanCardTimes].Quota = "不能全为空";
            _error.loanCard[this.state.loanCardTimes].Used = "不能全为空";
            this.setState({error: _error, popover: false})
            return;
        }
        _loanCard
            .loanCard
            .push({Bank: "", Quota: "", Used: ""});
        _error
            .loanCard
            .push({Bank: "", Quota: "", Used: ""});
        this.setState({
            loanCard: _loanCard,
            error: _error,
            popover: false,
            loanCardTimes: this.state.loanCardTimes + 1
        })
    }

    addLoanWe() {
        let _loanWe = this.state.value;
        let _error = this.state.error;
        let _lastConnection = _loanWe.loanWe[this.state.loanWeTimes];
        if (!_lastConnection.Name && !_lastConnection.GetMoney && !_lastConnection.Rplay) {
            _error.loanWe[this.state.loanWeTimes].Name = "不能全为空";
            _error.loanWe[this.state.loanWeTimes].Rplay = "不能全为空";
            _error.loanWe[this.state.loanWeTimes].GetMoney = "不能全为空";
            this.setState({error: _error, popover: false})
            return;
        }
        _loanWe
            .loanWe
            .push({Name: "", Rplay: "", GetMoney: ""});
        _error
            .loanWe
            .push({Name: "", Rplay: "", GetMoney: ""});
        this.setState({
            loanWe: _loanWe,
            error: _error,
            popover: false,
            loanWeTimes: this.state.loanWeTimes + 1
        })
    }

    apply(index) {
        let _data = inter.addUserMessage.data;
        console.log(_data);
        _data.OtherInfo = this.state.value;
        addUserMessage((data) => {
            if(data.error){
                alert(data.error);
                this.setState({
                    show: false
                });
                return;
            }
            this
                .props
                .callback("PersonID", data, index)
        });

        //this.props.callback("","",index);
    }

    backConnect(key) {
        let _setting = this.state.setting.contect;
        _setting.Address.condition.disabled = this.props.disabled || key !== this.state.connectTimes;
        _setting.Mobile.condition.disabled = this.props.disabled || key !== this.state.connectTimes;
        _setting.Relation.condition.disabled = this.props.disabled || key !== this.state.connectTimes;

        return <div>
            {Object
                .keys(_setting)
                .map((name) => {
                    //let _setting = this.state.setting;
                    let _parent = _setting[name].parent;
                    let _error = this.state.error.contect[key];

                    let _value = this.state.value.contect[key];

                    return <FormBlock tip={_setting[name].tip} width={_setting[name].width}>
                        {_setting[name].item && <Select
                            {..._setting[name].condition}
                            item={_setting[name].item}
                            name={name}
                            value={_value[name]}
                            fullWidth={true}
                            errorText={_error[name]}
                            onChange={(event, index, value) => this.inputConnectChange(name, value, key, 'contect')}/> || <Input
                            {..._setting[name].condition}
                            name={name}
                            value={_value[name]}
                            fullWidth={true}
                            errorText={_error[name]}
                            onChange={(e) => this.inputConnectChange(name, e.currentTarget.value, key, 'contect')}/>}
                    </FormBlock>
                })}</div>
    }

    backLoanInformation(key, type, times, attr) {
        let _setting = this.state.setting[type];

        attr.map((sub) => _setting[sub].condition.disabled = this.props.disabled || key !== times)

        return <div>
            {Object
                .keys(_setting)
                .map((name) => {
                    //let _setting = this.state.setting;
                    let _parent = _setting[name].parent; //
                    let _error = this.state.error[type][key];
                    let _value = this.state.value[type][key];

                    return <FormBlock tip={_setting[name].tip} width={_setting[name].width}>
                        {_setting[name].item && <Select
                            {..._setting[name].condition}
                            item={_setting[name].item}
                            name={name}
                            value={_value[name]}
                            fullWidth={true}
                            errorText={_error[name]}
                            onChange={(event, index, value) => this.inputConnectChange(name, value, key, type)}/> || <Input
                            {..._setting[name].condition}
                            name={name}
                            value={_value[name]}
                            fullWidth={true}
                            errorText={_error[name]}
                            onChange={(e) => this.inputConnectChange(name, e.currentTarget.value, key, type)}/>}
                    </FormBlock>
                })}</div>
    }

    open() {
        let _value = this.state.value;
        let _error = this.state.error;
        let _except = this.state.except;
        let _isError = false;
        _error.summary = _value.contect.length < 3 && '该数据不能少于三条';

        if (_error.summary) {
            this.setState({error: _error})
            return;
        }
        //获取判断是否获取到appid
        if(inter.addUserMessage.data.ApplyId){
            inter.getApplyItemInfo.data.id = inter.addUserMessage.data.ApplyId;
            getApplyItemInfo((data)=>{
                inter.applyMoneyStep1.data = data;
                this.setState({show: true})
            })
        }else{
            this.setState({show: true});
        }
       
        
    }

    close() {
        this.setState({show: false})
    }

    render() {

        return (
            <div
                style={{
                'max-width': '1000px',
                position: 'relative'
            }}>
                <div className="clear-both">
                    <div
                        className="block-2"
                        style={{
                        'font-size': '1.4rem'
                    }}>
                        联系人
                        <span
                            style={{
                            'margin-left': '10px'
                        }}
                            className='wrong-color'>{this.state.error.summary}</span>
                    </div>
                    <div className="block-2 text-right">
                        {!this.props.disabled && <FlatButton
                            primary={true}
                            style={{
                            'width': '15%'
                        }}
                            label="添加"
                            onClick={this.addConnection}/>
}
                    </div>
                </div>
                <div>
                    {this
                        .state
                        .value
                        .contect
                        .map((e, key) => this.backConnect(key))}
                </div>

                <div className="clear-both">
                    <div
                        className="block-2"
                        style={{
                        'font-size': '1.4rem'
                    }}>
                        信用卡
                    </div>
                    <div className="block-2 text-right">
                        {!this.props.disabled && <FlatButton label="添加" primary={true} onClick={this.addLoanCard}/>
}
                    </div>
                </div>

                {this
                    .state
                    .value
                    .loanCard
                    .map((e, key) => this.backLoanInformation(key, 'loanCard', this.state.loanCardTimes, ['Bank', 'Quota', 'Used']))}

                <div className="clear-both">
                    <div
                        className="block-2"
                        style={{
                        'font-size': '1.4rem'
                    }}>
                        零用贷
                    </div>
                    <div className="block-2 text-right">
                        {!this.props.disabled && <FlatButton label="添加" primary={true} onClick={this.addLoanWe}/>
}
                    </div>
                </div>
                {this
                    .state
                    .value
                    .loanWe
                    .map((e, key) => this.backLoanInformation(key, 'loanWe', this.state.loanWeTimes, ['Name', 'Rplay', 'GetMoney']))}
                {!this.props.static && <div>
                    <FlatButton
                        primary={true}
                        style={{
                        margin: '10px 0',
                        'width': '50%'
                    }}
                        label="下一步"
                        onClick={() => this.open()}/>
                    <FlatButton
                        primary={true}
                        style={{
                        margin: '10px 0',
                        'width': '50%'
                    }}
                        label="上一步"
                        onClick={() => this.props.callback("", "", 2)}/>

                    <Dialog show={this.state.show}>
                        <Progressive apply={() => this.apply(4)} close={this.close}/>
                    </Dialog>
                </div>}

            </div>
        );
    }
}

export {ApplyStep4};
/* jshint ignore : end */