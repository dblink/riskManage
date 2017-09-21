/* jshint ignore : start */
import React, { Component } from 'react';
import {BlockTwo} from './reportModule';

class ActiveDegree extends Component {
    render() {
        let _props = this.props;
        return (
            <div>
                <div className="container letter-spacing-normal white-color text-center report-title red-bg offset-top-20">
                    活跃分析
                </div>
                <BlockTwo title={"最近3月通话活跃天数"} info={_props.active_degree.call_day_3m} />
                <BlockTwo title={"最近6月通话活跃天数"} info={_props.active_degree.call_day_6m} />
                <BlockTwo title={"最近3月主叫次数"} info={_props.active_degree.dial_num_3m} />
                <BlockTwo title={"最近6月主叫次数"} info={_props.active_degree.dial_num_6m} />
                <BlockTwo title="最近3月被叫次数" info={_props.active_degree.dialed_num_3m} />
                <BlockTwo title="最近6月被叫次数" info={_props.active_degree.dialed_num_6m} />
                <BlockTwo title="最近3月主叫时长(分钟)" info={Math.floor(_props.active_degree.dial_duration_3m / 60)} />
                <BlockTwo title="最近6月主叫时长(分钟)" info={Math.floor(_props.active_degree.dial_duration_6m / 60)} />
                <BlockTwo title="最近3月被叫时长(分钟)" info={Math.floor(_props.active_degree.dialed_duration_3m / 60)} />
                <BlockTwo title="最近6月被叫时长(分钟)" info={Math.floor(_props.active_degree.dialed_duration_6m / 60)} />
            </div>
        );
    }
}

export {ActiveDegree};