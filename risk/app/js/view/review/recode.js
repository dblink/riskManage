/* jshint ignore: start */
import React, { Component } from 'react';
import {Table} from '../../module/table';
import {json, getRecode} from '../../config/tableConfig';
import {inter} from '../../config/interface';

class Recode extends Component {
    constructor(props){
        super(props);
        this.state={
            setting: json().recode,
            data: ["noData"]
        }
        inter.getRecode.data.applyId = props.appId;
        getRecode((data)=>{this.setState({data: data ? data : ["noData"]})})
    }
    render() {
        return (
            <div>
            {
                this.state.data[0] !== "noData" && this.state.data.map((data)=>{
                   return <Table setting={this.state.setting} data={data.Data} />
                })
            }
            </div>
            
        );
    }
}

export {Recode};
/* jshint ignore: end */
