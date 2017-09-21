/* jshint ignore : start */
const format = (data, setting) => {
    switch (setting.type) {
        case "map":
            {
                //如果type是map 进入ifMap
                return ifMap(data, setting.value);
            }
        case "json":
            {
                //如果type是json 进入ifJson,
                return ifJson(data, setting.value);
            }
    }
}

//如果是map (data, settting.value)
const ifMap = (data, setting) => {

    /* Object.keys(setting).map((_set) => { */
            let _json = {
                title: "",
                name: "",
                data: []
            };

            let _data = {
                title: "",
                name : "",
                data: [],
                setting: []
            }
            //console.log(setting, _set);

            /* switch (typeof setting[_set]) {
                case "object":
                    {
                        let newMap = [];
                        _json.title = setting[_set].chinese;
                        
                        data && data.map((line) => {
                            if (setting[_set].type === "map") {
                                newMap = line[_set];
                            } else {
                                newMap.push(line[_set]);
                            }
                            //console.log(line);
                        });

                        //console.log(newMap);
                        _json.data = ifMap(newMap, setting[_set].value);
                        
                        return _json
                    }
                default:
                    { */
                        /* _json.title = setting[_set]; */

                        /* let _setting = [];
                        let _data = []; */

                        _data.title = setting.chinese;
                        _data.data = data || ["无"];

                        _data.setting = Object.keys(setting).map((_key)=>{
                            return {name: setting[_key] , attr: _key, className:"block-2-10"}
                        });

                        /* data && data.map((line) => {
                            _json
                                .data
                                .push(line && line[_set] || "");
                        }) */

                        /* if (!data) {
                            _json.data = ["无"];
                        }
                        _json.name = _set; */

                        return _data;
                  /*  }
            }
         }) */
}

const ifJson = (data, setting) => {
    return Object
        .keys(setting)
        .map((_set) => {
            if (!data) {
                return {
                    title: setting[_set].chinese || setting[_set],
                    name: _set,
                    data: "无数据"
                }
            }
            switch (typeof setting[_set]) {
                case "object":
                    {
                        return {
                            title: setting[_set].chinese,
                            data: split(data[_set], setting[_set])
                        };
                    }
                case "string":
                    {
                        return {
                            title: setting[_set],
                            name: _set,
                            data: data[_set] || ""
                        }
                    }
            }
        })
}

const split = (data, setting) => {
    switch (setting.type) {
        case "map":
            {
                return ifMap(data, setting.value);
            }
        default:
            {
                return ifJson(data, setting.value);
            }
    }
}


export {format, ifJson, ifMap}

/* jshint ignore : end */
