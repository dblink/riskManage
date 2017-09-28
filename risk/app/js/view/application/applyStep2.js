/* jshint ignore : start */
import React, {Component} from 'react';
//import {selectUserMessage} from '../config/applyConfig';
import {inter} from '../../config/interface';
import {MaterialFlatButton as FlatButton} from '../../module/buttons';
import {MaterialTextField as Input, MaterialTextSelect as Select} from '../../module/input/input';
import {ChosePayType} from '../../module/input/select';
import {FormBlock} from '../../module/form/formBlock';
import {addUserMessage} from '../../config/applyConfig';
import {GetMobileMessage} from './getMobileMessage';

class ApplyStep2 extends Component {
    constructor(props) {
        super(props);
        let personCard = inter.addUserMessage.data.PersonCardNo;
        let sex = personCard.length === 15
            ? personCard[personCard.length - 1]
            : personCard[personCard.length - 2];
        sex = sex % 2 === 0
            ? '女'
            : '男';

        let age = personCard.length === 15
            ? `19 ${personCard.substr(6, 2)}`
            : personCard.substr(6, 4);

        let date = new Date();
        age = date.getFullYear() - age;

        let _inter = inter.addUserMessage.data;

        _inter.HouseStateInfo = typeof _inter.HouseStateInfo === "string" && _inter.HouseStateInfo !== "string" && _inter.HouseStateInfo && JSON.parse(_inter.HouseStateInfo) || _inter.HouseStateInfo || {};
        _inter.MaritalRemark = typeof _inter.MaritalRemark === "string" && _inter.MaritalRemark !== "string" && _inter.MaritalRemark && JSON.parse(_inter.MaritalRemark) || _inter.MaritalRemark || {};

        this.state = {
            value: {
                Name: _inter.Name !== "string" && _inter.Name || "", //姓名
                Mobile: _inter.Mobile !== "string" && _inter.Mobile || "", //手机
                MobilePwd: _inter.MobilePwd !== "string" && _inter.MobilePwd || "", //手机密码
                BankCode: _inter.BankCode !== "string" && _inter.BankCode || "", //开户行

                BankAddress: _inter.BankAddress !== "string" && _inter.BankAddress || "", //开户行地址
                //Job: "", //工作
                HouseholdRegister: _inter.HouseholdRegister !== "string" && _inter.HouseholdRegister || "", //户籍
                Address: _inter.Address !== "string" && _inter.Address || "", //现居地址

                BankNo: _inter.BankNo !== "string" && _inter.BankNo || "", //银行卡号
                Age: age, //年龄
                Sex: sex, //性别,
                MaritalStatus: _inter.MaritalStatus !== "string" && _inter.MaritalStatus && _inter
                    .MaritalStatus
                    .toString() || "", //婚姻状况
                MaritalRemark: {
                    ChildAge: _inter.MaritalRemark !== "string" && _inter.MaritalRemark.ChildAge || "", //子女年龄
                    ChildSchool: _inter.MaritalRemark !== "stirng" && _inter.MaritalRemark.ChildSchool || "", //子女学校
                }, //婚姻备注
                BackupMobile: _inter.BackupMobile !== "string" && _inter.BackupMobile || "", //备用手机号
                HouseStateInfo: {
                    HouseHost: _inter.HouseStateInfo && _inter.HouseStateInfo.HouseHost || "", //户主名
                    WaterCard: _inter.HouseStateInfo && _inter.HouseStateInfo.WaterCard || "", //水电号
                    NearThreeCost: _inter.HouseStateInfo && _inter.HouseStateInfo.NearThreeCost || "",
                    HouseArea: _inter.HouseStateInfo && _inter.HouseStateInfo.HouseArea || "", //房产情况
                    MonthCost: _inter.HouseStateInfo && _inter.HouseStateInfo.MonthCost || "" //月供
                }, //房屋信息
                Education: _inter.Education !== "string" && _inter.Education || "", //教育情况
                BankMobile: _inter.BankMobile !== "string" && _inter.BankMobile || "", //教育情况
                MonbileReportNo: inter.applyMoneyStep1.data.MonbileReportNo || false //是否通过手机验证
            },
            except: {
                MonthCost: true,
                ChildAge: true,
                ChildSchool: true,
                BackupMobile: true
            },
            error: {
                Name: "", //姓名
                Mobile: "", //手机
                MobilePwd: "", //手机密码
                BankCode: "", //银行代码
                BankAddress: "", //开户行地址
                //Job: "", //工作
                HouseholdRegister: "", //户籍
                Address: "", //地址
                BankNo: "", //银行卡号
                Age: "", //年龄
                Sex: "", //性别,
                MaritalStatus: "", //婚姻状况
                MaritalRemark: {}, //婚姻备注
                BackupMobile: "", //备用手机号
                BankMoile: "",
                HouseStateInfo: {
                    HouseHost: "", //户主名
                    WaterCard: "", //水电号
                    NearThreeCost: "",
                    HouseArea: "", //房产情况
                }, //房屋信息
                Education: "" //教育情况
            },
            setting: {
                Name: {
                    tip: "姓名",
                    condition: {
                        floatHolder: "姓名",
                        type: "text",
                        placeholder: "请输入姓名",
                        disabled: this.props.disabled
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
                        disabled: this.props.disabled
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
                /* Mobile: {
                    tip: "手机",
                    condition: {
                        floatHolder: "手机",
                        type: "text",
                        placeholder: "请输入手机",
                        maxlength: "11",
                        disabled: this.props.disabled
                    }
                },
                MobilePwd: {
                    tip: "服务密码",
                    condition: {
                        floatHolder: "手机服务密码",
                        type: "text",
                        placeholder: "输入手机服务密码",
                        maxlength: '6'
                    },
                    
                }, */
                HouseholdRegister: {
                    width: 3,
                    tip: "户口所在地",
                    condition: {
                        floatHolder: "户口所在地",
                        type: "text",
                        placeholder: "请输入户口所在地",
                        disabled: this.props.disabled
                    }
                },
                ChildAge: {
                    tip: "子女年龄",
                    parent: "MaritalRemark",
                    condition: {
                        floatHolder: "子女年龄",
                        placeholder: "输入子女年龄",
                        disabled: this.props.disabled
                    }
                },
                ChildSchool: {
                    tip: "子女学校",
                    width: "2",
                    parent: "MaritalRemark",
                    condition: {
                        floatHolder: "子女学校",
                        placeholder: "请输入子女学校",
                        disabled: this.props.disabled
                    }
                },

                HouseHost: {
                    tip: "户主名",
                    parent: "HouseStateInfo",
                    condition: {
                        floatHolder: "当前居住户主名",
                        type: "text",
                        placeholder: "请输入户主名",
                        disabled: this.props.disabled
                    }
                },
                Address: {
                    width: 2,
                    tip: "现居住地址",
                    condition: {
                        floatHolder: "现居住地址",
                        type: "text",
                        placeholder: "请输入现居住地址",
                        disabled: this.props.disabled
                    }
                },

                WaterCard: {
                    tip: "水电号",
                    parent: "HouseStateInfo",
                    condition: {
                        floatHolder: "住房水电号",
                        type: "text",
                        placeholder: "请输入住房水电号",
                        disabled: this.props.disabled
                    }
                }, //水电号

                NearThreeCost: {
                    tip: '缴费金额',
                    parent: "HouseStateInfo",
                    condition: {
                        floatHolder: "近三月缴费金额",
                        type: "text",
                        placeholder: "请输入缴费金额",
                        disabled: this.props.disabled
                    }
                }, //近三月缴费金额
                HouseArea: {
                    tip: "地产情况",
                    parent: "HouseStateInfo",
                    condition: {
                        floatHolder: "地产情况",
                        placeholder: "请选择地产情况",
                        disabled: this.props.disabled
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
                        disabled: this.props.disabled
                    }
                }, //月供
                Education: {
                    tip: "学历",
                    condition: {
                        floatHolder: "学历",
                        type: "text",
                        placeholder: "请输入学历",
                        disabled: this.props.disabled
                    }
                },
                BackupMobile: {
                    tip: "备用号码",
                    condition: {
                        floatHolder: "备用手机号",
                        type: "text",
                        placeholder: "请输入备用手机号",
                        maxlength: "11",
                        disabled: this.props.disabled
                    }
                },
                BankCode: {
                    tip: "开户行",
                    condition: {
                        floatHolder: "开户行",
                        placeholder: "选择开户行",
                        disabled: this.props.disabled
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
                        disabled: this.props.disabled
                    }
                },
                BankNo: {
                    tip: "银行卡号",
                    condition: {
                        floatHolder: "银行卡号",
                        type: "text",
                        placeholder: "请输入银行卡",
                        disabled: this.props.disabled
                    }
                },
                BankAddress: {
                    width: 3,
                    tip: "银行地址",
                    condition: {
                        floatHolder: "开户行地址",
                        type: "text",
                        placeholder: "请输入开户行地址",
                        disabled: this.props.disabled
                    }
                }
            },
            getMessage: false
        }
        this.inputChange = this
            .inputChange
            .bind(this);
        this.apply = this
            .apply
            .bind(this);
        this.getMessage = this.getMessage.bind(this);
            //console.log(_inter.HouseStateInfo);
    }

    inputChange(name, value, parent) {
        let _value = this.state.value;
        let _error = this.state.error;

        if (parent) {
            _value[parent][name] = value;
            _error[parent][name] = '';
        } else {
            _value[name] = value;
            _error[name] = '';
        }
        this.setState({value: _value, error: _error})
    }

    getMessage(e){
        this.setState({
            MonbileReportNo: e
        })
    }

    apply(index) {
        let _value = this.state.value;
        let _data = inter.addUserMessage.data;
        let _error = this.state.error;
        let _except = this.state.except;
        let _isError = false;

        if(!this.state.MonbileReportNo){
            alert("请验证手机号！");
            return;
        }
        Object
            .keys(_value)
            .map((name) => {
                if (typeof _value[name] === "object") {
                    Object
                        .keys(_value[name])
                        .map((e) => {
                            if (!_value[name][e].toString() && !_except[e]) {
                                _error[name][e] = '此处不能为空';
                                _isError = true;
                            } else {

                                _data[name][e] = _value[name][e];
                            }
                        })
                } else {
                    if(name !== "Mobile" && name !== "MobilePwd"){
                        if (!_value[name].toString() && !_except[name] ) {
                            _error[name] = '此处不能为空';
                            _isError = true;
                        } else {
                            _data[name] = _value[name];
                        }
                    }
                }

            })

        if (_isError) {
            this.setState({error: _error})
            return;
        }

        //addUserMessage((data)=>{this.props.callback("PersonID",data,index)});
        this
            .props
            .callback("mobileId", this.state.MonbileReportNo, index);
    }

    render() {
        let _setting = this.state.setting;

        _setting.MonthCost.condition.disabled = this.state.value.HouseStateInfo.HouseArea !== '0';
        return (
            <div style={{
                'max-width': '1000px'
            }}>
                {Object
                    .keys(_setting)
                    .map((name) => {
                        //let _setting = this.state.setting;
                        let _parent = _setting[name].parent;
                        let _error = _parent
                            ? this.state.error[_parent]
                            : this.state.error;
                        let _value = _parent
                            ? this.state.value[_parent]
                            : this.state.value;

                        return <FormBlock tip={_setting[name].tip} width={_setting[name].width} button={_setting[name].button}>
                            {_setting[name].item && <Select
                                {..._setting[name].condition}
                                item={_setting[name].item}
                                name={name}
                                value={_value[name]}
                                fullWidth={true}
                                errorText={_error[name]}
                                onChange={(event, index, value) => this.inputChange(name, value, _parent)}/> 
                                || <Input
                                {..._setting[name].condition}
                                name={name}
                                value={_value[name]}
                                fullWidth={true}
                                errorText={_error[name]}
                                onChange={(e) => this.inputChange(name, e.currentTarget.value, _parent)}/>}
                        </FormBlock>
                    })}
                <GetMobileMessage
                    disabled={this.props.disabled}
                    getMessage={this.getMessage}
                    pesonId={inter.addUserMessage.data.PersonCardNo}
                    name={this.state.value.Name}
                    mobile = {this.state.value.Mobile}
                    password = {this.state.value.MobilePwd}
                    inputChange = {this.inputChange}
                    buttonState = {this.props.static}
                    />
                {!this.props.static && <div>
                    <FlatButton
                        primary={true}
                        style={{
                        margin: '10px 0',
                        'width': '50%'
                    }}
                        label="下一步"
                        onClick={() => this.apply(2)}/>
                    <FlatButton
                        primary={true}
                        style={{
                        margin: '10px 0',
                        'width': '50%'
                    }}
                        label="上一步"
                        onClick={() => this.props.callback("", "", 0)}/>
                </div>
}

            </div>
        );
    }
}

export {ApplyStep2};
/* jshint ignore : end */