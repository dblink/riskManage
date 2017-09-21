/* jshint ignore : start */
import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import {inter} from '../config/interface';
import {login} from '../config/login';

class Tip extends Component {
    //初始化属性
    constructor(props) {
        super(props);
        //指向 constructor 下面的 this
        if (this.props.close && !this.props.closeTip) {
            console.error("we need function 'closeTip'");
        }
    }

    render() {
        let props,
            statue;
        props = this.props;
        statue = props.color === "success"
            ? "success-bg-color"
            : "wrong-bg-color";
        return (
            <div style={{"transition": ".5s"}} className={statue + " error " + this.props.tipState}>
                {this.props.close
                    ? <Close onClick={this.props.closeTip}/>
                    : ""}
                {props.content}
            </div>
        )
    }
}

Tip.defaultProps = {
    tipState: "hide",
    close: true
};
//关闭按钮 关闭按钮
const Close = (props) => (
    <div className="close" {...props}>
        {props.children}
    </div>
)

Close.defaultProps = {
    children: "x"
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                UserName: "",
                Password: ""
            },
            tip: {
                text: "",
                color: ""
            },
            tipState: "",
            submit: "登录",
            loginState: false
        }
        this.inputChange = this
            .inputChange
            .bind(this);
        this.closeTip = () => this.setState({tipState: ""});
        this.action = this
            .action
            .bind(this);
    }
    inputChange(name, value) {
        this.closeTip();
        let _value = this.state.value;
        _value[name] = value;
        this.setState({value: _value});
    }
    action(e) {
        e.preventDefault();
        if(!this.state.value.Password || !this.state.value.UserName){
             this.setState({
                    tip: {
                        text: "密码和用户名不能为空",
                        color: "error"
                    },
                    tipState: "show"
                })
            return;
        }
        inter.login.data.Password = this.state.value.Password;
        inter.login.data.UserName = this.state.value.UserName;

        if(this.state.loginState){
            return;
        }
        this.setState({
            submit: "登录中……",
            loginState: true
        }, function(){
            login((data) => {
                if (data.error) {
                    this.setState({
                        tip: {
                            text: data.error,
                            color: "error",
                        },
                        loginState: false,
                        submit: "登录",
                        tipState: "show"
                    })
                    return;
                }
                browserHistory.push("/index");
            })
        })
        
    }
    render() {
        return (
            <div>
                <div className="login-image login table">
                    <div className="va-middle">
                        <form className="form" onSubmit={this.action}>
                            <Tip
                                color={this.state.tip.color}
                                content={this.state.tip.text}
                                closeTip={this.closeTip}
                                tipState={this.state.tipState}/>
                            <div className="row text-center">
                                <input
                                    type="text"
                                    onChange=
                                    {(e) => {this.inputChange("UserName", e.currentTarget.value)}}
                                    className="login-input"
                                    style={{
                                    width: "80%"
                                }}
                                    name="UserName"
                                    placeholder="请输入用户名"/>
                            </div>
                            <div className="row text-center">
                                <input
                                    type="password"
                                    onChange=
                                    {(e) => {this.inputChange("Password", e.currentTarget.value)}}
                                    className="login-input"
                                    style={{
                                    width: "80%"
                                }}
                                    name="Password"
                                    placeholder="请输入密码"/>
                            </div>
                            <div className="row text-center">
                                <input
                                    type="submit"
                                    className="login-submit cursor-pointer"
                                    style={{
                                        width: "80%"
                                    }}
                                    value={this.state.submit}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
/* jshint ignore : end */