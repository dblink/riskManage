/* jshint ignore : start */
import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {Table, TableTitleBySelect, TableContent} from '../../module/table';
import {Welcome} from '../index';
import {getReviewList, json} from '../../config/tableConfig';
import {inter} from '../../config/interface';
import PageNumber from '../../module/pageNumber';
import {getCompany} from '../../config/itemConfig';

class ReviewList extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: {
                data: ["noData"],
                pageinfo: {},
                setting: []
            },
            operate: {
                'operate': this.operate.bind(this)
            },
            title: {

            }
        }
        this.reviewList = this.reviewList.bind(this);
        this.reviewList();
        this.changeIndex = this.changeIndex.bind(this);
        this.inputChange = this.inputChange();
        this.inputChange = this.inputChange.bind(this);
        this.callback = this.callback.bind(this);
        this.itemClick =  this.itemClick.bind(this);
    }
    reviewList(){
        getCompany(()=> getReviewList(this.callback));
        
    }
    changeIndex(e){
        inter.getReviewList.data.pageIndex = e;
        this.reviewList();
    }
    callback(data){
        let _value = this.state.value;
        _value.data = data.data;
        _value.pageinfo = data.pageinfo;
        _value.setting  = json().reviewList;
        this.setState({
            value: _value
        })
    }
    operate(e){
        let applyid =  e.target.getAttribute("data-applyid");
        let detailInfoId = e.target.getAttribute("data-postid");
        browserHistory.push(`/auditList/${applyid}/${detailInfoId}`);
    }

    inputChange(name, value){
        let timeOut;
        return (name,value) =>{
            timeOut && clearTimeout(timeOut);
            let _title = this.state.title;
            _title[name] = value;
            this.setState({title: _title});
            let that = this;
            inter.getReviewList.data[name.toLowerCase()] = value;
            inter.getReviewList.data.pageIndex = 1;
            timeOut = setTimeout(()=>{
                getReviewList((data)=>{that.callback(data)});
            }, 500);
        }
    }

    itemClick(name, value, text) {
        let _title = this.state.title;
        _title[name] = text;
        inter.getReviewList.data[name.toLowerCase()] = value;
        inter.getReviewList.data.pageIndex = 1;
        getReviewList((data) => {
            this.setState({
                title: _title,
                data: data.data,
                pageinfo: data.pageinfo
            })
        });
    }

    render() {
        return (
            <Welcome>
                <div style={{"font-size": "24px","text-align": "center", "font-weight": "bold"}}>审核列表</div>
                <div style={{position: "relative"}} className="data-table">
                    <TableTitleBySelect setting={this.state.value.setting} inputChange={this.inputChange} itemClick={this.itemClick} list={this.state.title} />
                    <TableContent data={this.state.value.data} setting={this.state.value.setting} operate = {this.state.operate} />
                </div>
                
                {/* <Table data={this.state.value.data} setting={this.state.value.setting} operate = {this.state.operate} /> */}
                {this.state.value.data[0] != "noData" && <PageNumber changeIndex={this.changeIndex} allCount={this.state.value.pageinfo.TotalCount} index={this.state.value.pageinfo.PageIndex} allPage={this.state.value.pageinfo.PageCount} />}
            </Welcome>
        );
    }
}

export {ReviewList};
/* jshint ignore : end */
