/* jshint ignore : start */
import React, {Component} from 'react';
import {MaterialTextField as Input} from '../../module/input/input';
import {ChosePayType, ChoseComeFrom} from '../../module/input/select';
import {MaterialPaper as Layer} from '../../module/layer';
import {FormBlock} from '../../module/form/formBlock';
import {MaterialFlatButton as FlatButton} from '../../module/buttons';
import {DiyDialog as Dialog , Progressive} from '../../module/dialog/dialog';

import DatePicker from 'material-ui/DatePicker';
import {postLoanApp} from '../../config/applyConfig';
import {inter} from '../../config/interface';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

if (areIntlLocalesSupported(['zh'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
}

const style = {
    formInput: {
        display: 'inline-block',
        width: '230px',
        overflow: "hidden",
        "margin-left": "15px",
        "vertical-align": "middle"
    },
    formSelect: {
        display: 'inline-block',
        width: '230px',
        overflow: "hidden",
        "margin-left": "15px",
        "vertical-align": "top"
    },
    formTextarea: {
        display: 'inline-block',
        width: '230px',
        overflow: 'hidden',
        "margin-left": "15px",
        "vertical-align": "bottom"
    }
}

class ApplyStep5 extends Component {
    constructor(props) {
        super(props);
        let _inter = inter.applyMoneyStep1.data;
        let _date = new Date();
        this.state = {
            value: {
                PersonId: this.props.PersonID,
                ApplyMoney: _inter.ApplyMoney !== "decimal" && _inter.ApplyMoney ||  "", //借款金额
                ApplyTerm: _inter.ApplyTerm !== "int32" && _inter.ApplyTerm && _inter.ApplyTerm.toString() || "", //申请期限
                StartTime: _inter.StartTime !== "dataTime" && _inter.StartTime || `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`, //开始日期
                Payment: _inter.Payment !== "string" && _inter.Payment || "", //还款方式
                ComeFrom: _inter.ComeFrom !== "string" && _inter.ComeFrom && _inter.ComeFrom.toString() || "", //来源
                ComeFromRemark: _inter.ComeFromRemark !== "strng" && _inter.ComeFromRemark || "", //来源备注
                WeekMoney: _inter.WeekMoney !== "string" && _inter.WeekMoney || "", //可接受还款金额
                BorrowMoneyPurpose: _inter.BorrowMoneyPurpose !== "string" && _inter.BorrowMoneyPurpose || "", //借款用途
                Remark: _inter.Remark !== "string" && _inter.Remark || "" //备注
            },
            show: false,
            canNull:{},
            error: {
                summary: "",
                ApplyMoney: "", //借款金额
                ApplyTerm: "", //申请期限
                ComeFrom: "", //来源
                ComeFromRemark: "", //来源备注
                StartTime: "", //开始日期
                Payment: "", //还款方式
                BorrowMoneyPurpose: "", //借款用途
                Remark: "" //备注
            },
            obj: {
                date: _inter.StartTime !== "dataTime" && _inter.StartTime && new Date(_inter.StartTime) || ""
            }
        }
        //console.log(_inter.StartTime !== "string" && _inter.StartTime && new Date(_inter.StartTime))
        this.apply = this
            .apply
            .bind(this);
        this.inputChange = this
            .inputChange
            .bind(this);
        this.selectChange = this
            .inputChange
            .bind(this);
        this.dateChange = this
            .dateChange
            .bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close(){
        this.setState({
            show: false
        })
    }

    open(){
        let _step1 = this.state.value;
        let _isError = false;
        let _error = this.state.error;

        Object
            .keys(_step1)
            .map((name) => {
                console.log(Boolean(_step1[name].toString()))
                if (!_step1[name].toString()) {
                    _error[name] = '该字段不能为空';
                    _isError = true;
                }
                inter.applyMoneyStep1.data[name] = _step1[name]
            });

        //console.log(_isError);
        if (_isError) {
            this.setState({error: _error});
            return;
        }
        
        this.setState({
            show: true
        })
    }

    apply(index) {
        /*let _step1 = this.state.value;
        let _isError = false;*/
        let _error = this.state.error;

        /*Object
            .keys(_step1)
            .map((name) => {
                console.log(Boolean(_step1[name].toString()))
                if (!_step1[name].toString()) {
                    _error[name] = '该字段不能为空';
                    _isError = true;
                }
                inter.applyMoneyStep1.data[name] = _step1[name]
            });

        //console.log(_isError);
        if (_isError) {
            this.setState({error: _error});
            return;
        }*/
        if(inter.addUserMessage.data.ApplyId){
            inter.applyMoneyStep1.data.ApplyId = inter.addUserMessage.data.ApplyId;
        }
       inter.applyMoneyStep1.data.MonbileReportNo = this.props.mobileId;
       console.log(inter.applyMoneyStep1.data.MonbileReportNo);
        postLoanApp((data) => {
            if (data.error) {
                let _error = this.state.error;
                _error.summary = data.error;
                this.setState({error: _error})
                return;
            }
            this.close();
            
            
            inter.addUserMessage.data.ApplyID = data;
            this
                .props
                .callback('ApplyID', data, index);
        });
    }

    inputChange(name, value) {
        let _value,
            _error;

        _value = this.state.value;
        _error = this.state.error;
        _value[name] = value;
        _error[name] = '';

        this.setState({value: _value, error: _error});
    }

    dateChange(event, date) {
        let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        let _obj = this.state.obj;
        let _value = this.state.value;
        let _error = this.state.error;
        _obj.date = date;
        _value.StartTime = time;
        _error.StartTime = '';
        this.setState({value: _value, obj: _obj, error: _error})
    }

    render() {
        return (
            <div style={{
                'max-width': '1000px',
                position:'relative'
            }}>
                <form>
                    <FormBlock tip='金额'>
                        <Input
                            placeholder="输入金额"
                            floatHolder="借款金额"
                            type="tel"
                            name="ApplyMoney"
                            value={this.state.value.ApplyMoney}
                            disabled={this.props.disabled}
                            fullWidth={true}
                            errorText={this.state.error.ApplyMoney}
                            onChange={(e) => this.inputChange('ApplyMoney', e.currentTarget.value)}/>
                    </FormBlock>

                     <FormBlock tip='接受还款'>
                        <Input
                            placeholder="输入金额"
                            floatHolder="可接受每周还款"
                            type="tel"
                            name="ApplyMoney"
                            disabled={this.props.disabled}
                            value={this.state.value.WeekMoney}
                            fullWidth={true}
                            errorText={this.state.error.WeekMoney}
                            onChange={(e) => this.inputChange('WeekMoney', e.currentTarget.value)}/>
                    </FormBlock>

                    <FormBlock tip='方式'>
                        <Input
                            placeholder="还款方式"
                            floatHolder="还款方式"
                            type="text"
                            name="Payment"
                            value={this.state.value.Payment}
                            disabled={this.props.disabled}
                            fullWidth={true}
                            errorText={this.state.error.Payment}
                            onChange={(e) => this.inputChange('Payment', e.currentTarget.value)}/>
                    </FormBlock>

                    <FormBlock tip='期限' >
                        <ChosePayType
                            value={this.state.value.ApplyTerm}
                            selectChange={this.selectChange}
                            disabled={this.props.disabled}
                            errorText={this.state.error.ApplyTerm}/>
                    </FormBlock>

                    {/* <FormBlock tip='日期' width={2}>
                        <DatePicker
                            hintText="zh locale"
                            onChange={this.dateChange}
                            value={this.state.obj.date}
                            DateTimeFormat={DateTimeFormat}
                            disabled={this.props.disabled}
                            floatingLabelText="履约日期"
                            container="inline"
                            okLabel="确定"
                            fullWidth={true}
                            autoOk={true}
                            cancelLabel="取消"
                            locale="zh"
                            errorText={this.state.error.StartTime}/>
                    </FormBlock> */}

                    <FormBlock tip="来源">
                        <ChoseComeFrom
                            value={this.state.value.ComeFrom}
                            selectChange={this.selectChange}
                            disabled={this.props.disabled}
                            errorText={this.state.error.ComeFrom}/>
                    </FormBlock>

                    <FormBlock tip="来源备注" width={2}>
                        <Input
                            hintText="输入备注"
                            floatHolder="来源备注"
                            type="text"
                            name="ComeFromRemark"
                            disabled={this.props.disabled}
                            value={this.state.value.ComeFromRemark}
                            fullWidth={true}
                            onChange={(e) => this.inputChange('ComeFromRemark', e.currentTarget.value)}
                            errorText={this.state.error.ComeFromRemark}/>
                    </FormBlock>

                    <FormBlock tip="用途" width={3}>
                        <Input
                            hintText="输入用途"
                            floatHolder="资金用途"
                            type="text"
                            name="BorrowMoneyPurpose"
                            value={this.state.value.BorrowMoneyPurpose}
                            disabled={this.props.disabled}
                            fullWidth={true}
                            onChange={(e) => this.inputChange('BorrowMoneyPurpose', e.currentTarget.value)}
                            errorText={this.state.error.BorrowMoneyPurpose}/>
                    </FormBlock>

                    <FormBlock tip="备注" width={3}>
                        <Input
                            hintText="输入备注"
                            floatHolder="备注"
                            type="text"
                            name="Remark"
                            value={this.state.value.Remark}
                            disabled={this.props.disabled}
                            fullWidth={true}
                            onChange={(e) => this.inputChange('Remark', e.currentTarget.value)}
                            errorText={this.state.error.Remark}/>
                    </FormBlock>
                </form>
                {!this.props.static && <div>
                        <FlatButton primary={true} fullWidth={true} style={{margin: '10px 0'}} label="确认提交并进入下一步" onClick={this.open} />
                        <span
                            className="wrong-color"
                            style={{
                            'padding': '0 10px'
                        }}>{this.state.error.summary}</span>
                        <Dialog show={this.state.show}>
                            <Progressive apply={()=>this.apply(5)} close={this.close} />
                        </Dialog>
                    </div>}
                
            </div>
        );
    }
}

export {ApplyStep5};
/* jshint ignore : end */