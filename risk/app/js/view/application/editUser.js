/* jshint ignore: start */
import React, { Component } from 'react';
import { Welcome } from '../index';
import {FormBlock} from '../../module/form/formBlock';
import {MaterialTextField as Input , MaterialTextSelect as Select} from '../../module/input/input';
import { getEditUserMessage , postEditUserMessage} from '../../config/applyConfig';
import { inter } from '../../config/interface';
class Edit extends Component {
    constructor(props){
        super(props);
        this.state ={
            value:{
                ID: "",
                Name: "", //姓名
                Mobile: "", //手机
                MobilePwd: "", //手机密码
                BankCode: "", //开户行

                BankAddress: "", //开户行地址
                //Job: "", //工作
                HouseholdRegister: "", //户籍
                Address: "", //现居地址

                BankNo: "", //银行卡号
                Age: "", //年龄
                Sex: "", //性别,
                MaritalStatus: "", //婚姻状况
                MaritalRemark: {}, //婚姻备注
                BackupMobile: "", //备用手机号
                HouseStateInfo: {}, //房屋信息
                Education: "", //教育情况
                BankMobile: "", //教育情况
                CompanyInfo: {},//公司信息
            },
            HouseStateInfo: {
                HouseHost: "", //户主名
                WaterCard: "", //水电号
                NearThreeCost: "",
                HouseArea: "", //房产情况
                MonthCost: "" //月供
            },
            MaritalRemark: {
                ChildAge: "", //子女年龄
                ChildSchool: "", //子女学校
            },
            CompanyInfo:{
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
            personCardNo: "",
            setting: {
                Name: {
                    tip: "姓名",
                    condition: {
                        floatHolder: "姓名",
                        type: "text",
                        placeholder: "请输入姓名",
                    }

                },
                Age: {
                    tip: "年龄",
                    condition: {
                        //disabled: true,
                        floatHolder: "年龄",
                        type: "text",
                        placeholder: "请输入年龄"
                    }
                },
                Sex: {
                    tip: "性别",
                    item: [
                        {
                            value: 0,
                            primaryText: "男"
                        },{
                            value: 1,
                            primaryText: "女"
                        }
                    ],
                    condition: {
                        disabled: true,
                        floatHolder: "性别",
                        type: "text",
                        placeholder: "请输入性别"
                    }
                },
                MaritalStatus: {
                    tip: "婚姻情况",
                    condition: {
                        floatHolder: "婚姻情况",
                        placeholder: "选择婚姻情况",
                    },
                    item: [
                        {
                            value: "0",
                            primaryText: "已婚"
                        }, {
                            value: "1",
                            primaryText: "未婚"
                        }, {
                            value: "2",
                            primaryText: "离异"
                        }
                    ]
                },
                HouseholdRegister: {
                    width: 3,
                    tip: "户口所在地",
                    condition: {
                        floatHolder: "户口所在地",
                        type: "text",
                        placeholder: "请输入户口所在地",
                    }
                },
                ChildAge: {
                    tip: "子女年龄",
                    parent: "MaritalRemark",
                    condition: {
                        floatHolder: "子女年龄",
                        placeholder: "输入子女年龄",
                    }
                },
                ChildSchool: {
                    tip: "子女学校",
                    width: "2",
                    parent: "MaritalRemark",
                    condition: {
                        floatHolder: "子女学校",
                        placeholder: "请输入子女学校",
                    }
                },

                HouseHost: {
                    tip: "户主名",
                    parent: "HouseStateInfo",
                    condition: {
                        floatHolder: "当前居住户主名",
                        type: "text",
                        placeholder: "请输入户主名",
                    }
                },
                Address: {
                    width: 2,
                    tip: "现居住地址",
                    condition: {
                        floatHolder: "现居住地址",
                        type: "text",
                        placeholder: "请输入现居住地址",
                    }
                },

                WaterCard: {
                    tip: "水电号",
                    parent: "HouseStateInfo",
                    condition: {
                        floatHolder: "住房水电号",
                        type: "text",
                        placeholder: "请输入住房水电号",
                    }
                }, //水电号

                NearThreeCost: {
                    tip: '缴费金额',
                    parent: "HouseStateInfo",
                    condition: {
                        floatHolder: "近三月缴费金额",
                        type: "text",
                        placeholder: "请输入缴费金额",
                    }
                }, //近三月缴费金额
                HouseArea: {
                    tip: "地产情况",
                    parent: "HouseStateInfo",
                    condition: {
                        floatHolder: "地产情况",
                        placeholder: "请选择地产情况",
                    },
                    item: [
                        {
                            value: "0",
                            primaryText: "商品"
                        }, {
                            value: "1",
                            primaryText: "自建"
                        }, {
                            value: "2",
                            primaryText: "父母"
                        }, {
                            value: "3",
                            primaryText: "租赁"
                        }, {
                            value: "4",
                            primaryText: "安置"
                        }
                    ]
                }, //房产情况
                MonthCost: {
                    tip: "月供",
                    parent: "HouseStateInfo",
                    condition: {
                        /*disabled: this.state.value.HouseStateInfo.HouseArea === '0',*/
                        floatHolder: "月供情况",
                        type: "text",
                        placeholder: "请输入月供",
                    }
                }, //月供
                Education: {
                    tip: "学历",
                    condition: {
                        floatHolder: "学历",
                        type: "text",
                        placeholder: "请输入学历",
                    }
                },
                BackupMobile: {
                    tip: "备用号码",
                    condition: {
                        floatHolder: "备用手机号",
                        type: "text",
                        placeholder: "请输入备用手机号",
                        maxlength: "11",
                    }
                },
                BankCode: {
                    tip: "开户行",
                    condition: {
                        floatHolder: "开户行",
                        placeholder: "选择开户行",
                    },
                    item: [
                        {
                            value: "ICBC",
                            primaryText: "中国工商银行"
                        }, {
                            value: "ABC",
                            primaryText: "中国农业银行"
                        }, {
                            value: "CCB",
                            primaryText: "中国建设银行"
                        }, {
                            value: "BOC",
                            primaryText: "中国银行"
                        }, {
                            value: "BCOM",
                            primaryText: "中国交通银行"
                        }, {
                            value: "CIB",
                            primaryText: "兴业银行"
                        }, {
                            value: "CITIC",
                            primaryText: "中信银行"
                        }, {
                            value: "CEB",
                            primaryText: "中国光大银行"
                        }, {
                            value: "PAB",
                            primaryText: "平安银行"
                        },{
                            value: "PSBC",
                            primaryText: "中国邮政储蓄银行"
                        },{
                            value: "SHB",
                            primaryText: "上海银行"
                        },{
                            value: "SPDB",
                            primaryText: "浦东发展银行"
                        },{
                            value: "CMBC",
                            primaryText: "民生银行",
                        },{
                            value: "CMB",
                            primaryText: "招商银行"
                        },{
                            value: "GDB",
                            primaryText: " 广发银行"
                        },{
                            value: "HXB",
                            primaryText: "华夏银行"
                        },{
                            value: "HZB",
                            primaryText: "杭州银行"
                        },{
                            value: "BOB",
                            primaryText: "北京银行"
                        },{
                            value: "NBCB",
                            primaryText: "宁波银行"
                        },{
                            value: "JSB",
                            primaryText: "江苏银行"
                        },{
                            value:"ZSB",
                            primaryText: "浙商银行"
                        }
                    ]
                },
                BankMobile: {
                    tip: "预留手机",
                    condition: {
                        floatHolder: "银行卡预留手机号码",
                        type: "text",
                        placeholder: "请输入手机号码",
                    }
                },
                BankNo: {
                    tip: "银行卡号",
                    condition: {
                        floatHolder: "银行卡号",
                        type: "text",
                        placeholder: "请输入银行卡",
                    }
                },
                BankAddress: {
                    width: 3,
                    tip: "银行地址",
                    condition: {
                        floatHolder: "开户行地址",
                        type: "text",
                        placeholder: "请输入开户行地址",
                    }
                },
                CompanyName: {
                    tip: "公司名",
                    parent: "CompanyInfo",
                    name: "Name",
                    condition:{
                        floatHolder: "公司名称",
                        type: "text",
                        placeholder: "请输入公司名称",
                    }
                },
                Department: {
                    tip: "部门",
                    parent: "CompanyInfo",
                    condition:{
                        floatHolder: "部门名称",
                        type: "text",
                        placeholder: "请输入部门名称",
                    }
                },//部门
                Position: {
                    tip: "职位",
                    parent: "CompanyInfo",
                    condition: {
                        floatHolder: "职位名称",
                        type: "text",
                        placeholder: "请输入职位名称",
                    }
                },//职位
                Address: {
                    tip: "公司地址",
                    parent: "CompanyInfo",
                    condition:{
                        floatHolder: "公司地址",
                        type: "text",
                        placeholder: "请输入公司地址",
                    }
                },
                Mobile: {
                    tip: "公司电话",
                    parent: "CompanyInfo",
                    condition:{
                        floatHolder: "公司电话",
                        type: "text",
                        placeholder: "请输入公司电话",
                    }
                }, //公司电话
                EnterTime: {
                    tip: "入职时间",
                    parent: "CompanyInfo",
                    condition:{
                        floatHolder: "入职时间",
                        type: "text",
                        placeholder: "请输入入职时间"
                    }
                }, //入职时间
                Money:{
                    tip: "月薪",
                    parent: "CompanyInfo",
                    condition:{
                        floatHolder: "月薪",
                        type: "text",
                        placeholder: "请输入月薪",
                    }
                }, //月薪
                Fund: {
                    tip: "公积金",
                    parent: "CompanyInfo",
                    condition:{
                        floatHolder: "公积金",
                        type: "text",
                        placeholder: "请输入公积金",
                    }
                }, //公积金
                FundPassword: {
                    tip: "公积密码",
                    parent: "CompanyInfo",
                    condition:{
                        floatHolder: "公积密码",
                        type: "text",
                        placeholder: "请输入公积密码",
                    }
                }, //公积金密码,
                
            },
            contectInput: {
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
            contect: [{
                Relation: "",
                Name: "",
                Mobile: "",
                Address: ""
            }],
            loanCardInput: {
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
            loanCard: [{
                Bank: "",
                Quota: "",
                Used: ""
            }],
            loanWeInput: {
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
            },
            loanWe: [{
                Name: "",
                GetMoney:"",
                Rplay: ""
            }]
        }
        this.inputChange = this.inputChange.bind(this);
        this.personCard = this.personCard.bind(this);
        this.selectEditUser = this.selectEditUser.bind(this);
        this.postEditUser = this.postEditUser.bind(this);
    }
    inputChange(name,value, parent, key){
        let _state = parent ? this.state[parent] : this.state.value;
        let sub = parent || "value";
        if( typeof key === "number" ){
            _state[key][name] = value;
        }else{
            _state[name] = value;
        }
        let _json = {};
        _json[sub] = _state;
        console.log(_json);
        this.setState(_json)
    }
    personCard(value){
        var _json = this.state.value;
        if(this.state.value.Name){
            Object.keys(this.state.value).map((e)=>{
                _json[e] = "";
            });
        }
        this.setState({personCardNo :value, value: _json});
    }
    selectEditUser(){
        inter.getEditUserMessage.data.personCardNo = this.state.personCardNo;
        getEditUserMessage((data)=>{
            var _value = {};
            Object.keys(this.state.value).map((key)=>{
                _value[key] = data[key];
            });
            this.setState({
                value: _value,
                MaritalRemark: JSON.parse(data.MaritalRemark),
                HouseStateInfo: JSON.parse(data.HouseStateInfo),
                CompanyInfo: JSON.parse(data.CompanyInfo),
                contect: JSON.parse(data.OtherInfo).contect,
                loanCard: JSON.parse(data.OtherInfo).loanCard,
                loanWe: JSON.parse(data.OtherInfo).loanWe
            })
        })
    }
    postEditUser(){
        var _value = this.state.value;
        _value.PersonCardNo = this.state.personCardNo;
        _value.MaritalRemark = JSON.stringify(this.state.MaritalRemark);
        _value.HouseStateInfo = JSON.stringify(this.state.HouseStateInfo);
        _value.CompanyInfo = JSON.stringify(this.state.CompanyInfo);
        _value.OtherInfo = JSON.stringify({
            contect: this.state.contect,
            loanCard: this.state.loanCard,
            loanWe: this.state.loanWe
        });
        inter.postEditUserMessage.data = _value;
        postEditUserMessage((data)=>{
            if(data.error){
                alert(data.error);
            }else{
                alert("获取成功!");
            }
        })
    }
    render() {
        let _setting = this.state.setting;
        let _contect = this.state.contectInput;
        let _loanCard = this.state.loanCardInput;
        let _loanWe = this.state.loanWeInput;
        return (
            <Welcome>
                <div>
                    {
                        <FormBlock tip="身份证" width={2} >
                            <Input placeholder="身份证号"
                                    floatHolder="请输入身份证号"
                                    type="text"
                                    name="personCardNo"
                                    value={this.state.personCardNo}
                                    fullWidth={true}
                                    disabled = {this.props.disabled}
                                    onChange={(e)=>this.personCard(e.currentTarget.value)}
                                />
                        </FormBlock>
                    }
                    <a onClick={this.selectEditUser}>查询</a>
                </div>
                
                {Object
                    .keys(_setting)
                    .map((name) => {
                        //let _setting = this.state.setting;
                        let _parent = _setting[name].parent;
                        let _value = !_parent
                            ? this.state.value
                            : this.state[_parent];

                        return <FormBlock tip={_setting[name].tip} width={_setting[name].width} button={_setting[name].button}>
                            {_setting[name].item && <Select
                                {..._setting[name].condition}
                                item={_setting[name].item}
                                name={name}
                                value={_value[_setting[name].name || name]}
                                fullWidth={true}
                                onChange={(event, index, value) => this.inputChange(_setting[name].name || name, value, _parent)}/> 
                                || <Input
                                {..._setting[name].condition}
                                name={name}
                                value={_value[_setting[name].name || name]}
                                fullWidth={true}
                                onChange={(e) => this.inputChange(_setting[name].name || name, e.currentTarget.value, _parent)}/>}
                        </FormBlock>
                    })}
                    {
                        this.state.contect.map((_value, key)=>{
                            return Object.keys(_contect).map((name)=>{
                                //let _value = value;
                                return <FormBlock tip={_contect[name].tip} width={_contect[name].width} button={_contect[name].button}>
                                    {_contect[name].item && <Select
                                        {..._contect[name].condition}
                                        item={_contect[name].item}
                                        name={name}
                                        value={_value[_contect[name].name || name]}
                                        fullWidth={true}
                                        onChange={(event, index, value) => this.inputChange( name, value, "contect", key)}/> 
                                        || <Input
                                        {..._contect[name].condition}
                                        name={name}
                                        value={_value[_contect[name].name || name]}
                                        fullWidth={true}
                                        onChange={(e) => this.inputChange(name, e.currentTarget.value, "contect", key)}/>}
                                </FormBlock>
                            })
                        })
                    }
                    {
                        this.state.loanCard.map((_value, key)=>{
                            return Object.keys(_loanCard).map((name)=>{
                                //let _value = value;
                                return <FormBlock tip={_loanCard[name].tip} width={_loanCard[name].width} button={_loanCard[name].button}>
                                    {_loanCard[name].item && <Select
                                        {..._loanCard[name].condition}
                                        item={_loanCard[name].item}
                                        name={name}
                                        value={_value[_loanCard[name].name || name]}
                                        fullWidth={true}
                                        onChange={(event, index, value) => this.inputChange(name, value, "loanCard", key)}/> 
                                        || <Input
                                        {..._loanCard[name].condition}
                                        name={name}
                                        value={_value[_loanCard[name].name || name]}
                                        fullWidth={true}
                                        onChange={(e) => this.inputChange( name, e.currentTarget.value, "loanCard", key)}/>}
                                </FormBlock>
                            })
                        })
                    }{
                        this.state.loanWe.map((_value, key)=>{
                            return Object.keys(_loanWe).map((name)=>{
                                //let _value = value;
                                return <FormBlock tip={_loanWe[name].tip} width={_loanWe[name].width} button={_loanWe[name].button}>
                                    {_loanWe[name].item && <Select
                                        {..._loanWe[name].condition}
                                        item={_loanWe[name].item}
                                        name={name}
                                        value={_value[_loanWe[name].name || name]}
                                        fullWidth={true}
                                        onChange={(event, index, value) => this.inputChange(name, value, "loanWe", key)}/> 
                                        || <Input
                                        {..._loanWe[name].condition}
                                        name={name}
                                        value={_value[_loanWe[name].name || name]}
                                        fullWidth={true}
                                        onChange={(e) => this.inputChange(name, e.currentTarget.value, "loanWe", key)}/>}
                                </FormBlock>
                            })
                        })
                    }
                    <p style={{padding: "20px 0"}}>
                        <a onClick={this.postEditUser} >提交</a>
                    </p>
                    
            </Welcome>
        );
    }
}

export {Edit};