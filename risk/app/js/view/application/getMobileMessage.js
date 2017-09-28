/* jshint ignore: start */
import React, {Component} from 'react';
import {inter} from '../../config/interface';
import {MaterialFlatButton as FlatButton} from '../../module/buttons';
import {MaterialTextField as Input} from '../../module/input/input';
import {FormBlock} from '../../module/form/formBlock';
import {createTaskList, inputCode, getCode, getTaskState, getUserMessage} from '../../config/applyConfig';

class GetMobileMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                password: props.password || "",
                mobile: props.mobile || "",
                name: props.name,
                pesonId: props.pesonId
            },
            inputCode:{
                code: ""
            },
            code:{
                state:true,
                chinese: "未收到验证码？",
                times: 60
            },
            error: {
                password: "",
                mobile: "",
                name: "",
                pesonId: "",
                code:""
            },
            input:{
                state : false,
                chinese: "提交",
                dialog: false
            },
            action: {
                state: true,
                chinese: "验证手机号"
            },
            times: 0,
            createTimes: 0
        }
        this.action = this.action.bind(this);
        this.createTaskCallBack = this.createTaskCallBack.bind(this);
        this.sendInput = this.sendInput.bind(this);
        this.getCode = this.getCode.bind(this);
        this.startCountDown = this.startCountDown.bind(this);
    }
    action(e) {
        //如果state为false,无法再次请求
        if(!this.state.action.state){
            return;
        }

        let json = this.judge(this.state.value); //判断是否为空
        if(json.isNull && json.name !== "name"){
            let error = this.state.error;
            //console.log(json.name);
            error[json.name] = "不能为空";
            this.setState({
                error: error
            })
            return;
        }

        if(!this.props.name){
            alert("姓名不能为空!");
        return;
        }

        let _action = this.state.action;
        _action.state = false;
        _action.chinese = "验证中……";
        
        this.setState({
            _action: _action
        },()=>{ //设置状态成功后
        
            inter.CreateTaskList.data = this.state.value;
            inter.CreateTaskList.data.name = this.props.name;
            this.createTask();
        })
    }

    createTask(){
        createTaskList((data)=>{
            if(data.id){
                inter.GetTaskState.data.id = data.id;
                inter.InputCode.data.id = data.id;
                this.createTaskCallBack(data);
            }else{
                let _action = this.state.action;
                _action.chinese = "重新验证";
                _action.state = true;
                this.setState({
                    action : _action
                })
                alert(data.error);
            }
        });
    }

    createTaskCallBack(data){
        if(!data.errorCode){
            
            if(this.state.createTimes === 0){
                this.setState({
                    createTimes: 1,
                    times: 0
                }, () => {getTaskState(this.createTaskCallBack)});
                return; 
            }

            let _action = this.state.action;
            let _input = this.state.input;
            _action.state = false;
            _action.chinese = "获取成功！";
            _input.dialog = false;
            this.props.getMessage(inter.GetTaskState.data.id);
            this.setState({
                action: _action,
                input: _input,
                times: 0
            })
            return;
        }else{
            switch(parseInt(data.errorCode)){
                case 1: { //如果错误码为1，显示输入验证码
                    let _input = this.state.input;
                    let _inputCode = this.state.inputCode;
                    _inputCode.code = "";
                    _input.dialog = true;
                    _input.state = true;
                    _input.chinese = "提交";
                    this.setState({ //打开dialog
                        input: _input,
                        inputCode: _inputCode,
                        src: data.src
                    });
                    break;
                }
                case 2: { //如果错误码为2, 次数大于3次， 直接提示error
                    if(this.state.times > 3){
                        //console.log(data.error);
                        alert(data.error);
                        let _input = this.state.input;
                        let _action = this.state.action;
                        let _inputCode = this.state.inputCode;
                        _input.dialog = false;
                        _input.state = false;
                        _action.state = true;
                        _inputCode.code = "";
                        _action.chinese = "再次验证";
                        this.setState({ //关闭dialog，“验证”可以点
                            input: _input,
                            action: _action,
                            inputCode: _inputCode,
                            times: 0
                        })
                        return;
                    }
                    this.setState({
                        times : this.state.times + 1
                    }, ()=>{
                        let _this = this;
                        setTimeout(function() { //每10秒请求一次
                            getTaskState(_this.createTaskCallBack);
                        }, 10000);
                    })
                    break;
                    
                }
                case 3: {
                    alert(data.error);
                    let _input = this.state.input;
                    let _action = this.state.action;
                    _input.dialog = false;
                    _input.state = false;
                    _action.state = true;
                    _action.chinese = "重新验证"
                    this.setState({ //关闭dialog， “验证”可以点
                        input: _input,
                        action: _action,
                        times: 0
                    })
                    break;
                }
                default: {
                    alert(data);
                    let _input = this.state.input;
                    let _action = this.state.action;
                    _input.dialog = false;
                    _input.state = false;
                    _action.state = true;
                    _action.chinese = "验证"
                    this.setState({ //关闭dialog， “验证”可以点
                        input: _input,
                        action: _action,
                        times: 0
                    })
                    break;
                }
            }
        }
    }

    sendInput(){ //验证码请求
        if(!this.state.input.state){
            return;
        }
        inter.InputCode.data.code = this.state.inputCode.code;
        let _input = this.state.input;
        _input.state = false;
        _input.chinese = "提交中";
        this.setState({
            input: _input
        }, ()=>{
            inputCode((data)=>{
                let _inputGo = this.state.input;
                _inputGo.state = false;
                if(data === 0){
                    this.setState({
                        times: 0,
                        input: _inputGo
                    })
                    getTaskState(this.createTaskCallBack);
                }else{
                    alert(data.error);
                    _inputGo.chinese = "再次提交";
                    _inputGo.state = true;
                    this.setState({
                        times: 0,
                        input: _inputGo
                    })
                }
                
            }); //callback 判断
        })
    }

    getCode(){ //发送验证码
        // if(!this.state.input.state){
        //     alert("正在提交中，请勿操作！");
        //     return;
        // }
        if(!this.state.code.state){
            return;
        }
        let _code = this.state.code;
        _code.state = false;
        this.setState({
            code: _code
        }, ()=>{
            //发送验证码
            inter.getCode.data.id = inter.GetTaskState.data.id;
            getCode((data)=>{
                if(data.error){
                    alert(data.error);
                    return;
                }
                this.startCountDown();
            })
        })
    }

    startCountDown(){
        let that = this;
        setTimeout(function() {
            let _code = that.state.code;
            let _time = "";
            if(_code.times.toString() === "1"){
                _code.times = 60;
                _code.chinese = "未收到验证码？";
                _code.state = true;
                that.setState({
                    code: _code
                })
            }else{
                _time = _code.times - 1;
                _code.times = _time;
                _code.chinese = _time;
                that.setState({
                    code: _code
                }, ()=>{
                    that.startCountDown()
                });
            }
        }, 1000);
    }

    judge(list){
        let json = {
            isNull : false,
            name: ""
        }
        let keys = Object.keys(list);
        for(let i=0; i< keys.length; i++){
            if(!list[keys[i]]){
                json.isNull = true;
                json.name = keys[i];
                break;
            }
        }

        return json;
    }

    inputChange(name, value, type) {
        let _value = !type ? this.state.value : this.state[type];
        let _error = this.state.error;
        if(name === "mobile"){
            inter.addUserMessage.data.Mobile = value;
        }
        if(name === "password"){
            inter.addUserMessage.data.MobilePwd = value;
        }
        if(name === "name"){
            this.props.name = value;
        }
        
        _value[name] = value;
        _error[name] = "";
        this.setState({
            value: _value,
            error: _error
        })
    }

    

    render() {
        return (
            <div style={{position: "relative"}}>
                <FormBlock tip="姓名">
                    <Input 
                        placeholder="手机绑定的用户姓名"
                        floatHolder="手机绑定的用户姓名"
                        type="text"
                        disabled={this.props.disabled}
                        value={this.props.name}
                        fullWidth={true}
                        errorText={this.state.error.name}
                        onChange={(e) => this.inputChange('name', e.currentTarget.value)}/>
                </FormBlock>
                <FormBlock tip='身份证号'>
                    <Input
                        placeholder="手机绑定的身份证号码"
                        floatHolder="手机绑定的身份证号码"
                        type="tel"
                        disabled={this.props.disabled}
                        value={this.state.value.pesonId}
                        fullWidth={true}
                        errorText={this.state.error.pesonId}
                        onChange={(e) => this.inputChange('pesonId', e.currentTarget.value)}/>
                </FormBlock>
                <FormBlock tip='手机号'>
                    <Input
                        placeholder="手机号"
                        floatHolder="手机号"
                        type="tel"
                        disabled={this.props.disabled}
                        value={this.state.value.mobile}
                        fullWidth={true} 
                        errorText={this.state.error.mobile}
                        onChange={(e) => this.inputChange('mobile', e.currentTarget.value)} />
                </FormBlock>
                <FormBlock tip='密码'>
                    <Input
                        placeholder="手机密码"
                        floatHolder="手机密码"
                        type="tel"
                        value={this.state.value.password}
                        fullWidth={true}
                        errorText={this.state.error.password}
                        onChange={(e) => this.inputChange('password', e.currentTarget.value)} />
                </FormBlock>
                {!this.props.static && <FlatButton label={this.state.action.chinese} onClick={this.action}/>}
                { !this.state.input.dialog && <div className="zIndex1" style={{position: "absolute", left: 0, top: 0, height: "100%", width: "100%",background: "#fff"}}>
                    {this.state.src && <img src={`data:image/png;base64,${this.state.src}`} />}
                    <FormBlock tip='验证码'>
                        <Input
                            placeholder="手机验证码"
                            floatHolder="手机验证码"
                            type="tel"
                            value={this.state.inputCode.code}
                            fullWidth={true}
                            errorText={this.state.error.code}
                            onChange={(e) => this.inputChange('code', e.currentTarget.value, "inputCode")} />
                    </FormBlock>
                    <FlatButton label={this.state.input.chinese} onClick={this.sendInput}/>
                    <FlatButton label={this.state.code.chinese} onClick={this.getCode} />
                </div>}
            </div>
        );
    }
}

export {GetMobileMessage};
/* jshint ignore: end */