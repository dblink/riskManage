/* jshint ignore : start */
import React, {Component} from 'react';
import {BlockTwo, BlockThree, FullWidth} from './reportModule';

class CostReport extends Component {
    render() {
        let _props = this.props;
        return (
            <div>
                <div
                    className="container letter-spacing-normal white-color text-center report-title red-bg offset-top-20">
                    消费分析
                </div>
                <FullWidth title="账单最新认证时间">
                    {_props.consumption_analysis.bill_latest_certification_day}
                </FullWidth>
                <BlockTwo title={"最近3月消费总额(元)"} info={(_props.consumption_analysis.total_fee_3m / 100).toFixed(2)} />
                <BlockTwo title={"最近6月消费总额(元)"} info={(_props.consumption_analysis.total_fee_6m / 100).toFixed(2)} />
                <BlockTwo title={"最近3月充值次数"} info={_props.consumption_analysis.recharge_time_3m} />
                <BlockTwo title={"最近6月充值次数"} info={_props.consumption_analysis.recharge_time_6m} />
                <BlockTwo title={"最近3月单次充值最大金额(元)"} info={(_props.consumption_analysis.recharge_max_amount_3m/ 100).toFixed(2)} />
                <BlockTwo title={"最近6月单次充值最大金额(元)"} info={(_props.consumption_analysis.recharge_max_amount_6m/ 100).toFixed(2)} />
                
                
            </div>
        );
    }
}

export {CostReport};