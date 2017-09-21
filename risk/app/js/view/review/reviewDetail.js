/* jshint ignore : start */
import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import {Table} from '../../module/table';
import {inter} from '../../config/interface';
import {getReviewList} from '../../config/tableConfig';
import {getApplyItemInfo, selectUserMessageByAppid} from '../../config/applyConfig';
import {getLaoLai} from '../../config/infoConfig';

import {MaterialThemeNoMenu as Index} from '../../module/index';
import {Tabs, Tab} from 'material-ui/Tabs';
import {ApplyStep5} from '../application/applyStep5';
import {ApplyStep2} from '../application/applyStep2';
import {ApplyStep3} from '../application/applyStep3';
import {ApplyStep4} from '../application/applyStep4';
import {ApplyStep1} from '../application/applyStep1';
import {MaterialRaisedButton as RaisedButton} from '../../module/buttons';
import {DiyDialog, Result} from '../../module/dialog/dialog';
import {UpLoadImage} from './sendImage';
import {WeChat} from './weChat';
import {Taobao} from './taobao';
import {Telephone} from './callList';
import {Recode} from './recode';
import {FullReport} from './report/fullReport';

const style = {
    tabsContainter: {
        "height": `${document.body.clientHeight -96}px`,
        "max-width": "1040px",
        "margin": "auto",
        'overflow-x': 'hidden',
        'overflow-y': 'auto'
    }
}

class ReviewDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setting: [
                {
                    title: "姓名",
                    attr: "ApplyName",
                    className: "block-3"
                }, {
                    title: "金额",
                    attr: "Money",
                    className: "block-3"
                }, {
                    title: "操作",
                    attr: "Money",
                    className: "block-3",
                    format: (data, attr) => {
                        return <span
                            className="href-color"
                            style={{
                            'display': 'block',
                            "cursor": 'pointer'
                        }}
                            data-apply={data.ApplyID}
                            data-ApproveInfoID
                            ={data.DetailInfoID}>
                            审核
                        </span>
                    },
                    click: "review"
                }
            ],
            applyId: this.props.params.apply,
            detailInfoId: this.props.params.detailInfoId,
            indextTab: "0",
            data: ["noData"],
            personCard: "",
            tabShow: {
                loanInfo: false,
                commonInfo: false
            },
            dialogShow: false,
            operate: {
                review: this
                    .review
                    .bind(this)
            },
            state:"",
            isLaoLai: ""
        }
        this.reviewListCallback = this
            .reviewListCallback
            .bind(this);
        this.applyItemInfoCallback = this
            .applyItemInfoCallback
            .bind(this);
        this.changeTab = this
            .changeTab
            .bind(this);
        this.userMessageCallback = this
            .userMessageCallback
            .bind(this);
        getReviewList(this.reviewListCallback);
        inter.getLaoLai.data.id = inter.getApplyItemInfo.data.id = this.props.params.apply;
        getApplyItemInfo(this.applyItemInfoCallback);
        getLaoLai((data)=>{this.setState({isLaoLai: JSON.parse(data).data})})
        this.dialogOpen = ((e)=>{this.setState({dialogShow : true, state:e})}).bind(this);
        this.dialogClose = (()=>{this.setState({dialogShow : false})}).bind(this);
    }

    reviewListCallback(data) {
        this.setState({
            data: data.data || ["noData"]
        })
    }

    changeTab(value) {
        switch (value) {
            case "1":
                {
                    let _selectUser = inter.selectUserMessage.data;
                    if (_selectUser.token === 'string' || !_selectUser.token) {
                        inter.selectUserMessageByAppid.data.applyId = this.state.applyId;
                        selectUserMessageByAppid(this.userMessageCallback)
                    }
                    break;
                }
        }
        this.setState({indextTab: value});
    }

    applyItemInfoCallback(data) {
        inter.applyMoneyStep1.data = data;
        let _tabShow = this.state.tabShow;
        _tabShow.loanInfo = true;
        this.setState({personCard: data.PersonCardNo, tabShow: _tabShow})
    }

    userMessageCallback(data) {
        inter.addUserMessage.data = data;
        let _tabShow = this.state.tabShow;
        _tabShow.commonInfo = true;
        this.setState({personCard: data.PersonCardNo, tabShow: _tabShow})
    }

    review(e) {
        let id = e.target.getAttribute("data-apply");
        let infoId = e.target.getAttribute("data-approveinfoid");
        browserHistory.push("/auditList/"+id+"/"+infoId);
    }

    render() {
        return (
            <Index className='clear-both'>
                {/* <div className='block-2-20'>
                    <Table setting={this.state.setting} data={this.state.data} operate={this.state.operate} />
                </div> */}
                <div className='block'>
                    <Tabs onChange={this.changeTab} value={this.state.indextTab}>
                        <Tab label="借款信息" value="0" className="zIndex100">
                            <div
                                style={style.tabsContainter}>
                                {this.state.tabShow.loanInfo && <ApplyStep5 static={true} disabled={true}/>}
                            </div>
                        </Tab>
                        <Tab label="基本信息" value="1">
                            <div
                                style={style.tabsContainter}>

                                {
                                    this.state.isLaoLai && <div className="wrong-color">因系统检测，此人是老赖！！！！！！！！</div>
                                }
                                {this.state.indextTab === "1" && this.state.tabShow.commonInfo && <div>
                                    <ApplyStep1 static={true} disabled={true} />
                                    <ApplyStep2 static={true} disabled={true}/>
                                    <ApplyStep3 static={true} disabled={true}/>
                                    <ApplyStep4 static={true} disabled={true}/>
                                </div>}
                            </div>
                        </Tab>
                        <Tab label="微信" value="2">
                            <div style={style.tabsContainter}>
                                {this.state.indextTab === "2"&& <WeChat appId ={this.state.applyId} /> }
                            </div>
                        </Tab>
                        <Tab label="支付宝/淘宝" value="3">
                            <div
                                style={style.tabsContainter}>
                                {this.state.indextTab === "3" && <Taobao appId = {this.state.applyId} />}
                            </div>
                        </Tab>
                        <Tab label="通话详单" value="4">
                            <div style={style.tabsContainter} >
                                {this.state.indextTab === "4" && <Telephone appId = {
                                    this.state.applyId
                                } />}
                            </div>
                        </Tab>
                        {/* <Tab label="雷达" value="5"></Tab> */}
                        <Tab label="图片上传" value="6">
                            {
                                this.state.indextTab === "6" && <UpLoadImage appId={this.state.applyId} />
                            }
                        </Tab>
                        <Tab label="审核记录" value="7">
                            <div style={style.tabsContainter}>
                                {
                                    this.state.indextTab === "7" && <Recode appId = {this.state.applyId} />
                                }
                            </div>
                        </Tab>
                        {<Tab label="报告" value="8">
                            <div style={style.tabsContainter}>
                                {
                                    this.state.indextTab === "8" && <FullReport appId={this.state.applyId} />
                                }
                            </div>
                        </Tab>}
                    </Tabs>
                    {
                        this.state.detailInfoId !== "message" && <div className='clear-both' style={{width: "1024px",margin:"auto"}}>
                            <div className="block-2">
                                <RaisedButton label="通过" primary={true} onClick={()=>this.dialogOpen(0)} />
                            </div>
                            <div className="block-2">
                                <RaisedButton label="拒绝" onClick={()=>this.dialogOpen(1)} />
                            </div>
                        </div>
                    }
                </div>
                <DiyDialog show={this.state.dialogShow}>
                    <Result state={this.state.state} refuse={this.state.state === 1} jump={(e)=>{browserHistory.push(e)}} detailInfoId={this.state.detailInfoId} close={this.dialogClose} />
                </DiyDialog>
            </Index>
        );
    }
}

export {ReviewDetail};
/* jshint ignore : end */