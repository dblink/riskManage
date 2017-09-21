/* jshint ignore: start */
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Table, TableContent, TableTitleBySelect} from '../../module/table';
/* import data from '../../../json/loanInfoItem.json'; */
import {Welcome} from '../index';
import {json} from '../../config/tableConfig';
import {getCompany} from '../../config/itemConfig';
import {getLoanList} from '../../config/tableConfig';
import {getGetLoanInfo, loanConfirm} from '../../config/infoConfig';
import {inter} from '../../config/interface';
import {DiyDialog, DaiFu, Settle, ChangeTime, ChangeTimeAfterSet, DeletePeople} from '../../module/dialog/dialog';
import PageNumber from '../../module/pageNumber';
import option from '../../../json/option.json';

class Loan extends Component {
    constructor(props) {
        super(props);
        let _data = inter.getContarctList.data;
        this.state = {
            setting: [],
            data: ["noData"],
            pageinfo: {},
            operate: {
                operate: this
                    .operate
                    .bind(this)
            },
            value: {
                "mobile": _data.mobile,
                "name": _data.name,
                "area": _data.area || "-1",
                "state": _data.state || "-1",
                "pageIndex": _data.pageIndex || "1",
                "pageSize": "10"
            },
            title: {
                "Mobile": _data.mobile,
                "Bame": _data.name,
                "Area": (()=>{
                    let text = "";
                    let _callback = inter.getCompany.callback;
                    for(let i=0;i<_callback.length; i++){
                        if(_callback[i].value === _data.area){
                           text = _callback[i].primaryText;
                           break;
                        }
                    }
                    return text;
                } )(),
                "State": option.loanState[_data.state],
            },
            showDialog: "",
            show: false
        }

        getCompany((area) => {
            let _state = [];
            inter.getContarctList.data = this.state.value;
            getLoanList((data) => {
                this.setState({
                    data: data.data,
                    pageinfo: data.pageinfo,
                    setting: json().loanList
                })
            })
            /* this.setState({setting: json().loanList}) */
        });
        this.itemClick = this
            .itemClick
            .bind(this);
        this.inputChange = this.inputChange();
        this.inputChange = this
            .inputChange
            .bind(this);
        this.close = this
            .close
            .bind(this);
        this.changeIndex = this.changeIndex.bind(this);
    } 
    operate(e) {
        let _page = e
            .target
            .getAttribute("data-page");
        switch (_page) {
            case "daikou":
                {
                    let _id = e
                        .target
                        .getAttribute("data-empid");
                    inter.getLoanInfo.data.contarctId = _id;
                    getGetLoanInfo((data) => {
                        let _demo = <DaiFu
                            contarctId={_id}
                            close={this.close}
                            {...data}/>
                        this.setState({showDialog: _demo, show: true})
                    })
                    break;
                }
            case "pDaikou":
                {
                    let _id = e
                        .target
                        .getAttribute("data-empid");
                    inter.loanConfirm.data.contarctId = _id;
                    loanConfirm((data) => {
                        if (data.error) {
                            alert(data.error);
                            return;
                        }
                        getLoanList((data) => {
                            this.setState({
                                data: data.data,
                                pageinfo: data.pageinfo,
                                setting: json().loanList
                            })
                        })
                    })
                    break;
                }
            case "showLoanList": {
                let _empid = e.target.getAttribute("data-empid");
                browserHistory.push(`/getContarct/${_empid}`);
                break;
            }
            case "jieqing": {
                let _contarctId = e.target.getAttribute("data-empid");
                /* browserHistory.push(`/auditList/${_empid}/message`); */
                let _demo = <Settle contarctId={_contarctId} close={this.close} />
                this.setState({showDialog: _demo, show: true})
                break;
            }
            case "print":{
                let appid = e.target.getAttribute("data-appid");
                browserHistory.push(`/print/${appid}`);
                break;
            }
            case "userMessage":{
                let _appid = e.target.getAttribute("data-appid");
                browserHistory.push(`/auditList/${_appid}/message`);
                break;
            }
            case "changeTime": {
               
                let _contarctId = e.target.getAttribute("data-empid");
                let _time = e.target.getAttribute("data-time");
                let _demo = <ChangeTimeAfterSet contarctId={_contarctId} close={this.close} time={_time} />
                this.setState({
                    showDialog: _demo, show: true
                })
                break;
            }
            case "delete":{
                let _contarctId = e.target.getAttribute("data-empid");
                let _name = e.target.getAttribute("data-name");
                let _demo = <DeletePeople name={_name} contarctId={_contarctId} close={this.close} />
                this.setState({
                    showDialog:_demo, show: true
                })
                break;
            }
        }
    }

    itemClick(name, value, text) {
        let title = this.state.title;
        title[name] = text;
        inter.getContarctList.data[name.toLowerCase()] = value;
        console.log(value);
        inter.getContarctList.data.pageIndex = 1;
        getLoanList((data) => {
            this.setState({
                data: data.data,
                pageinfo: data.pageinfo,
                setting: json().loanList,
                title: title
            })
        })
    }

    changeIndex(e){
        inter.getContarctList.data.pageIndex = e;
        getLoanList((data) => {
            this.setState({
                data: data.data,
                pageinfo: data.pageinfo,
                setting: json().loanList
            })
        })
    }

    inputChange(name, value) {
        let timeOut;
        return (name, value) => {
            timeOut && clearTimeout(timeOut);
            let title = this.state.title;
            let that = this;
            title[name] = value;
            inter.getContarctList.data[name.toLowerCase()] = value;
            inter.getContarctList.data.pageIndex = 1;
            this.setState({title: title})
            timeOut= setTimeout(function () {
                getLoanList((data) => {
                    that.setState({
                        data: data.data,
                        pageinfo: data.pageinfo,
                        setting: json().loanList
                    })
                })
            }, 500);
        };
    }

    close() {
        this.setState({show: false})
        getLoanList((data) => {
            this.setState({
                data: data.data,
                setting: json().loanList,
                showDialog:""
            })
        })
    }

    render() {
        return (
            <Welcome>
                <div style={{"font-size": "24px","text-align": "center", "font-weight": "bold"}}>合同列表</div>
                <div
                    className="data-table"
                    style={{
                    position: "relative"
                }}>
                    <TableTitleBySelect
                        setting={this.state.setting}
                        inputChange={this.inputChange}
                        itemClick={this.itemClick}
                        list={this.state.title}/>
                    <TableContent
                        setting={this.state.setting}
                        data={this.state.data}
                        operate={this.state.operate}/>
                </div>

                {this.state.pageinfo[0] != "noData" && <PageNumber allCount={this.state.pageinfo.TotalCount} changeIndex={this.changeIndex} index={this.state.pageinfo.PageIndex} allPage={this.state.pageinfo.PageCount} />}
                
                <DiyDialog show={this.state.show} close={this.close}>
                    {this.state.showDialog}
                </DiyDialog>
            </Welcome>
        );
    }
}

export {Loan};
/* jshint ignore: end */