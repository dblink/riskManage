/* jshint ignore: start */
import React, {Component} from 'react';
import {inter} from '../../config/interface';
import {addUserMessage, postLoanApp, postFrom} from '../../config/applyConfig';
let _json = [ 
    {
    area: "福州",
    appdate: "2017/9/1",
    name: "陈祖辉",
    mobile: "13615015800",
    money:"7000",
    term: "20",
    presoncardNo :"350181198605151574",
    card:"6212261402028013453",
    bank: "ICBC"
    },
    
    {
    area: "福州",
    appdate: "2017/9/1",
    name: "江倩",
    mobile: "15980571850",
    money:"8000",
    term: "15",
    presoncardNo :"350103198707311525",
    card:"6227001823290115598",
    bank: "CCB"
    },
    
    {
    area: "福州",
    appdate: "2017/9/1",
    name: "刘燕",
    mobile: "15060090557",
    money:"8000",
    term: "20",
    presoncardNo :"350104199107121569",
    card:"6217001820033640164",
    bank: "CCB"
    },
    
    {
    area: "福州",
    appdate: "2017/9/1",
    name: "杨岚",
    mobile: "13950393116",
    money:"8000",
    term: "15",
    presoncardNo :"350102196607090408",
    card:"6212261402023418152",
    bank: "ICBC"
    },
    
    {
    area: "福州",
    appdate: "2017/9/1",
    name: "赵梅玉",
    mobile: "13706977610",
    money:"7000",
    term: "20",
    presoncardNo :"350127197509030964",
    card:"6228480062475090411",
    bank: "ABC"
    },
    
    {
    area: "福州",
    appdate: "2017/9/1",
    name: "陈姜玉",
    mobile: "15080007759",
    money:"7000",
    term: "15",
    presoncardNo :"350122197405154549",
    card:"6217001820085707971",
    bank: "CCB"
    },
    
    {
    area: "青岛",
    appdate: "2017/9/1",
    name: "翟翠翠",
    mobile: "15954256991",
    money:"6000",
    term: "20",
    presoncardNo :"410901198510022321",
    card:"6228480246135264264",
    bank: "ABC"
    },
    
    {
    area: "青岛",
    appdate: "2017/9/1",
    name: "殷鹏",
    mobile: "15166422190",
    money:"10000",
    term: "30",
    presoncardNo :"370203198502267611",
    card:"6222621010019427352",
    bank: "BCOM"
    },
    
    {
    area: "台州",
    appdate: "2017/9/1",
    name: "谢正来",
    mobile: "15888627090",
    money:"10000",
    term: "20",
    presoncardNo :"332603196906075410",
    card:"6228480362312486016",
    bank: "ABC"
    },
    
    {
    area: "台州",
    appdate: "2017/9/1",
    name: "娄浩华",
    mobile: "13285869822",
    money:"8000",
    term: "20",
    presoncardNo :"332624198510131835",
    card:"6217866200012948942",
    bank: "BOC"
    },
    
    {
    area: "合肥",
    appdate: "2017/9/1",
    name: "邵世跃",
    mobile: "13955187853",
    money:"7000",
    term: "20",
    presoncardNo :"340123197808012136",
    card:"6228480669161513579",
    bank: "ABC"
    },
    
    {
    area: "合肥",
    appdate: "2017/9/1",
    name: "马金兵",
    mobile: "15395112424",
    money:"7000",
    term: "20",
    presoncardNo :"340123199101147693",
    card:"6226902302028792",
    bank: "CITIC"
    },
    
    {
    area: "合肥",
    appdate: "2017/9/1",
    name: "王冰滨",
    mobile: "15556953660",
    money:"8000",
    term: "20",
    presoncardNo :"340123199303280572",
    card:"6217001630034569340",
    bank: "CCB"
    },
    
    {
    area: "合肥",
    appdate: "2017/9/1",
    name: "丁胜",
    mobile: "17705606754",
    money:"10000",
    term: "20",
    presoncardNo :"340122199008206031",
    card:"6228480669246320271",
    bank: "ABC"
    },
    
    {
    area: "芜湖",
    appdate: "2017/9/1",
    name: "马明川",
    mobile: "18321256516",
    money:"10000",
    term: "20",
    presoncardNo :"342623198312126870",
    card:"6228481999197648076",
    bank: "ABC"
    },
    
    {
    area: "成都",
    appdate: "2017/9/1",
    name: "张敏",
    mobile: "18180952330",
    money:"6000",
    term: "15",
    presoncardNo :"51012519801031381x",
    card:"6236683810004940912",
    bank: "CCB"
    },
    
    {
    area: "成都",
    appdate: "2017/9/1",
    name: "程勇",
    mobile: "15708409919",
    money:"8000",
    term: "20",
    presoncardNo :"510108198209011214",
    card:"6228480469374608674",
    bank: "ABC"
    },
    
    {
    area: "南通",
    appdate: "2017/9/1",
    name: "谢丽",
    mobile: "13862963811",
    money:"8000",
    term: "20",
    presoncardNo :"32060219800211202x",
    card:"6228480425004242870",
    bank: "ABC"
    },
    
    {
    area: "重庆",
    appdate: "2017/9/1",
    name: "谭小东",
    mobile: "18623315789",
    money:"10000",
    term: "30",
    presoncardNo :"53272619731006187x",
    card:"6217003760030033252",
    bank: "CCB"
    },
    
    {
    area: "重庆",
    appdate: "2017/9/1",
    name: "刘欢",
    mobile: "18523457954",
    money:"10000",
    term: "20",
    presoncardNo :"500231199010083431",
    card:"6222620510017164767",
    bank: "BCOM"
    }
];
class System extends Component {
    constructor(props) {
        super(props);
        let _inter = inter.addUserMessage.data;
        let _face = inter.applyMoneyStep1.data;
        let _info = _inter.CompanyInfo;
        this.state = {
            value: {
                Name: _inter.Name !== "string" && _inter.Name || "无", //姓名
                Mobile: _inter.Mobile !== "string" && _inter.Mobile || "无", //手机
                MobilePwd: _inter.MobilePwd !== "string" && _inter.MobilePwd || "无", //手机密码
                BankCode: _inter.BankCode !== "string" && _inter.BankCode || "无", //开户行

                BankAddress: _inter.BankAddress !== "string" && _inter.BankAddress || "无", //开户行地址
                //Job: "无", //工作
                HouseholdRegister: _inter.HouseholdRegister !== "string" && _inter.HouseholdRegister || "无", //户籍
                Address: _inter.Address !== "string" && _inter.Address || "无", //现居地址

                BankNo: _inter.BankNo !== "string" && _inter.BankNo || "无", //银行卡号
                Age: 0, //年龄
                Sex: 0, //性别,
                MaritalStatus: _inter.MaritalStatus !== "string" && _inter.MaritalStatus && _inter
                    .MaritalStatus
                    .toString() || "0", //婚姻状况
                MaritalRemark: "", //婚姻备注
                BackupMobile: _inter.BackupMobile !== "string" && _inter.BackupMobile || "无", //备用手机号
                HouseStateInfo: "", //房屋信息
                Education: "无", //教育情况
                BankMobile: "无", //预留手机号
            },
            info: {
                Name: _info.Name !== "string" && _info.Name || "",
                Department: _info.Department !== "string" && _info.Department || "无", //部门
                Position: _info.Position !== "string" && _info.Position || "无", //职位
                Address: _info.Address !== "string" && _info.Address || "无",
                Mobile: _info.Mobile !== "string" && _info.Mobile || "无", //公司电话
                EnterTime: _info.EnterTime !== "string" && _info.EnterTime || "2017/9/13", //入职时间
                Money: _info.Money !== "string" && _info.Money || "无", //月薪
                Fund: _info.Fund !== "string" && _info.Fund || "无", //公积金
                FundPassword: _info.FundPassword !== "string" && _info.FundPassword || "无", //公积金密码
            },
            remark: {
                ChildAge: "无", //子女年龄
                ChildSchool: "无", //子女学校
            },
            stateInfo: {
                HouseHost: "无", //户主名
                WaterCard: "无", //水电号
                NearThreeCost: "无",
                HouseArea: "0", //房产情况
                MonthCost: "无" //月供
            },
            otherInfo: {
                contect: [
                    {
                        Relation: "无",
                        Mobile: "无",
                        Name: "无",
                        Address: "无"
                    }
                ],
                loanCard: [
                    {
                        Bank: "无",
                        Quota: "无",
                        Used: "无"
                    }
                ],
                loanWe: [
                    {
                        Name: "无",
                        GetMoney: "无",
                        Rplay: "无"
                    }
                ]
            },
            apply: {
                PersonId: this.props.PersonID,
                ApplyMoney: _face.ApplyMoney !== "decimal" && _face.ApplyMoney || "无", //借款金额
                ApplyTerm: _face.ApplyTerm !== "int32" && _face.ApplyTerm && _face
                    .ApplyTerm
                    .toString() || "无", //申请期限
                StartTime: _face.StartTime !== "dataTime" && _face.StartTime || "", //开始日期
                Payment: _face.Payment !== "string" && _face.Payment || "system", //还款方式
                ComeFrom: _face.ComeFrom !== "string" && _face.ComeFrom && _face
                    .ComeFrom
                    .toString() || "1", //来源
                ComeFromRemark: _face.ComeFromRemark !== "strng" && _face.ComeFromRemark || "无", //来源备注
                WeekMoney: _face.WeekMoney !== "string" && _face.WeekMoney || "无", //可接受还款金额
                BorrowMoneyPurpose: _face.BorrowMoneyPurpose !== "string" && _face.BorrowMoneyPurpose || "无", //借款用途
                Remark: _face.Remark !== "string" && _face.Remark || "无" //备注
            }
        }
        this.post = this
            .post
            .bind(this);
    }
    post(i) {
        inter.addUserMessage.data = this.state.value;
        //console.log(inter.addUserMessage.data.HouseStateInfo);
        inter.addUserMessage.data.CompanyInfo = this.state.info;
        inter.addUserMessage.data.OtherInfo = this.state.otherInfo;
        inter.addUserMessage.data.MaritalRemark = this.state.remark;
        inter.addUserMessage.data.HouseStateInfo = this.state.stateInfo;
        inter.addUserMessage.data.Name = _json[i].name;
        inter.addUserMessage.data.Mobile = _json[i].mobile;
        inter.addUserMessage.data.PersonCardNo = _json[i].presoncardNo;
        inter.addUserMessage.data.BankNo = _json[i].card;
        inter.addUserMessage.data.BankCode = _json[i].bank;
        inter.addUserMessage.data.BankMobile = _json[i].mobile;
        addUserMessage((data) => {
            if (data.error) {
                alert(data.error)
            } else {
                inter.applyMoneyStep1.data = this.state.apply;
                inter.applyMoneyStep1.data.ApplyTerm = _json[i].term;
                inter.applyMoneyStep1.data.ApplyMoney = _json[i].money;
                inter.applyMoneyStep1.data.StartTime = _json[i].appdate;
                inter.applyMoneyStep1.data.PersonId = data;
                postLoanApp((data) => {
                    console.log(data);
                    if (i < _json.length - 1) {
                        i = i + 1;
                        this.post(i);
                    }
                })
            }
        })
    }
    render() {
        return (
            <div>
                <a onClick={() => {
                    this.post(0)
                }}>提交</a>
            </div>
        );
    }
}

export {System};