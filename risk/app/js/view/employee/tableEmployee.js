/* jshint ignore: start */
import React, { Component } from 'react';
import { TableTitleBySelect, TableContent} from '../../module/table';
import { MaterialPaper as Layer } from '../../module/layer';
import {json, getEmployeeList} from '../../config/tableConfig';
import {getCompany} from '../../config/itemConfig';
import PageNumber from '../../module/pageNumber';
import {DiyDialog, Dismission, Employee} from '../../module/dialog/dialog';
import {AddPopover} from './addEmployee';
import {Welcome} from '../index';

import {inter} from '../../config/interface';

class EmployeeTable extends Component {
    constructor(props){
        super(props);
        this.state={
            data: ["noData"],
            pageinfo: "",
            dialog: {
                show: false,
                content: ""
            },
            init:{
                chief:"",
                company: -2,
                name: "",
                pageIndex: 1,
                pageSize: 10,
                mobile: ""
            },
            setting:[""],
            operate: {
                'operate' : this.operate.bind(this)
            },
            title:{}
        }
        this.employeeList = this.employeeList.bind(this);
        this.getEmployeeList = getEmployeeList.bind(this);
        this.dataChange = this.dataChange.bind(this);
        
        this.employeeList(this.dataChange);
        this.close = this.close.bind(this);
        this.changeIndex = this.changeIndex.bind(this);
        
        this.itemClick = this.itemClick.bind(this);
        this.inputChange = this.inputChange();
        this.inputChange = this.inputChange.bind(this);
    }

    employeeList(){
        getCompany(()=>{
            inter.getEmployeesList.data = this.state.init;
            this.getEmployeeList(this.dataChange)});
    }

    dataChange(data){
        let _title = this.state.title;
        _title.Company = inter.getCompany.addAllData[parseInt(inter.getEmployeesList.data.company)+2].primaryText;
        this.setState({
            data: data.data,
            setting: json().employeeListTableSetting,
            title: _title,
            pageinfo: data.pageinfo
        })
    }
    
    operate(e){
        //console.log(e);
        let show = e.target.getAttribute("data-show");
        switch(show){
            case "dismission": {
                let json = {}; 
                json.id = e.target.getAttribute("data-id");
                this.setState({
                    dialog: {
                        show: true,
                        content: Dismission,
                        data: json
                    }
                })
                break;
            }
            case "employee": {
                this.setState({
                    dialog: {
                        show: true,
                        content: Employee,
                        data: JSON.parse(e.target.getAttribute("data-package"))
                    }
                })
                break;
            }
        }
    }

    changeIndex(e){
        inter.getEmployeesList.data.pageIndex = e;
        this.getEmployeeList(this.dataChange);
    }

    close(e){
        this.setState({
            dialog: {
                show: false,
                content: "",
                data: ""
            }
        });
        this.getEmployeeList(this.dataChange);
    }

    itemClick(name, value, text){
        inter.getEmployeesList.data[name.toLowerCase()] = value;
        inter.getEmployeesList.data.pageIndex = 1;
        getEmployeeList(this.dataChange);
    }

    inputChange(){
        let timeout;
        return (name, value) => {
            timeout&&clearTimeout(timeout);
            let title = this.state.title;
            title[name] = value;
            this.setState({title: title});
            inter.getEmployeesList.data[name.toLowerCase()] = value;
            inter.getEmployeesList.data.pageIndex = 1;
            timeout = setTimeout(()=>{
                getEmployeeList(this.dataChange);
            }, 500)
        }
    }
    
    render() {
        let Content = this.state.dialog.content;
        return (
            <Welcome>
                <div style={{"font-size": "24px","text-align": "center", "font-weight": "bold"}}>员工列表</div>
                <AddPopover request={this.employeeList} />

                <Layer className="data-table" zDepth={this.state.data.length > 1 ? 1 : 0} style={{width: '95%', 'max-width': '1000px', margin: '10px auto'}}>
                    <TableTitleBySelect setting={this.state.setting} itemClick={this.itemClick} inputChange={this.inputChange} list={this.state.title}/>
                    <TableContent setting={this.state.setting} data={this.state.data} operate={this.state.operate} />
                     {/* <Table data={this.state.data} chose={false} setting={this.state.json.employeeListTableSetting}  operate={this.state.operate} /> */}
                </Layer>
                {this.state.pageinfo[0] != "noData" && <PageNumber allCount={this.state.pageinfo.TotalCount} changeIndex={this.changeIndex} index={this.state.pageinfo.PageIndex} allPage={this.state.pageinfo.PageCount} />}
                
                {<DiyDialog show={this.state.dialog.show} onClick={this.close} >
                    {
                        Content && <Content {...this.state.dialog.data} close={this.close}/>
                    }
                </DiyDialog>}
            </Welcome>
        );
    }
}

export  {EmployeeTable};
/* jshint ignore: end */