/* jshint ignore : start */
import React, { Component } from 'react';
//import {selectUserMessage} from '../config/applyConfig';
import {inter} from '../../config/interface';
import {MaterialFlatButton as FlatButton} from '../../module/buttons';
import DatePicker from 'material-ui/DatePicker';
import {MaterialTextField as Input , MaterialTextSelect as Select} from '../../module/input/input';
import {ChosePayType} from '../../module/input/select';
import {FormBlock} from '../../module/form/formBlock';
import {addUserMessage} from '../../config/applyConfig';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

if (areIntlLocalesSupported(['zh'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
}


class ApplyStep3 extends Component {
    constructor(props){
        super(props);
        let _data = inter.addUserMessage.data;
        _data.CompanyInfo = typeof _data.CompanyInfo === "string" && _data.CompanyInfo !== "string" && JSON.parse(_data.CompanyInfo) || _data.CompanyInfo || "string";
        let _info = _data.CompanyInfo;
        this.state= {
            value: {
                Name: _info.Name !== "string" && _info.Name || "" ,
                Department: _info.Department !== "string" && _info.Department  || "",//部门
                Position: _info.Position !== "string" && _info.Position || "",//职位
                Address: _info.Address !== "string" && _info.Address || "",
                Mobile: _info.Mobile !== "string" && _info.Mobile || "", //公司电话
                EnterTime: _info.EnterTime !== "string" && _info.EnterTime || "", //入职时间
                Money: _info.Money !== "string" && _info.Money || "", //月薪
                Fund:  _info.Fund !== "string" && _info.Fund || "", //公积金
                FundPassword: _info.FundPassword !== "string" && _info.FundPassword || "", //公积金密码
            },
            except:{
                Fund: true,
                FundPassword: true
            },
            obj:{
                date: _info.EnterTime && new Date(_info.EnterTime) || ""
            },
            error:{
                Name: "",
                Department: "",//部门
                Position: "",//职位
                Address: "",
                Mobile: "", //公司电话
                EnterTime: "", //入职时间
                Money:"", //月薪
                Fund: "", //公积金
                FundPassword: "", //公积金密码
            },
            setting:{
                Name: {
                    tip: "公司名",
                    condition:{
                        floatHolder: "公司名称",
                        type: "text",
                        placeholder: "请输入公司名称",
                        disabled: this.props.disabled
                    }
                },
                Department: {
                    tip: "部门",
                    condition:{
                        floatHolder: "部门名称",
                        type: "text",
                        placeholder: "请输入部门名称",
                        disabled: this.props.disabled
                    }
                },//部门
                Position: {
                    tip: "职位",
                    condition: {
                        floatHolder: "职位名称",
                        type: "text",
                        placeholder: "请输入职位名称",
                        disabled: this.props.disabled
                    }
                },//职位
                Address: {
                    tip: "公司地址",
                    condition:{
                        floatHolder: "公司地址",
                        type: "text",
                        placeholder: "请输入公司地址",
                        disabled: this.props.disabled
                    }
                },
                Mobile: {
                    tip: "公司电话",
                    condition:{
                        floatHolder: "公司电话",
                        type: "text",
                        placeholder: "请输入公司电话",
                        disabled: this.props.disabled
                    }
                }, //公司电话
                EnterTime: {
                    tip: "入职时间",
                    type: "time",
                    condition:{}
                }, //入职时间
                Money:{
                    tip: "月薪",
                    condition:{
                        floatHolder: "月薪",
                        type: "text",
                        placeholder: "请输入月薪",
                        disabled: this.props.disabled
                    }
                }, //月薪
                Fund: {
                    tip: "公积金",
                    condition:{
                        floatHolder: "公积金",
                        type: "text",
                        placeholder: "请输入公积金",
                        disabled: this.props.disabled
                    }
                }, //公积金
                FundPassword: {
                    tip: "公积密码",
                    condition:{
                        floatHolder: "公积密码",
                        type: "text",
                        placeholder: "请输入公积密码",
                        disabled: this.props.disabled
                    }
                }, //公积金密码
            }
        }
        this.inputChange = this.inputChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.apply = this.apply.bind(this);
    }

    inputChange(name, value, parent){
        let _value = this.state.value;
        let _error = this.state.error;

        if(parent){
            _value[parent][name] = value;
            _error[parent][name] = '';
        }else{
            _value[name] = value;
            _error[name] = '';
        }
        this.setState({
            value: _value,
            error: _error
        })
    }

    dateChange(event, date) {
        let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        let _obj = this.state.obj;
        let _value = this.state.value;
        let _error = this.state.error;
        _obj.date = date;
        _value.EnterTime = time;
        _error.EnterTime = '';
        this.setState({value: _value, obj: _obj, error: _error})
    }

    apply(index){
        let _value = this.state.value;
        let _data = inter.addUserMessage.data;
        let _error = this.state.error;
        let _except = this.state.except;
        let _isError = false;
        _data.CompanyInfo = {};

        Object.keys(_value).map((name)=>{
            if(!_value[name].toString() && !_except[name]){
                _error[name] = '此处不能为空';
                _isError = true;
            }else{
                _data.CompanyInfo[name] = _value[name];
            }
        })
        
        if(_isError){
            this.setState({
                error: _error
            })
            return;
        }

        /*console.log(typeof inter.addUserMessage.data.CompanyInfo);

        inter.addUserMessage.data.CompanyInfo = _value;*/

        this.props.callback("","",index);
    }

    render() {
        let _setting = this.state.setting;

        return (
            <div style={{'max-width': '1000px'}}>
                {Object.keys(_setting).map(
                    (name)=>{
                        //let _setting = this.state.setting;
                        let _parent = _setting[name].parent;
                         let _error = _parent ? this.state.error[_parent] : this.state.error;
                        let _value = _parent ? this.state.value[_parent] : this.state.value ;

                        return <FormBlock tip={_setting[name].tip} width={_setting[name].width} >
                            { _setting[name].type 
                                &&
                                    <DatePicker
                                        hintText="zh locale"
                                        onChange={this.dateChange}
                                        value={this.state.obj.date}
                                        DateTimeFormat={DateTimeFormat}
                                        floatingLabelText="入职时间"
                                        container="inline"
                                        okLabel="确定"
                                        fullWidth={true}
                                        autoOk={true}
                                        cancelLabel="取消"
                                        locale="zh"
                                        disabled = {this.props.disabled}
                                        errorText={this.state.error.EnterTime}/>
                                ||
                                    <Input 
                                        {..._setting[name].condition}
                                        name={name}
                                        value={_value[name]}
                                        fullWidth={true}
                                        errorText={_error[name]}
                                        onChange={(e)=>this.inputChange(name, e.currentTarget.value, _parent)}
                                    />
                            }
                        </FormBlock>
                    }
                )}
                { !this.props.static && <div>
                    <FlatButton primary={true} style={{margin: '10px 0','width': '50%'}} label="下一步" onClick={()=>this.apply(3)} />
                    <FlatButton primary={true} style={{margin: '10px 0','width': '50%'}} label="上一步" onClick={()=> this.props.callback("","",1)} />
                </div>}
                
            </div>
        );
    }
}

export {ApplyStep3};
/* jshint ignore : end */