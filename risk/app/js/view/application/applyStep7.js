/* jshint ignore:  start */
import React, { Component } from 'react';
import {MaterialTextField as Input} from '../../module/input/input';
import {FormBlock} from '../../module/form/formBlock';

import {MaterialFlatButton as FlatButton} from '../../module/buttons';
import {getCreditToken, createTask, inputCode, getTaskState, updateRadar, postFrom} from '../../config/applyConfig';
import {inter} from '../../config/interface';
import CircularProgress from 'material-ui/CircularProgress';

import {Tabs, Tab} from 'material-ui/Tabs';

import iphone from '../../../img/iphone4.png';


const style={
    formInput: {
        display: 'inline-block', 
        width: '250px',
        overflow: "hidden",
        "vertical-align": "middle"
    },
    formSelect: {
        display: 'inline-block', 
        width: '250px',
        overflow: "hidden",
        "vertical-align": "top"
    },
    formTextarea: {
        display: 'inline-block', 
        width: '250px',
        overflow: "hidden",
        "vertical-align": "bottom"
    }
}

class ApplyStep7 extends Component {
    constructor(props){
        super(props);
        let _data = inter.getCreditToken.data
        _data.applyId = this.props.applyID;
        this.state = {
            value: {
                wechat: {
                    token: "",
                },
                ecommerce: {
                    token: ""
                }
            },
            credit:{
                button: true,
                loading: false,
                success: false,
                fail: false
            },
            error: "",
            finishSuccess: "",
            finishLoading: "",
            finish:"提交",
            indexPage: '0',
            codeValue: "",
            code: false,
            button: true,
            loading: false,
            success: false,
            fail: false,
            time: 0
        }
        
        let array = ['wechat', 'ecommerce'];
        array.map((item)=>{
                _data.authItem = item
                getCreditToken((data)=>{
                        let _value=  this.state.value;
                        _value[item] = data;
                        return this.setState({value: _value});
                    }
                )
            })

        this.apply = this.apply.bind(this);
        this.postTask = this.postTask.bind(this);
        this.inputCode = this.inputCode.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.postRadar = this.postRadar.bind(this);
        this.judgeCallBack =  this.judgeCallBack.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    postTask(){
        inter.CreateTask.data.id = this.props.applyID;
        inter.CreateTask.data.pesonId = this.props.personID;

       !this.state.loading && this.setState({
            code: false,
            button: false,
            loading: true,
            success: false,
            fail: false
        })
        createTask((data)=>{
            this.judgeCallBack(data.errorCode);
        })
    }

    inputChange(name, value){
        let _state = this.state;
        _state[name] = value;
        this.setState(_state);
    }

    inputCode(){
        inter.InputCode.data.id = this.props.applyID;
        inter.InputCode.data.code = this.state.codeValue;
        inputCode((data)=>{
             this.judgeCallBack(data.errorCode);
        })
    }

    getTaskState(){
        inter.GetTaskState.data.id = this.props.applyID;
        getTaskState((data)=>{
            this.judgeCallBack(data.errorCode);
        })
    }

    judgeCallBack(data){
          switch(data){
                case 1: {
                    this.setState({
                        button: false,
                        code: true,
                        loading: false,
                        success: false,
                        fail: false,
                        time: 0
                    })

                    break;
                }
                case 2: {
                    if(this.state.time > 3){
                        this.setState({
                            button: false,
                            code: false,
                            loading: false,
                            success: false,
                            fail: false,
                            time: 0
                        });
                        alert("登录失败！");
                        break;
                    }
                    !this.state.loading && this.setState({
                        button: false,
                        code: false,
                        loading: true,
                        success: false,
                        fail: false,
                        time: this.state.time + 1
                    })
                    
                    setTimeout(function() {
                        this.getTaskState();
                    }.bind(this), 2000);
                    break;
                }
                case 3: {
                    !this.state.loading && this.setState({
                        button: false,
                        code: false,
                        loading: true,
                        success: false,
                        fail: false
                    })
                    this.postTask();
                    break;
                }
                default: {
                    this.setState({
                        button: false,
                        code: false,
                        loading: false,
                        success: true,
                        fail: false
                    })
                }
            }
    }

    handleChange(value){
        this.setState({
            indexPage: value
        })
    }

    postRadar(){
        let _credit = this.state.credit;
        _credit.button = false;
        _credit.loading = true;
        _credit.fail = false;
        _credit.success = false
        this.setState({
            credit: _credit
        });
        inter.UpdateRadar.data.id = this.props.applyID;

        updateRadar((data)=>{
            let _credit = this.state.credit;
            if(data === 0){
                _credit.button = false;
                _credit.loading = false;
                _credit.fail = false;
                _credit.success = true;
            }
            if(data.error){
                _credit.button = true;
                _credit.loading = false;
                _credit.fail = data.error;
                _credit.success = false;
            }
            this.setState({
                credit: _credit
            })
        })
    }

    apply(index){
        inter.PostFrom.data.applyId = this.props.applyID;
        this.setState({
            finish: false,
            finishLoading: true,
            error:'',
            finishSuccess: ''
        })
        postFrom((data)=>{
            data.error && this.setState({
                finish: '再次提交',
                error: data.error,
                finishLoading: false
            });
            if(data === 0){
                this.setState({
                    finishSuccess: "提交成功！",
                    finishLoading: false
                });
                alert("提交成功！");
                this.props.clear();
            }
        });
        
    }


    render() {
        let _callback = "http://qq.szytjf.com/success.html";
        return (
            <div style={{'max-width': "1000px", 'position':'relative'}}>
                 <Tabs
                        value={this.state.indexPage}
                        onChange={this.handleChange}
                        style={{'max-width': "1000px"}}
                    >
                    <Tab label="获取微信信息" value="0">
                        <div>
                            {
                                 this.state.value.wechat.token && <iframe 
                                    width = "80%"
                                    height = "450"
                                    frameborder = "0"
                                    style={{'border': 'none'}}
                                    src={`https://prod.gxb.io/auth.html?token=${this.state.value.wechat.token}&returnUrl=${_callback}&title=电商认证&style=pc`}>
                                </iframe>
                            }
                        </div>
                    </Tab>
                    <Tab label="获取支付宝信息" value="1">
                        <div>
                           { this.state.value.ecommerce.token && <iframe 
                                width = "80%"
                                height = "450"
                                frameborder = "0"
                                style={{'border': 'none'}}
                                src={`https://prod.gxb.io/auth.html?token=${this.state.value.ecommerce.token}&returnUrl=${_callback}&title=电商认证&style=pc`}>
                            </iframe>}
                        </div>
                    </Tab>
                </Tabs>
                 {this.state.error && <div className="wrong">{this.state.error}</div>}
                 {this.state.finish && <FlatButton primary={true} fullWidth={true} style={{margin: '10px 0'}} label={this.state.finish} onClick={()=>this.apply(0)} />}
                 {this.state.finishSuccess && <FlatButton primary={true} fullWidth={true} style={{margin: '10px 0'}} label={this.state.finishSuccess} />}
                 {this.state.finishLoading && <FlatButton primary={true} fullWidth={true} style={{margin: '10px 0'}} label={<CircularProgress />} /> }
              </div>
        );
    }
}

export { ApplyStep7 };
/* jshint ignore: end */