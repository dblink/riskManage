const formatPB = (value, setting, callback) => {
    switch (setting.type || typeof setting) {
        case "json":
            {
                console.log(`<div> ${setting.chinese}</div>`);
                return ifJson(value, setting.value, callback);
            }
        case "object":{
             return ifJson(value, setting, callback);
        }
        case "map":
            {
                 console.log(`<div> ${setting.chinese}</div>`);
                return ifMap(value, setting.value, callback);
            }
        default:
            {
                //return {value:value, setting:setting};
                //console.log(value, setting);
                return handle({value: value, setting: setting});
                //return handle({value:value, setting:setting});
            }
    }
}

const handle = (value)=>{
     console.log(`<div>${value.setting}</div>`);
    console.log(`<div>${value.value}</div>`);
}

const ifJson = (value, setting, callback) => {
    let format = [];
    Object
        .keys(setting)
        .map((parameter) => {
            format.push(formatPB(value[parameter], setting[parameter], callback)); 
        });
    return format;
}

const ifMap = (value, setting, callback) => {
     value.map((line)=>{
        formatPB(line, setting, callback);
    });
    getHead(setting);
}

const getHead = (setting) =>{
    Object.keys(setting).map((parameter)=>{
        console.log("<div>");
        if(typeof parameter === "object"){
            getHead(setting[parameter]);
        }else{
            console.log(parameter);
        }
        console.log("</div>");
    })
}


formatPB([
    {
        "app_point": "string",
        "check_points": {
            "relationship": "string",
            "key_value": "string",
            "contact_name": "string",
            "check_mobile": "string",
            "check_xiaohao": "string"
        }
    }, {
        "app_point": "string",
        "check_points": {
            "relationship": "string",
            "key_value": "string",
            "contact_name": "string",
            "check_mobile": "string",
            "check_xiaohao": "string"
        }
    }
], {
    type: "map",
    value: {
        app_point: "申请要素",
        check_points: {
            "type": "json",
            "value": {
                "relationship": "关系",
                "key_value": "指定号码",
                "contact_name": "联系人姓名",
                "check_mobile": "与该联系人通话记录",
                "check_xiaohao": "联系号码是否为小号"
            },
            "chinese": "要素"
        }
    },
    chinese: "指定申请项校验"
});