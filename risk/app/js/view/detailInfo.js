/* jshint ignore: start */
import React from 'react';
import Table from '../module/table';
import {dataTableConfig} from '../config/tableConfig';

import {selectUserMessage, addUserMessage} from '../config/applyConfig';
import {inter} from '../config/interface';

export const Info = (props) => {
    let _html = props.data ? props.setting.map((e, key) => {
        let bindData = "undefined";
        let type = typeof props.data[e.attr];
        if(e.attr === "Id"){
            return "";
        }
        switch(type){
            case "string":
            case "number":{
               bindData = props.data[e.attr];
               break;
            }
            case "object": {
                if(!props.data[e.attr].length){
                    bindData = "object";
                }else{
                    /*console.log(props.data[e.attr],dataTableConfig(e.attr))*/
                    bindData = "array";
                    /*bindData = <Table setting={dataTableConfig(e.attr)} data={props.data[e.attr]} />;*/
                }
                break;
            }
            default :{
                /* console.log(props.data, e.attr); */
                bindData = "undefined";
                break;
            }
        }
        return <div className="clear-both InfoList" key={key} title={e.title}>
            <div className="block-2">{e.title}：</div>
            <div className="block-2">{e.format
                    ? e.format(props.data[e.attr])
                    :  bindData }</div>
        </div>
       
    }) : "";
    return <div>{_html}</div>;
};

/* jshint ignore: end */