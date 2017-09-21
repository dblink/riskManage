/* jshint ignore : start */
import React, { Component } from 'react';
const FormatList = (props)=>{
    let _json = {};
    return formatJson(props.data, props.setting, props.child);
}
/**
 *  setting = {
 *      name:{
 *          type: map,
 *          chinese: "姓名",
 *          value: {
 *              mName:{
 *                  type:map,
 *                  chinese: "map姓名",
 *                  value: {
 *                      small:{
 *                          type: "json",
 *                          chinese: "小写",
 *                          value: {
 *                              type: "string"
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 *      }
 * }
 *   data = {name: [{mName: [{small:"123"}],{mName:[{small: "456"}] }]}
 */

const formatArray = (data, setting, chinese, children)=>{
    /* data.map((_data)=>{ */
        switch(setting.type){
            /* case "map":{
                return formatArray(data, setting.value, children)
            }
            case "json":{
                return formatJson(data, setting.value, children)
            }   */
            case "json": {
                return <div>{children({value: data, setting: setting, chinese: chinese, })}</div>
            }
            default:{
                return <div>{children({value: data, setting: setting, chinese: chinese})}</div>
            }
        } 
    /* }) */
}

//data: [{name: 1, array:[{a:1,b:2}]}] setting:{type:"map",value:{name:1, array:{"type": "map"}}}
const formatJson = (data, setting, children)=>(
    Object.keys(setting).map((name)=>{
        let _setting = setting[name].value;
        let _data = data && data[name] || "";
        if(!_data) return;
        switch(setting[name].type){
            case "map":{
                return formatArray(_data, _setting, setting[name].chinese, children)
            }
            case "json": {
                return formatJson(_data, _setting, children)
            }
            default: {
                let chinese = typeof setting[name] === "string" && setting[name] ;
                let value = typeof _data !== "undefined" && _data.toString() || "";
                return children({value: value, chinese: chinese, name: name})
            }
        }
    })
)
export {FormatList}
/* jshint ignore : end */