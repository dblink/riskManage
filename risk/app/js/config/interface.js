/* jshint ignore : start */
const inter = {
    "login": {
        "Chinese": "登录",
        "url": "/api/login/login",
        "type": "post",
        "data": {
            "UserName": "",
            "Password": ""
        },
        "callback": {
            "AllowArea": "string",
            "AreaName": "stirng",
            "CompanyType": "number",
            "CreateTime": "string",
            "DueTime": "string",
            "GroupID": "number",
            "ID": "number",
            "Mobile": "string",
            "Name": "string",
            "PI_LoginIP": "",
            "PI_LoginTime": "",
            "ParentNo": "string",
            "Role": "number",
            "Token": "number"
        },
        "dataType": "json"
    },
    "changePassword":{
        "Chinese": "修改密码",
        "url": "/api/Login/ChangePassword",
        "type": "post",
        "data": {
            "token": "string",
            "password": "string"
        },
        "callback": {}
    },
    "changeTime": {
        "Chinese": "修改时间",
        "url": "/api/Apply/UpdateStartTime",
        "type": "post",
        "data":{
            token: "string",
            id: "string",
            time: "string"
        },
        "callback":{}
    },
    "changeTimeAfterSet":{
        "Chinese": "生成后修改",
        "url": "/api/Contarct/UpdateContarctTime",
        "type": "post",
        "data": {
            token: "string",
            contarctId: "string",
            time: "string"
        }
    },
    "changeFinalTerm": {
        "chinese": "修改周期",
        "url": "/api/Apply/UpdateFinalTerm",
        "type": "post",
        "data": {
            token: "string",
            id: "string",
            trem: "string"
        },
        "callback": {}
    },
    "changeFinalMoney": {
        "chinese": "修改金额",
        "url": "api/Apply/UpdateFinalMoney",
        "type": "post",
        "data": {
            "token": "string",
            "id": "string",
            "money": "string"
        },
        "callback": {}
    },
    "getMenu": {
        "Chinese": "获取菜单栏",
        "url": "/api/home/GetMeun",
        "type": "get",
        "data": {
            "token": ""
        },
        "callback": [
            {
                "GroupID": "string",
                "Items": "array",
                "MeunID": "number",
                "MeunName": "string"
            }
        ],
        "dataType": "json"
    },
    "dismission": {
        "Chinese": "离职",
        "url": "/api/Employees/Dismission",
        "type": "post",
        "data": {
            "token": "",
            "id": ""
        }
    },
    "getRole": {
        "Chinese": "获取添加角色",
        "url": "/api/Employees/GetRole",
        "type": "get",
        "data": {
            "token": ""
        },
        "callback": [
            {
                "PrimaryText": "string",
                "Value": "number"
            }
        ]
    },
    "getCompany": {
        "Chinese": "获取公司列表",
        "url": "/api/Employees/GetCompany",
        "type": "get",
        "data": {
            "token": "string"
        },
        "callback": [
            {
                "PrimaryText": "string",
                "Value": "number"
            }
        ]
    },
    "getLeader": {
        "Chinese": "获取添加领导",
        "url": "/api/Employees/GetLeader",
        "type": "get",
        "data": {
            "token": "string",
            "roleId": "number",
            "company": "number"
        }
    },
    "addEmployee": {
        "Chinese": "添加员工",
        "url": "/api/Employees/AddEmployee",
        "type": "post",
        "data": {
            "token": "string",
            "Name": "string",
            "Mobile": "string",
            "Company": "number",
            "RoleID": "number",
            "LeaderID": "number"
        },
        "callback": {
            "success": "number",
            "error": "object"
        }
    },
    "changeEmployee": {
        "Chinese": "修改员工",
        "url": "/api/Employees/EditEmployee",
        "type": "post",
        "data": {
            "token": "string",
            "Id": "number",
            "Name": "string",
            "Mobile": "string",
            "Company": "number",
            "RoleID": "number",
            "LeaderID": "number"
        },
        "callback": {
            "success": "number",
            "error": "object"
        }
    },
    "getEmployeesList": {
        "Chinese": "获取员工列表",
        "url": "/api/Employees/GetEmployeesList",
        "type": "get",
        "data": {
            "token": "string",
            "mobile": "string",
            "name": "string",
            "chief": "string",
            "company": "string",
            "pageIndex": "number",
            "pageSize": "number"
        },
        "callback": {
            "data": [
                {
                    "ChiefName": "string",
                    "Dismission": "bool",
                    "CompanyName": "string",
                    "Mobile": "string",
                    "Name": "string",
                    "Company": "string",
                    "RoleName": "string",
                    "Id": "number"
                }
            ],
            "pageinfo": {
                "PageCount": "number",
                "PageIndex": "number",
                "PageSize": "number",
                "TotalCount": "number"
            }
        }
    },
    "applyMoneyStep1": {
        "Chinese": "申请步骤1",
        "url": "/api/Apply/AddApply",
        "type": "post",
        "data": {
            "ApplyId":"", //请求id
            "token": "string",
            "ApplyMoney": "decimal", //借款金额
            "ApplyTerm": "int32", //申请期限
            "StartTime": "dataTime", //开始日期
            "Payment": "string", //还款方式
            "ComeFrom": "string",
            "WeekMoney": "string", //可接受还款
            "BorrowMoneyPurpose": "string", //借款用途
            "MonbileReportNo": "string",
            "Remark": "string", //备注
        },
        "callback": {
            "success": "number",
            "error": "object"
        }
    },
    "selectUserMessage": {
        "Chinese": "获取录入过用户信息",
        "url": "/api/Apply/GetBorrowUser",
        "type": "get",
        "data": {
            "token": "string",
            "PersonCardNo": "string", //身份证
        },
        "callback": {
            "success": "number",
            "error": "object"
        }
    },

    "selectUserMessageByAppid": {
        "Chinese": "获取用户信息",
        "url": "/api/Apply/GetBorrowUserByApplyId",
        "type": "get",
        "data": {
            "token": "string",
            "applyId": "number"
        },
        "callbcak": {
            "success": "number",
            "error": "object"
        }
    },

    "addUserMessage": {
        "Chinese": "添加用户信息",
        "url": "/api/Apply/AddOrEditBorrowUser",
        "type": "post",
        "data": {
            "token": "string",
            "Name": "string", //姓名
            "Mobile": "string", //手机
            "MobilePwd": "string", //手机密码
            "BankName": "string", //开户行
            "BankAddress": "string", //开户行地址
            "HouseholdRegister": "string", //户籍
            "Address": "string", //地址
            "BankNo": "string", //银行卡号
            "Age": "string", //年龄
            "Sex": "string", //性别,
            "MaritalStatus": "string", //婚姻状况
            "MaritalRemark": "string", //婚姻备注
            "BackupMobile": "string", //备用手机号
            "HouseStateInfo": "string", //房屋信息
            "CompanyInfo": "string", //公司信息
            "Education": "string", //教育情况
            "OtherInfo": "string", //其他联系人
            "MonbileReportNo": "string" //手机话单数据
        },
        "callback": {
            "success": "number",
            "error": "object"
        }
    },

    "getEditUserMessage": {
        "Chinese": "获取修改用户信息",
        "url": "/api/Apply/GetBorrowUserByEdit",
        "type": "get",
        "data": {
            "token": "string",
            "personCardNo": "string"
        },
        callBack: {
            "success": "number",
            "error": "object"
        }
    },

    "postEditUserMessage":{
        "Chinese": "修改用户信息",
        "url": "/api/Apply/EditBorrowUser",
        "type": "post",
        "data": {
            "token": "string",
            "ID": "string",
            "Name": "string", //姓名
            "Mobile": "string", //手机
            "MobilePwd": "string", //手机密码
            "BankName": "string", //开户行
            "BankAddress": "string", //开户行地址
            "HouseholdRegister": "string", //户籍
            "Address": "string", //地址
            "BankNo": "string", //银行卡号
            "Age": "string", //年龄
            "Sex": "string", //性别,
            "MaritalStatus": "string", //婚姻状况
            "MaritalRemark": "string", //婚姻备注
            "BackupMobile": "string", //备用手机号
            "HouseStateInfo": "string", //房屋信息
            "CompanyInfo": "string", //公司信息
            "Education": "string", //教育情况
            "OtherInfo": "string", //其他联系人
            "MonbileReportNo": "string" //手机话单数据
        },
        "callBack": {
            "success": "number",
            "error": "object"
        }
    },

    "getApplicationList": {
        "Chinese": "获取申请列表",
        "url": "/api/Apply/GetApplyList",
        "type": "get",
        "data": {
            "token": "string",
            "mobile": "string",
            "name": "string",
            "empName": "string",
            "company": "string",
            "pageIndex": "number",
            "pageSize": "number",
            "state": "number"
        },
        "callback": {
            "data": [
                {
                    "Address": "string", //地址
                    "ApplyMoney": "number", //申请金额
                    "ApplyTerm": "number", //申请日期
                    "Company": "number", // 公司
                    "CreateTime": "string", // 创建时间
                    "EmpID": "number", //业务员id
                    "EmpName": "string", //业务员姓名
                    "FinalMoney": "number", //终审金额
                    "FinalTerm": "number", //终审周期
                    "ID": "number", //applyID
                    "Mobile": "number", //用户手机号
                    "Name": "string", //用户姓名
                    "StartTime": "number", //履约日期
                    "State": "number" //状态 0:待审核 1:审核中 2:拒绝 3:待打印 4:已打印
                }
            ],
            "pageinfo": {
                "PageCount": "number",
                "PageIndex": "number",
                "PageSize": "number",
                "TotalCount": "number"
            }
        }
    },

    "getCreditToken": { //ecommerce	电商（支付宝、淘宝） ,wechat
        "Chinese": "获取信用token",
        "url": "/api/GXB/GetToken",
        "type": "get",
        "data": {
            "token": "string",
            "applyId": "string",
            "authItem": "string"
        },
        "callback": {
            "success": "number"
        }
    },

    "CreateTask": {
        "Chinese": "短信详单",
        "url": "/api/Mobile/CreateTask",
        "type": "get",
        "data": {
            "token": "string",
            "id": "string",
            "pesonId": "string"
        },
        "callback": {
            "success": "number",
            "error": {
                "code": {
                    "1": "输入验证码",
                    "2": "重新请求"
                }
            }
        }
    },

    "CreateTaskList": {
        "Chinese": "在申请基本信息中获取手机详单",
        "url": "/api/Mobile/CreateMobileTask",
        "type": "get",
        "data": {
            "token": "string",
            "pesonId": "string",
            "mobile": "string",
            "name": "string",
            "passsword": "string"
        },
        "callback": {
            "success": "number",
            "errorCode": {
                "1": "输入验证码",
                "2": "重新请求TaskState",
                "3": "重新请求CeateTask",
            }
        }
    },

    "InputCode": {
        "Chinese": "输入验证码",
        "url": "/api/Mobile/InputCode",
        "type": "post",
        "data": {
            "token": "string",
            "id": "string",
            "code": "string"
        },
        "callback": {
            "success": "number",
            "errorCode": {
                "1": "输入验证码",
                "2": "重新请求TaskState",
                "3": "重新请求CeateTask"
            }
        }
    },

    "GetTaskState": {
        "Chinese": "查看状态",
        "url": "/api/Mobile/GetTaskState",
        "type": "get",
        "data": {
            "token": "string",
            "id": "string"
        },
        "callback": {
            "success": "number",
            "error": {
                "code": {
                    "1": "输入验证码",
                    "2": "重新请求TaskState",
                    "3": "重新请求CeateTask"
                }
            }
        }
    },

    "UpdateRadar": {
        "Chinese": "信用雷达",
        "url": "/api/Mobile/UpdateRadar",
        "type": "post",
        "data": {
            "token": "string",
            "id": "string"
        },
        "callback": {
            "success": "number",
            "error": {
                "error": "string"
            }
        }
    },

    "PostFrom": {
        "Chinese": "提交完整表单",
        "url": "/api/Apply/SubmitApply",
        "type": "post",
        "data": {
            "token": "string",
            "applyId": "string"
        },
        "callback": {
            "success": "number",
            "error": {
                "error": "string"
            }
        }
    },

    "getReviewList": {
        "Chinese": "审核列表",
        "url": "/api/Approve/GetAuditList",
        "type": "get",
        "data": {
            "token": "string",
            "name": "string",
            "mobile": "string",
            "company": "string",
            "pageIndex": "string",
            "pageSize": "string",
            "state": "string"
        },
        "callback": [
            {
                "Name": "string",
                "ApproveInfoID": "string",
                "Area": "string",
                "Mobile": "string",
                "Money": "int",
                "DetailInfoID": "int", //提交id
                "ApplyID": "int", //查询id
                "StartTime": "string",
                "Term": "string"
            }
        ]
    },

    "getApplyItemInfo": {
        "Chinese": "获取某人信息",
        "url": "/api/Apply/GetApplyItemInfo",
        "type": "get",
        "data": {
            "token": "string",
            "id": "string"
        },
        "callback": {
            "PersonCardNo": "string",
            "WeekMoney": "number",
            "Remark": "string",
            "PersonId": "number",
            "ComeFromRemark": "string",
            "ComeFrom": "number",
            "ID": "number",
            "Payment": "string",
            "StartTime": "string",
            "ApplyTerm": "number",
            "ApplyMoney": "number",
            "BorrowMoneyPurpose": "string"
        }
    },

    "getWechatJson": {
        "Chinese": "微信查询",
        "url": "/api/GXB/GetWechatJson",
        "type": "get",
        "data": {
            "token": "string",
            "id": "string"
        },
        "callback": {}
    },

    "getTaobao": {
        "Chinese": "电商查询",
        "url": "/api/GXB/GetZhiFuBaoJson",
        "type": "get",
        "data": {
            "token": "string",
            "id": "string"
        },
        "callback": {}
    },

    "getMessage": {
        "Chinese": "获取短信详单",
        "url": "/api/Mobile/GetMobileReport",
        "type": "get",
        "data": {
            "token": "string",
            "id": "string"
        },
        "callback": {}
    },

    "postAudit": {
        "Chinese": "提交审核",
        "url": "/api/Approve/Audit",
        "type": "post",
        "data": {
            "token": "string",
            "detailInfoId": "string",
            "money": "string",
            "state": "string",
            "term": "string",
            "remark": "string"
        },
        "callback": {}
    },

    "postImage": {
        "Chinese": "上传图片",
        "url": "/api/Image/UpLoadInfoImage",
        "type": "post",
        "contentType": "multipart/form-data",
        "data": {
            "token": "string",
            "id": "string",
            "uploadFileName": "string"
        }
    },

    "getImage": {
        "Chinese": "获取图片",
        "url": "/api/Image/FindImage",
        "type": "get",
        "data": {
            "token": "string",
            "id": "string"
        }
    },

    "getLaoLai": {
        "Chinese": "老赖",
        "url": "/api/Mobile/GetLaoLai",
        "type": "get",
        "data": {
            "token": "string",
            "id": "string" //applyId
        }
    },

    "getAgreement": {
        "Chinese": "合同数据",
        "url": "/api/Apply/PrintContarct",
        "type": "get",
        "data": {
            "token": "string",
            "id": "string"
        }
    },

    "getConvertFormalContract": {
        "Chinese": "生成合同",
        "url": "/api/Apply/ConvertFormalContract",
        "data": {
            "token": "string",
            "id": "string"
        }
    },

    "getLoanInfoItems": {
        "Chinese": "获取借贷客户列表",
        "url": "/api/PersonalLoan/GetLoanInfoItems",
        "data": {
            "token": "string",
            "pageSize": "string",
            "pageIndex": "string",
            "state": "string",
            "name": "string",
            "area": "string",
            "mobile": "string"
        },
        "dataType": "json",
        "callback": [
            {
                "Address": "string",
                "Area": "string",
                "EndTime": "string",
                "FristRepayTimeDate": "string",
                "Id": "number",
                "ImportState": "string",
                "Mobile": "string",
                "Money": "number",
                "Multiple": "number",
                "Name": "string",
                "StartTime": "string",
                "State": "number",
                "Term": "number",
                "Title": "string"
            }
        ]
    },

    "getContarctList": {
        "Chinese": "获取借款信息",
        "url": "/api/Contarct/GetContarctList",
        "type": "get",
        "data": {
            "token": "", //string
            "mobile": "", //number
            "name": "",//string
            "area": "", //string
            "state": "", //string
            "pageIndex": "", //string
            "pageSize": "" //string
        },
        "callback": [
            {
                "Area": "number",
                "BorrowName": "string",
                "ContarctMoney": "number",
                "EmpId": "number",
                "EmpName": "string",
                "Id": "number",
                "Mobile": "number",
                "ParentNo": "string",
                "StartTime": "string",
                "State": "number",
                "Term": "number"
            }
        ]
    },
    
    "getRepayMentListByContarctId": {
        "Chinese": "通过合同id获取列表",
        "url": "/api/Contarct/GetRepayMentListByContarctId",
        "data": {
            "token": "string",
            "contarctId": "number"
        }
    },

    "getContarctTitle":{
        "Chinese": "贷款详情列表标题",
        "url": "/api/Contarct/GetContarctTitle",
        "data": {
            "token": "string",
            "contarctId": "number"
        }
    },

    "getLoanInfo":{
        "Chinese": "获取代扣信息",
        "url": "/api/Contarct/GetLoanInfo",
        "data": {
            "token": "string",
            "contarctId": "number"
        }
    },

    "daiFu": {
        "Chinese": "代付",
        "url": "/api/Contarct/DaiFu",
        "type": "post",
        "data": {
            "token": "string",
            "contarctId": "number"
        }
    },

    "ConfirmDaiFu": {
        "Chinese": "代付2",
        "url": "/api/Contarct/ConfirmDaiFu",
        "type": "post",
        "data": {
            "token": "string",
            "contarctId": "number",
            "trans_no": "number",
            "trans_batchid": "number"
        }
    },

    "loanConfirm":{
        "Chinese": "人工确认放款操作",
        "url": "/api/Contarct/LoanConfirm",
        "type": "post",
        "data": {
            "token": "string",
            "contarctId": "number"
        }
    },

    "daiKou":{
        "Chinese": "系统代扣",
        "url": "/api/Contarct/DaiKou",
        "type": "post",
        "data": {
            "token" : "string",
            "reId" : "string",
            "money" : "number"
        }
    },

    "daiKouRenGong":{
        "Chinese": "人工代扣",
        "url": "/api/Contarct/RenGongConfirm",
        "type": "post",
        "data": {
            "token": "string",
            "reId" : "string",
            "remark": "string",
            "money": "number"
        }
    },

    "getRecode": {
        "Chinese": "获取审核记录",
        "url": "/api/Approve/GetAuditHistory",
        "type": "get",
        "data": {
            "token": "string",
            "applyId": "string"
        }
    },

    "getTradingManagerList": {
        "Chinese": "财务管理列表",
        "url": "/api/Trading/GetTradingList",
        "type": "get",
        "data":{
            "token": "string",
            "company": "string",
            "st":"string",
            "et":"string",
            "pageIndex":"string",
            "pageSize":"string",
            "state":"string"
        }
    },

    "getStateListByTime":{
        "Chinese": "根据开始时间获取状态表",
        "url": "/api/Contarct/OverduePlansAndPendingRepaymentPlansList",
        "type": "get",
        "data": {
            "token": "string",
            "startTime": "string"
        }
    },

    "getStateListOnMouseOver":{
        "Chinese": "当鼠标移动到当前时间请求数据",
        "url": "/api/Contarct/GetOverduteStateList",
        "data":{
            "token": "string",
            "st" : "string",
            "state": "string"
        }
    },

    "getRepaymentList":{
        "Chinese": "获取还款列表",
        "url": "/api/Contarct/GetRepaymentList",
        "type": "get",
        "data": {
            token:"", //string
            pageIndex:"", //string
            pageSize:"",//string
            company:"",//string
            mobile:"",//string
            name:"",//string
            state:"",//string
            et:"",//string
            st:""//string
        },
        "callBack":{
            type: "map",
            value: {
                
            }
        }
    },
    "settleByPeople": {
        "Chinese": "人工结清",
        "url": "/api/Contarct/JieQingRengGong",
        "type": "post",
        "data": {
            token: "string",
            contarctId:"string",
            remark: "string",
            money: "string",
            type: "string"
        },
        "callback": {}
    },
    "settleBySystem": {
        "Chinese": "系统结清",
        "url":"/api/Contarct/JieQing",
        "type": "post",
        "data": {
            token: "string",
            contarctId:"string",
            remark: "string",
            money: "string",
            type: "string"
        },
        "callback": {}
    },
    "delete": {
        "Chinese": "删除合同",
        "url": "/api/Contarct/UpdateJuJueState",
        "type": "post",
        "data": {
            "token": "string",
            "contarctId": "string"
        },
        "callback":{}
    }
}


const copy = (data, clone = {})=>{
    Object.keys(data).map((e)=>{
        clone[e] = data[e];
    });
    return clone;
}

//restore
const restore = ()=>{
    let _backups = JSON.parse(backups);
    copy(_backups, inter);
}

//backup
const backups = JSON.stringify(inter);


export {restore , inter};

/* jshint ignore : end */