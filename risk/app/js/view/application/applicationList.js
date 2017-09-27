/* jshint ignore : start */
import React, { Component } from 'react';
import { Table, TableTitleBySelect, TableContent } from '../../module/table';
import { getApplicationList, json } from '../../config/tableConfig';
import {browserHistory} from 'react-router';
import { getCompany } from '../../config/itemConfig';
import { Welcome } from '../index';
import PageNumber from './../../module/pageNumber';
import { getConvertFormalContract } from '../../config/infoConfig';
import option from '../../../json/option';
import { inter } from '../../config/interface';
import {DiyDialog, ChangeTime, ChangeFinalTerm, ChangeFinalMoney, AddImage} from '../../module/dialog/dialog';

class ApplicationList extends Component {
    constructor(props){
        super(props);
        let date = new Date();
        this.state = {
            value:{
                "mobile": "",
                "name": "",
                "empName": "",
                "st": props.type === "kefu" ? `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` : "",
                "et": "",
                "company": "-1",
                "pageIndex": 1,
                "pageSize": 10,
                "state": "-1"
            },
            operate: {
                'operate': this.operate.bind(this)
            },
            data:["noData"],
            setting: [],
            pageinfo: ["noData"],
            title: {},
            state: true,
            dialog: {
                show: false,
                content: ""
            }
        }
        this.callback = this.callback.bind(this);
        this.getCompanyList = this.getCompanyList.bind(this);
        this.getList = this.getList.bind(this);
        this.changeIndex = this.changeIndex.bind(this);
        this.inputChange = this.inputChange();
        this.inputChange = this.inputChange.bind(this);
        this.itemClick = this.itemClick.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.getCompanyList();
    }
    callback(data){
        if(data.error){
            return;
        }
        let _title= this.state.title;
        _title.Mobile = inter.getApplicationList.data.mobile;
        _title.Name = inter.getApplicationList.data.name;
        //_title.Company = inter.getCompany.callback[parseInt(inter.getApplicationList.data.company)+1].primaryText;
        _title.Company = this.companyText(inter.getApplicationList.data.company);
        _title.State =  option.applicationState[parseInt(inter.getApplicationList.data.state) + 1].primaryText; 
        
        this.setState({
            data: data.data,
            setting : json().applicationListTableSetting,
            pageinfo: data.pageinfo,
            state: true,
            title: _title
        })
    }
    changeIndex(e){
        /* let _value = this.state.value;
        _value.pageIndex = e; */
        inter.getApplicationList.data.pageIndex = e;
        getApplicationList(this.callback);
    }
    getCompanyList(){
        getCompany(this.getList);
    }
    companyText(index){
        let _list = inter.getCompany.callback;
        let _length = _list.length;
        let _text = "";
        for(let i=0;i<_length;i++){
            if(_list[i].value.toString() === index.toString()){
                _text = _list[i].primaryText;
                break;
            }
        }
        return _text;
    }
    
    getList(){
        Object.keys(this.state.value).map(
                (name)=>
                    inter.getApplicationList.data[name] = this.state.value[name]
                );
        getApplicationList(this.callback);
    }
    operate(e){
        let appid = e.target.getAttribute("data-appid");
        switch(e.target.getAttribute("data-operate")){
            case "print":{
                browserHistory.push(`/print/${appid}`);
                break;
            }
            case "set": {
                if(!this.state.state){
                    return;
                }
                this.setState({
                    state: false
                }, ()=>{
                    inter.getConvertFormalContract.data.id = appid;
                    getConvertFormalContract((callback)=>{
                        if(callback.error){
                            alert(callback.error);
                            return;
                        }
                        this.getCompanyList();
                    });
                })
                break;
            }
            case "review": {
                let _empid = e.target.getAttribute("data-appid");
                browserHistory.push(`/auditList/${_empid}/message`);
                break;
            }
            case "changeTime": {
                let _appid = e.target.getAttribute("data-appid");
                let _time = e.target.getAttribute("data-time");
                let _dialog = this.state.dialog;
                _dialog.content = <ChangeTime appid={_appid} time={_time} close={this.closeDialog} />;
                _dialog.show = true;
                this.setState({
                    dialog: _dialog
                })
                break;
            }
            case "changeFinalTerm": {
                let _appid = e.target.getAttribute("data-appid");
                let _term = e.target.getAttribute("data-term");
                let _dialog = this.state.dialog;
                _dialog.content = <ChangeFinalTerm appid={_appid} term={_term} close={this.closeDialog} />;
                _dialog.show = true;
                this.setState({
                    dialog: _dialog
                })
                break;
            }
            case "changeMoney": {
                let _appid = e.target.getAttribute("data-appid");
                let _money = e.target.getAttribute("data-money");
                let _dialog = this.state.dialog;
                _dialog.content = <ChangeFinalMoney appid={_appid} money={_money} close={this.closeDialog} />;
                _dialog.show = true;
                this.setState({
                    dialog: _dialog
                })
                break;
            }
            case "addImage": {
                let _appid = e.target.getAttribute("data-appid");
                let _dialog  =this.state.dialog;
                console.log(1);
                _dialog.content = <AddImage appid={_appid} close={this.closeDialog} />;
                _dialog.show = true;
                this.setState({
                    dialog:_dialog
                })
                break;
            }
        }
    }

    itemClick(name,value,text){
        inter.getApplicationList.data[name.toLowerCase()] = value;
        inter.getApplicationList.data.pageIndex = 1;
        getApplicationList(this.callback);
    }
    
    closeDialog(){
        let _dialog = this.state.dialog;
        _dialog.show = false;
        _dialog.content = "";
        this.setState({
            dialog: _dialog
        }, ()=>{
            this.getList();
        })
    }

    inputChange(name, value) {
        let timeOut;
        return (name, value) => {
            timeOut && clearTimeout(timeOut);
            let that = this;
            let _title = this.state.title;
            _title[name] = value;
            that.setState({title: _title},()=>{
                inter.getApplicationList.data[name.toLowerCase()] = value;
                inter.getApplicationList.data.pageIndex = 1;
                timeOut = setTimeout(function () {
                    getApplicationList((data)=>{that.callback(data)});
                }, 500);
            })
        };
    }

    render() {
        return (
            <Welcome>
                <div style={{"font-size": "24px","text-align": "center", "font-weight": "bold"}}>申请列表</div>
                <div className="data-table" style={{position: "relative"}}>
                    <TableTitleBySelect 
                        setting={this.state.setting} 
                        itemClick={this.itemClick} 
                        inputChange={this.inputChange} 
                        list={this.state.title}/>
                    <TableContent data={this.state.data} setting={this.state.setting} operate={this.state.operate} />
                </div>
                
                {this.state.pageinfo[0] != "noData" && <PageNumber changeIndex={this.changeIndex} allCount={this.state.pageinfo.TotalCount} index={this.state.pageinfo.PageIndex} allPage={this.state.pageinfo.PageCount} />}
                <DiyDialog show={this.state.dialog.show}>
                    {
                        this.state.dialog.content
                    }
                </DiyDialog>
            </Welcome>
            
        );
    }
}

export {ApplicationList};
/* jshint ignore : end */