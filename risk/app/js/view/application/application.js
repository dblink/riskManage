/* jshint ignore: start */
import React, {Component} from 'react';
import {Step, StepButton, StepContent, StepLabel, Stepper} from 'material-ui/Stepper';
import {MaterialTextField as Input} from '../../module/input/input';
import {ChosePayType} from '../../module/input/select';

import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import {isIdCard} from '../../common/check';
import {selectUserMessage, addUserMessage} from '../../config/applyConfig';
import {inter} from '../../config/interface';
import {ApplyStep1} from './applyStep1';
import {ApplyStep2} from './applyStep2';
import {ApplyStep3} from './applyStep3';
import {ApplyStep4} from './applyStep4';
import {ApplyStep5} from './applyStep5';
import {ApplyStep6} from './applyStep6';
import {ApplyStep7} from './applyStep7';
import {Welcome} from '../index';

let DateTimeFormat;

if (areIntlLocalesSupported(['zh'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
}

const style = {
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

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            ApplyID: "",
            PersonID: "",
            isSelectSuccess: "",
            mobileId: ""
        };
        this.indexChange = this
            .indexChange
            .bind(this);
        this.callback = this
            .callback
            .bind(this);
        this.inputChangeStep2 = this
            .inputChangeStep2
            .bind(this);
        this.inputChangeTable = this
            .inputChangeTable
            .bind(this);
        this.inputChangeDelay = this
            .inputChangeDelay
            .call(this);
        this.personCardNo = this
            .personCardNo
            .bind(this);
        this.personCardNoHandle = this
            .personCardNoHandle
            .bind(this);
        this.applyStep2 = this
            .applyStep2
            .bind(this);
        this.clear = this
            .clear
            .bind(this);
        inter.selectUserMessage.data.PersonCardNo = "";
    }

    applyStep2(index) {
        let _step2 = this.state.step2;
        let _error = this.state.error;
        let _isError = false;
        Object
            .keys(_step2)
            .map((name) => {
                console.log(_step2[name])
                if (_step2[name] && name !== "ApplyID") {
                    _error[name] = "此处不能为空";
                    _isError = true;
                } else {
                    inter.addUserMessage.data[name] = _step2[name];
                }
            });
        if (_isError) {
            console.log(_error)
            this.setState({error: _error})
        } else {
            inter.addUserMessage.data.OtherInfo = JSON.stringify(this.state.otherInfoData);
            addUserMessage((data) => {
                console.log(data);
            })
        }

    }

    indexChange(index) {
        console.log(index);
        this.setState({
            page: index + 1
        })
    }

    inputChangeDelay() {
        var setTime;
        return ((handle) => {
            if (setTime) {
                clearTimeout(setTime);
            }
            setTime = setTimeout(() => {
                if (typeof handle === "object") {
                    handle.map((e) => {
                        e();
                    });
                    return;
                }
                handle();
            }, 800);
        }).bind(this);
    }

    inputChangeTable(name, key, value) {
        console.log(name, value, key);
        let _data = this.state.otherInfoData;
        _data[key][name] = value;
        this.setState({otherInfoData: _data})
    }

    personCardNo(e) {
        let value = e.currentTarget.value;
        let _step2 = this.state.step2;
        let _error = this.state.error;
        _step2.PersonCardNo = value;
        _error.PersonCardNo = ''
        this.setState({
            step2: _step2,
            error: _error
        }, this.inputChangeDelay(this.personCardNoHandle));
    }


    personCardNoHandle() {
        let cardBool = isIdCard(this.state.step2.PersonCardNo);
        if (!cardBool.error) {
            inter.selectUserMessage.data.PersonCardNo = this.state.step2.PersonCardNo;
            selectUserMessage((data) => console.log(this, data));
        } else {
            this.state.error.PersonCardNo = cardBool.error;
        }
    }

    inputChangeStep2(e) {
        let _event,
            _step2,
            _error,
            value,
            name;

        _event = e.currentTarget;
        name = _event.name;
        value = _event.value;

        _step2 = this.state.step2;
        _error = this.state.error;

        _step2[name] = value;
        _error.step2[name] = '';
        this.setState({step2: _step2, error: _error})
    }

    

    callback(name, value, index) {
        let _state = this.state;
        _state[name] = value;
        _state.page = index;
        this.setState(_state);
    }

    clear() {
        this.setState({page: 0, ApplyID: "", PersonID: ""});
        inter.selectUserMessage.data.PersonCardNo = '';
    }

    render() {
        return (
            <Welcome>
                <Stepper activeStep={this.state.page} orientation="vertical">
                    <Step>
                        <StepLabel>系统审核</StepLabel>
                        <StepContent>
                            <ApplyStep1 callback={this.callback}/>
                        </StepContent>
                    </Step>

                    <Step>
                        <StepLabel>{this.state.isSelectSuccess && '确认'}基本信息</StepLabel>
                        <StepContent>
                            <ApplyStep2 callback={this.callback}  disabled={this.state.isSelectSuccess}/>
                        </StepContent>
                    </Step>

                    <Step>
                        <StepLabel>{this.state.isSelectSuccess && '确认'}公司信息</StepLabel>
                        <StepContent>
                            <ApplyStep3 callback={this.callback} disabled={this.state.isSelectSuccess}/>
                        </StepContent>
                    </Step>

                    <Step>
                        <StepLabel>{this.state.isSelectSuccess && '确认'}其他信息</StepLabel>
                        <StepContent>
                            <ApplyStep4 callback={this.callback} disabled={this.state.isSelectSuccess}/>
                        </StepContent>
                    </Step>

                    <Step>
                        <StepLabel>借款资料</StepLabel>
                        <StepContent>
                            <ApplyStep5 callback={this.callback} mobileId={this.state.mobileId} PersonID={this.state.PersonID}/>
                        </StepContent>
                    </Step>
                    
                    <Step>
                        <StepLabel>雷达验证</StepLabel>
                        <StepContent>
                            <ApplyStep6 callback={this.callback} applyID={this.state.ApplyID} />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>微信、支付宝信息</StepLabel>
                        <StepContent>
                            <ApplyStep7
                                clear={this.clear}
                                applyID={this.state.ApplyID}
                                personID={this.state.PersonID}/>
                        </StepContent>
                    </Step>
                </Stepper>
            </Welcome>
        );
    }
}

export {Application};
/* jshint ignore: end */