/* jshint ignore: start */
import React, {Component} from 'react';
import {inter} from '../../config/interface';
import {getRepayMentListByContarctId, getRepayMentListTitle} from '../../config/applyConfig';
import {json} from '../../config/tableConfig';
import {TableTitle, TableContent} from '../../module/table';
import {getCompany} from '../../config/itemConfig';
import {Welcome} from '../index';
import {DiyDialog, HuaKou} from '../../module/dialog/dialog';

class LoanList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            data: ["noData"],
            setting: [],
            operate: {
                operate: this
                    .operate
                    .bind(this)
            },
            show: false,
            dialog: ""
        }
        inter.getRepayMentListByContarctId.data.contarctId = props.params.empid;
        inter.getContarctTitle.data.contarctId = props.params.empid;
        getRepayMentListTitle((data) => {
            this.setState({userInfo: data})
        })
        getCompany(() => {
            getRepayMentListByContarctId((data) => {
                this.setState({
                    data: data,
                    setting: json().loadListOne
                })
            })
        })
        this.closeDialog = this
            .closeDialog
            .bind(this);
    }

    closeDialog() {
        this.setState({show: false});
        getRepayMentListByContarctId((data) => {
            this.setState({
                data: data,
                dialog: "",
                setting: json().loadListOne
            })
        })
    }

    operate(e) {
        let show = e
            .target
            .getAttribute("data-show");
        switch (show) {
            case "autoHK":
                {
                    let data = JSON.parse(e.target.getAttribute("data-row"));
                    this.setState({
                        dialog: <HuaKou {...data} disabled={true} close={this.closeDialog}/>,
                        show: true
                    })
                    break;
                }
            case "manHK":
                {
                    let data = JSON.parse(e.target.getAttribute("data-row"));
                    let _dom = <HuaKou {...data} disabled={false} close={this.closeDialog}/>;
                    this.setState({
                        dialog: _dom,
                        show: true
                    })
                    break;
                }
        }
    }

    render() {
        let padding;
        padding = this.state.data.length * 48 > document.body.clientHeight && 18 || 0;
        return (
            <Welcome>
                <div className="clear-both">
                    <div
                        className="block-3 text-center"
                        style={{
                        height: "3.5rem",
                        "line-height": "3.5rem"
                    }}>
                        姓名：{this.state.userInfo.Name}
                    </div>
                    <div
                        className="block-3 text-center"
                        style={{
                        height: "3.5rem",
                        "line-height": "3.5rem"
                    }}>
                        借款金额：{this.state.userInfo.ContarctMoney}
                    </div>
                    <div
                        className="block-3 text-center"
                        style={{
                        height: "3.5rem",
                        "line-height": "3.5rem"
                    }}>
                        借款周期：{this.state.userInfo.Term}
                    </div>
                    <div
                        className="block-2 text-center"
                        style={{
                        height: "3.5rem",
                        "line-height": "3.5rem"
                    }}>
                        开始时间：{this.state.userInfo.StartTime && this
                            .state
                            .userInfo
                            .StartTime
                            .replace(/T.*/, "")}
                    </div>
                    <div
                        className="block-2 text-center"
                        style={{
                        height: "3.5rem",
                        "line-height": "3.5rem"
                    }}>
                        结束时间：{this.state.userInfo.EndTime && this
                            .state
                            .userInfo
                            .EndTime
                            .replace(/T.*/, "")}
                    </div>
                </div>
                <div className="data-table">
                    <div
                        style={{
                        "padding-right": padding + "px"
                    }}>
                        <TableTitle setting={this.state.setting}/>
                    </div>

                    <div
                        style={{
                        height: document.body.clientHeight - 161 + "px",
                        "overflow": "auto"
                    }}>
                        <TableContent
                            setting={this.state.setting}
                            data={this.state.data}
                            operate={this.state.operate}/>
                    </div>

                </div>
                
                <DiyDialog show={this.state.show}>
                    {this.state.dialog && this.state.dialog}
                </DiyDialog>
            </Welcome>
        );
    }
}

export {LoanList};
/* jshint ignore: end */