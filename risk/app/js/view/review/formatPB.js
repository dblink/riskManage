/* jshint ignore: start */

const formatPB = (value, setting, callback) => {
    switch (setting.type || typeof setting) {
        case "json":
            {
                /* console.log(`<div> ${setting.chinese}</div>`); */
                return ifJson(value, setting.value, callback);
            }
        case "object":{
             return ifJson(value, setting, callback);
        }
        case "map":
            {
                 /* console.log(`<div> ${setting.chinese}</div>`); */
                return ifMap(value, setting.value, callback);
            }
        default:
            {
                //return {value:value, setting:setting};
                //console.log(value, setting);

                return callback({value: value, setting: setting});
                //return handle({value:value, setting:setting});
            }
    }
}

const ifJson = (value, setting, callback) => {
    return Object
        .keys(setting)
        .map((parameter) => {
           return formatPB(value[parameter], setting[parameter], callback); 
        });
}

const ifMap = (value, setting, callback) => {
    return value.map((line)=>{
        return formatPB(line, setting, callback);
    });
   /*  getHead(setting); */
}

/* const getHead = (setting) =>{
    Object.keys(setting).map((parameter)=>{
        console.log("<div>");
        if(typeof parameter === "object"){
            getHead(setting[parameter]);
        }else{
            console.log(parameter);
        }
        console.log("</div>");
    })
} */

export {formatPB}


/* jshint ignore: end */