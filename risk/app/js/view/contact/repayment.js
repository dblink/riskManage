/* jshint ignore :start */
import React, {Component} from 'react';
import {json, getRepaymentList} from '../../config/tableConfig';
import {getCompany} from '../../config/itemConfig';
import {TableTitleBySelect, TableContent} from '../../module/table';
import {Welcome} from '../index';
import PageNumber from '../../module/pageNumber';
import {inter} from '../../config/interface';
import option from '../../../json/option.json';
import {TimeChose, getMaxDay} from '../../module/timeChose/timeChose';
import {DiyDialog, HuaKou, PLhuakou} from '../../module/dialog/dialog';

class RepaymentList extends Component {
    constructor(props) {
        super(props);
        let date = new Date();
        let _data = inter.getRepaymentList.data;
        let stTimeList = props.params.time || _data.st || `${date.getFullYear()}-${date.getMonth()+1}-1`;
        let etTimeList = props.params.time || _data.et || `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

        this.state = {
            listInit: {
                pageIndex: _data.pageIndex || "1",
                pageSize: _data.pageSize || "10",
                company: _data.company || "0",
                mobile: _data.mobile || "",
                borrowname: _data.borrowname || "",
                state: _data.state || "-1",
                et: etTimeList,
                st: stTimeList
            },
            data: ["noData"],
            setting: [],
            pageinfo: "",
            repaymentMoney:"",
            totalMoney:"",
            operate: {
                operate: this
                    .operate
                    .bind(this)
            },
            title: {
                Mobile: _data.mobile,
               /*  Company: _data.company || "0", */
                Borrowname: _data.borrowname,
                State:  _data.state
            },
            show:false,
            dialog: ""
        }
        getCompany((data) => {
            let _init = this.state.listInit;
            let _title = this.state.title;
            //_init.company =  (_data.company.toString() && data[_data.company].primaryText ) || data[0].value === -1 ? data[1].value : data[0].value;
            //console.log(_data.company.toString() && data[_data.company].primaryText);
            _title.Company =  (_data.company.toString() && data[_data.company].primaryText )|| data[0].value === -1 ? data[1].primaryText : data[0].primaryText;
            inter.getRepaymentList.data = _init;
            this.setState({
                listInit: _init,
                title: _title
            }, ()=>{
                getRepaymentList((data) => {
                    this.callBack(data);
                })
            })
            
        })

        //绑定函数
        this.callBack = this
            .callBack
            .bind(this);
        this.inputChange = this.inputChange();
        this.inputChange = this
            .inputChange
            .bind(this);
        this.itemClick = this
            .itemClick
            .bind(this);
        this.changeIndex = this
            .changeIndex
            .bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.operate = this.operate.bind(this);
    }

    callBack(data) {
        let title = this.state.title;
        //console.log(inter.getCompany);
        
        for(let i=0; i<inter.getCompany.callback.length; i++){
            let line = inter.getCompany.callback[i];
            if(line.value === inter.getRepaymentList.data.company){
                title.Company = line.primaryText;
                break;
            }
        }
        //title.Company = inter.getCompany.callback[parseInt(inter.getRepaymentList.data.company) + 1].primaryText;
        title.State = option.repaymentState[parseInt(inter.getRepaymentList.data.state) + 1].primaryText;
        this.setState({
            data: data.data,
            setting: json().repaymentList,
            pageinfo: data.pageinfo,
            repaymentMoney:data.repaymentMoney,
            totalMoney:data.totalMoney,
            title: title
        })
    }

    inputChange(name, value) {
        let timeOut;
        return (name,value) =>{
            timeOut && clearTimeout(timeOut);
            let _title = this.state.title;
            _title[name] = value;
            this.setState({title: _title});
            let that = this;
            inter.getRepaymentList.data[name.toLowerCase()] = value;
            inter.getRepaymentList.data.pageIndex = 1;
            timeOut = setTimeout(()=>{
                getRepaymentList(that.callBack);
            }, 500);
        }
    }

    itemClick(name, value, text) {
        inter.getRepaymentList.data[name.toLowerCase()] = value;
        inter.getRepaymentList.data.pageIndex = 1;
        getRepaymentList(this.callBack);
    }

    changeIndex(index) {
        inter.getRepaymentList.data.pageIndex = index;
        getRepaymentList(this.callBack);
    }

    onSelect(name, value, text, position) {
        let timeList = inter
            .getRepaymentList
            .data[name]
            .split("-");
        timeList[position] = value;
        let maxDay = getMaxDay(timeList[1], timeList[0]);

        if (maxDay < timeList[2]) {
            timeList[2] = maxDay;
        }
        inter.getRepaymentList.data[name] = timeList.join("-");
        inter.getRepaymentList.data.pageIndex = 1;
        getRepaymentList(this.callBack);
    }

    closeDialog(){
        this.setState({
            show: false,
            dialog: ""
        });
        getRepaymentList(this.callBack)
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
                    });
                    break;
                }
            case "manHK":
                {
                    let data = JSON.parse(e.target.getAttribute("data-row"));
                    let _dom = <HuaKou {...data} disabled={false} close={this.closeDialog}/>;
                    this.setState({
                        dialog: _dom,
                        show: true
                    });
                    break;
                }
            case "plhuakou":{
                let _dom = <PLhuakou close={this.closeDialog} />;
                this.setState({
                    dialog : _dom,
                    show: true
                });
                break;
            }
        }
    }

    render() {
        return (
            <Welcome>
                <div style={{"font-size": "24px","text-align": "center", "font-weight": "bold"}}>还款计划表</div>
                {!this.props.params.time && <TimeChose stTime= {inter.getRepaymentList.data.st} etTime={inter.getRepaymentList.data.et} onSelect={this.onSelect} />}
                <div className="clear-both">
                    <div className="block-3 small-font">
                        总金额：{this.state.totalMoney} 元
                    </div>
                    <div className="block-3 small-font">
                        总回款：{this.state.repaymentMoney} 元
                    </div>
                   {/* <div className="block-3 small-font">
                        <a className="href-color" data-show="plhuakou" onClick={this.operate}>全部划扣</a>
                    </div> */}
                </div>
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
                    <TableContent setting={this.state.setting} data={this.state.data} operate={this.state.operate}/>
                </div>
                <PageNumber
                    changeIndex={this.changeIndex}
                    allCount={this.state.pageinfo.TotalCount}
                    index={this.state.pageinfo.PageIndex}
                    allPage={this.state.pageinfo.PageCount}/>
                <DiyDialog show={this.state.show}>
                    {this.state.dialog}
                </DiyDialog>
            </Welcome>
        );
    }
}

export {RepaymentList};
/* jshint ignore :end */