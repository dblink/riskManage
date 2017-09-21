/* jshint ignore: start */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {MaterialPaper as Layer} from '../layer';
import {MaterialFlatButton as FlatButton} from '../buttons';
import {ChoseCompany, ChoseLeader, ChoseRole, ChosePayType, ChoseSettleType, ChoseType} from '../input/select';
import {MaterialTextField as TextField,MaterialTextSelect as Select} from '../input/input';
import {inter} from '../../config/interface';
import {postAudit, daiFu, confirmDaiFu, daiKou, daiKouRenGong, postImage, deletePeople} from '../../config/infoConfig';
import {check} from '../check/check';
import {changeEmployee, settleByPeople, settleBySystem} from '../../config/itemConfig';
import {FormBlock} from '../form/formBlock';
import {changePassword ,dismission} from '../../config/login';
import {changeTime,changeFinalTerm,changeFinalMoney, getRepayMentListByContarctId, changeTimeAfterSet} from '../../config/applyConfig';
import {getValue} from '../../config/dataConfig';
import {getRepaymentList} from '../../config/tableConfig';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
let DateTimeFormat;

if (areIntlLocalesSupported(['zh'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
}

class MaterialDialog extends Component {
    render() {
        return (
            <Dialog
                title="Dialog With Actions"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.handleClose}>
                {this.props.children}
            </Dialog>
        );
    }
}

const style = {
    dialogTitle: {
        padding: "10px 20px"
    },
    dialogContent: {
        padding: "10px 40px"
    },
    dialogAction: {
        padding: "10px 20px",
        "text-align": "right"
    }
}

class DiyDialog extends Component {
    render() {
        let json = {
            opacity: this.props.show
                ? 1
                : 0,
            left: this.props.show
                ? 0
                : "-100%",
            position: this.props.position
        }

        return (
            <div style={json} className="dialog">
                <div
                    className="table"
                    style={{
                    height: "100%"
                }}>
                    <div className="va-middle">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

class DiyDialogView extends Component {
    render() {
        return (
            <Layer Depth={2} style={this.props.style}>
                {this.props.children}
            </Layer>
        )
    }
}

class DiyDialogContent extends Component {
    render() {
        return (
            <div style={style.dialogContent}>
                {this.props.children}
            </div>
        )
    }
}

class DiyDialogTitle extends Component {
    render() {
        return (
            <div style={style.dialogTitle} {...this.props}>
                {this.props.children}
            </div>
        )
    }
}

class DiyDialogAction extends Component {
    render() {
        return (
            <div style={style.dialogAction}>
                {this.props.children}
            </div>
        )
    }
}

class Dismission extends Component {
    constructor(props) {
        super(props);
        this.apply = this.apply.bind(this);
    }
    
    apply(e){
        inter.dismission.data.id = this.props.id;
        dismission((data)=>{
            if(data.error){
                alert(data.error);
                return;
            }
            alert("离职成功!");
            this.props.close();
        });
        //inter.dismission.data.id = this.props.json;
    }

    render() {
        return (
            <DiyDialogView
                style={{
                "max-width": "500px",
                "margin": "auto"
            }}>
                <DiyDialogTitle>员工离职确认</DiyDialogTitle>
                <DiyDialogContent>是否确认员工<span className='success-color'>'{this.props.name}'</span>离职？</DiyDialogContent>
                <DiyDialogAction>
                    <FlatButton
                        label='确认'
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.apply}/>
                    <FlatButton label='取消' onClick={this.props.close}/>
                </DiyDialogAction>
            </DiyDialogView>
        )
    }
}

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                company: this.props.Company,
                role: this.props.Role,
                leader: parseInt(this.props.Chief),
                name: this.props.Name,
                mobile: this.props.Mobile
            },
            message: "",
            success: false,
            error: {
                company: "",
                role: "",
                leader: "",
                name: "",
                mobile: ""
            }
        }
        this.selectChange = this
            .selectChange
            .bind(this);
        this.inputChange = this
            .inputChange
            .bind(this);
        this.changeEmployee = changeEmployee.bind(this);
        this.callbackMessage = this
            .callbackMessage
            .bind(this);
        this.submitForm = this
            .submitForm
            .bind(this);
        this.close = this.close.bind(this);
    }

    submitForm() {
        let _paramter = inter.changeEmployee.data;
        _paramter.Company = this.state.value.company;
        _paramter.Id = this.props.Id;
        _paramter.LeaderID = this.state.value.leader || -1;
        _paramter.Mobile = this.state.value.mobile;
        _paramter.Name = this.state.value.name;
        _paramter.RoleID = this.state.value.role;

        let result = check.employee('change');

        console.log(result.error);

        if(result.error){
            let _error = this.state.error;
            _error[result.name] = result.error;
            this.setState({
                error: _error
            });
            return;
        }

        this.changeEmployee(this.callbackMessage);
    }

    callbackMessage(callback) {
        let _message;
        if(callback === "success"){
            _message = <span className="success-color">修改成功</span>;
            this.setState({
                success: true,
                message: _message
            });
        }else{
            _message = <span className="wrong-color">{callback}</span>;
            this.setState({
                message: _message
            })
        }
    }

    selectChange(name, value) {
        let _value = this.state.value;
        let _error = this.state.error;
        _value[name] = value;
        _error[name] = '';
        if (name !== "leader") {
            _value.leader = '';
        }
        this.setState({
            value: _value,
            message: "",
            error: _error
        })
    }

    inputChange(e) {
        let name = e
            .currentTarget
            .getAttribute("data-name");
        let _value = this.state.value;
        let _error = this.state.error;
        _error[name] = "";
        _value[name] = e.currentTarget.value;
        this.setState({
            value: _value,
            message: "",
            error:_error
        })
    }

    close(){
        this.props.close(this.state.success);
    }

    render() {
        return (
            <DiyDialogView
                style={{
                "max-width": "500px",
                "margin": "auto"
            }}>
                <DiyDialogTitle className='clear-both'>
                    <div className='block-2'>修改员工信息</div>
                    <div className='block-2 text-right'>{this.state.message}</div>
                </DiyDialogTitle>
                <DiyDialogContent>
                    <TextField
                        placeholder="姓名"
                        floatHolder="员工姓名"
                        type="text"
                        data-name="name"
                        value={this.state.value.name}
                        fullWidth={true}
                        errorText={this.state.error.name}
                        onChange={this.inputChange} />
                    <TextField
                        placeholder="电话"
                        floatHolder="员工电话"
                        type="text"
                        data-name="mobile"
                        fullWidth={true}
                        errorText={this.state.error.mobile}
                        onChange={this.inputChange}
                        value={this.state.value.mobile} />
                    <ChoseCompany
                        selectChange={this.selectChange}
                        errorText={this.state.error.company}
                        value={this.state.value.company}/>
                    <ChoseRole
                        selectChange={this.selectChange}
                        errorText={this.state.error.role}
                        value={this.state.value.role}/>
                    {this.state.value.company.toString() && this.state.value.company !== -1 && this.state.value.role && 
                        <ChoseLeader 
                            selectChange={this.selectChange} 
                            errorText={this.state.error.leader}
                            {...this.state.value}/>}
                </DiyDialogContent>
                <DiyDialogAction>
                    <FlatButton
                        label='确认'
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.submitForm}/>
                    <FlatButton label='关闭' onClick={this.props.close}/>
                </DiyDialogAction>
            </DiyDialogView>
        )
    }
}

class Progressive extends Component {
    constructor(props){
        super(props);
        this.state = {
            state :false
        }
        this.apply = this.apply.bind(this);
    }
    apply(){
        this.setState({
            state: true
        }, function(){
            this.props.apply();
        })
    }
    render(){
        return <DiyDialogView  style={{
                "max-width": "500px",
                "margin": "auto"
            }}>
            <DiyDialogTitle>温馨提示</DiyDialogTitle>
            <DiyDialogContent>
                您的借款资料一旦提交<span className="wrong-color">无法修改</span>是否继续?
            </DiyDialogContent>
            <DiyDialogAction>
                <FlatButton
                        label={!this.state.state ? "确认" : "提交中……"}
                        primary={true}
                        keyboardFocused={true}
                        disabled={this.state.state}
                        onClick={this.apply}/>
                <FlatButton label='关闭' onClick={this.props.close}/>
            </DiyDialogAction>
        </DiyDialogView> 
    }
}

class Result extends Component {
    constructor(props){
        super(props)
        this.state={
            value: {
                state: this.props.state,
                detailInfoId: this.props.detailInfoId,
                money: "",
                ApplyTerm: "",
                remark: ""
            },
            error:{
                money: "",
                ApplyTerm: "",
                remark: ""
            }
            
        }
        this.inputChange = this.inputChange.bind(this);
        this.apply = this.apply.bind(this);
    }
    
    inputChange(name, value){
        let _value = this.state.value;
        _value[name] = value;
        this.setState({
            value: _value
        })
    }

    apply(){
        let _value = this.state.value;
        inter.postAudit.data.state = this.props.state;
        inter.postAudit.data.detailInfoId = _value.detailInfoId;
        inter.postAudit.data.money = _value.money;
        inter.postAudit.data.term  = _value.ApplyTerm;
        inter.postAudit.data.remark = _value.remark;
        postAudit((e)=>{
            this.props.jump('/auditList');
        });
    }

    render(){
        return <DiyDialogView style={{
            "max-width":"500",
            "margin": "auto"
        }}>
            <DiyDialogTitle>通过信息</DiyDialogTitle>
            <DiyDialogContent>
                {!this.props.refuse && <div>
                    <FormBlock tip="借款金额" width={2}>
                        <TextField  placeholder="借款金额"
                        floatHolder="借款金额"
                        type="text"
                        data-name="money"
                        fullWidth={true}
                        errorText={this.state.error.money}
                        onChange={(e)=>this.inputChange("money", e.currentTarget.value)}
                        value={this.state.value.money} />
                    </FormBlock>
                </div>}

                {!this.props.refuse && <div>
                    <FormBlock tip="借款期限 " width={2}>
                        <ChosePayType 
                            value={this.state.value.ApplyTerm}
                            selectChange={this.inputChange}
                            disabled={this.props.disabled}
                            errorText={this.state.error.ApplyTerm}
                        />
                    </FormBlock>
                </div>}

                <div>{
                    <FormBlock tip="备注 " width={2}>
                        <TextField  placeholder="备注"
                        floatHolder="备注"
                        type="text"
                        data-name="remark"
                        fullWidth={true}
                        errorText={this.state.error.remark}
                        onChange={(e)=>this.inputChange("remark", e.currentTarget.value)}
                        value={this.state.value.remark} />
                    </FormBlock>
                }</div>
            </DiyDialogContent>
            <DiyDialogAction>
                <FlatButton
                        label='确认'
                        primary={true}
                        onClick={this.apply}/>
                <FlatButton label='关闭' onClick={this.props.close}/>
            </DiyDialogAction>
        </DiyDialogView>
    }
}

class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            password : "",
            error:{
                password: ""
            }
        }
        this.apply = this.apply.bind(this);
    }
    
    inputChange(name, value){
        let _error = "";
        
        this.setState({
            password: value,
            error:_error
        })
    }
    
    apply(){
        inter.changePassword.data.password = this.state.password;
        if(!this.state.password){
            let _error = "新密码不能为空！";
            this.setState({
                error:_error
            })
            return;
        }
        changePassword((callback)=>{
            if(callback.error){
                alert(callback.error);
            }else{
                alert("修改成功！");
            }
        })
    }

    render(){
        return( <DiyDialogView style={{
            "max-width":"500",
            "margin": "auto"
        }}>
            <DiyDialogTitle>修改密码</DiyDialogTitle>
            <DiyDialogContent>
                <div>{
                    <FormBlock tip="新密码" width={2}>
                        <TextField  placeholder="新密码"
                        floatHolder="新密码"
                        type="password"
                        fullWidth={true}
                        errorText={this.state.error.password}
                        onChange={(e)=>this.inputChange("password", e.currentTarget.value)}
                        value={this.state.password} />
                    </FormBlock>
                }</div>
            </DiyDialogContent>
            <DiyDialogAction>
                <FlatButton
                        label='确认'
                        primary={true}
                        onClick={this.apply}/>
                <FlatButton label='关闭' onClick={this.props.close}/>
            </DiyDialogAction>
        </DiyDialogView>)
    }
}

class ChangeTime extends Component {
    constructor(props){
        super(props);
        this.state = {
            time : new Date(props.time),
            error:{
                time: ""
            }
        }
        this.apply = this.apply.bind(this);
        this.dateChange  =this.dateChange.bind(this);
    }
    

    dateChange(event, date) {
        //let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        let _error = this.state.error;
        console.log(date);
        let _value = date;
        _error.time = '';
        this.setState({time: _value, error: _error})
    }

    inputChange(name, value){
        let _error = "";
        
        this.setState({
            time: value,
            error:_error
        })
    }
    
    apply(){
        let date = this.state.time;
        let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        inter.changeTime.data.time = time;
        inter.changeTime.data.id = this.props.appid;
        changeTime((callback)=>{
            if(callback.error){
                alert(callback.error);
            }else{
                alert("修改成功！");
            }
        })
    }

    render(){
        return( <DiyDialogView style={{
            "max-width":"500",
            "margin": "auto"
        }}>
            <DiyDialogTitle>修改时间</DiyDialogTitle>
            <DiyDialogContent>
                <FormBlock tip='日期' width={2}>
                    <DatePicker
                        hintText="zh locale"
                        onChange={this.dateChange}
                        value={this.state.time}
                        DateTimeFormat={DateTimeFormat}
                        floatingLabelText="履约日期"
                        container="inline"
                        okLabel="确定"
                        fullWidth={true}
                        autoOk={true}
                        cancelLabel="取消"
                        locale="zh"
                        errorText={this.state.error.time}/>
                </FormBlock>
            </DiyDialogContent>
            <DiyDialogAction>
                <FlatButton
                        label='确认'
                        primary={true}
                        onClick={this.apply}/>
                <FlatButton label='关闭' onClick={this.props.close}/>
            </DiyDialogAction>
        </DiyDialogView>)
    }
}
class ChangeTimeAfterSet extends Component{
    constructor(props){
        super(props);
        this.state = {
            time : new Date(props.time),
            error:{
                time: ""
            }
        }
        this.apply = this.apply.bind(this);
        this.dateChange  =this.dateChange.bind(this);
    }
    

    dateChange(event, date) {
        //let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        let _error = this.state.error;
        console.log(date);
        let _value = date;
        _error.time = '';
        this.setState({time: _value, error: _error})
    }

    inputChange(name, value){
        let _error = "";
        
        this.setState({
            time: value,
            error:_error
        })
    }
    
    apply(){
        let date = this.state.time;
        let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        inter.changeTimeAfterSet.data.time = time;
        inter.changeTimeAfterSet.data.contarctId = this.props.contarctId;
        changeTimeAfterSet((callback)=>{
            if(callback.error){
                alert(callback.error);
            }else{
                alert("修改成功！");
            }
        })
    }

    render(){
        return( <DiyDialogView style={{
            "max-width":"500",
            "margin": "auto"
        }}>
            <DiyDialogTitle>修改时间</DiyDialogTitle>
            <DiyDialogContent>
                <FormBlock tip='日期' width={2}>
                    <DatePicker
                        hintText="zh locale"
                        onChange={this.dateChange}
                        value={this.state.time}
                        DateTimeFormat={DateTimeFormat}
                        floatingLabelText="履约日期"
                        container="inline"
                        okLabel="确定"
                        fullWidth={true}
                        autoOk={true}
                        cancelLabel="取消"
                        locale="zh"
                        errorText={this.state.error.time}/>
                </FormBlock>
            </DiyDialogContent>
            <DiyDialogAction>
                <FlatButton
                        label='确认'
                        primary={true}
                        onClick={this.apply}/>
                <FlatButton label='关闭' onClick={this.props.close}/>
            </DiyDialogAction>
        </DiyDialogView>)
    }
}
class ChangeFinalTerm extends Component {
    constructor(props){
        super(props);
        this.state = {
            term : props.term,
            error:{
                term: ""
            }
        }
        this.apply = this.apply.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }
    
    inputChange(name, value){
        //console.log(name, value);
        this.setState({
            term: value
        })
    }
    
    apply(){
        inter.changeFinalTerm.data.id = this.props.appid;
        inter.changeFinalTerm.data.trem = this.state.term;
        changeFinalTerm((callback)=>{
            if(callback.error){
                alert(callback.error);
            }else{
                alert("修改成功！");
            }
        })
    }

    render(){
        return( <DiyDialogView style={{
            "max-width":"500",
            "margin": "auto"
        }}>
            <DiyDialogTitle>周期</DiyDialogTitle>
            <DiyDialogContent>
                <div>{
                    <FormBlock tip="周期" width={2}>
                        <ChosePayType 
                            value={this.state.term}
                            selectChange={this.inputChange}
                            errorText={this.state.error.term}
                        />
                    </FormBlock>
                }</div>
            </DiyDialogContent>
            <DiyDialogAction>
                <FlatButton
                        label='确认'
                        primary={true}
                        onClick={this.apply}/>
                <FlatButton label='关闭' onClick={this.props.close}/>
            </DiyDialogAction>
        </DiyDialogView>)
    }
}

class ChangeFinalMoney extends Component {
    constructor(props){
        super(props);
        this.state = {
            money : props.money,
            error:{
                money: ""
            }
        }
        this.apply = this.apply.bind(this);
    }
    
    inputChange(name, value){
        let _error = "";
        
        this.setState({
            money: value,
            error:_error
        })
    }
    
    apply(){
        inter.changeFinalMoney.data.money = this.state.money;
        inter.changeFinalMoney.data.id  = this.props.appid;
        if(!this.state.money){
            let _error = "新密码不能为空！";
            this.setState({
                error:_error
            })
            return;
        }
        changeFinalMoney((callback)=>{
            if(callback.error){
                alert(callback.error);
            }else{
                alert("修改成功！");
            }
        })
    }

    render(){
        return( <DiyDialogView style={{
            "max-width":"500",
            "margin": "auto"
        }}>
            <DiyDialogTitle>修改金额</DiyDialogTitle>
            <DiyDialogContent>
                <div>{
                    <FormBlock tip="金额" width={2}>
                        <TextField  placeholder="金额"
                        floatHolder="金额"
                        type="text"
                        errorText={this.state.error.money}
                        onChange={(e)=>this.inputChange("money", e.currentTarget.value)}
                        value={this.state.money} />
                    </FormBlock>
                }</div>
            </DiyDialogContent>
            <DiyDialogAction>
                <FlatButton
                        label='确认'
                        primary={true}
                        onClick={this.apply}/>
                <FlatButton label='关闭' onClick={this.props.close}/>
            </DiyDialogAction>
        </DiyDialogView>)
    }
}

class DaiFu extends Component {
    constructor(props){
        super(props);
        this.apply = this.apply.bind(this);
        this.state = {
            disable : false,
            button: "确认"
        }
    }
    
    apply(){
        let props = this.props;
        inter.daiFu.data.contarctId = props.contarctId;
        this.setState({
            disable : true,
            button: "提交中……"
        }, ()=>{this.getInfo()})
      
    }

    getInfo(){
        daiFu((data)=>{
            if(data.error){
                alert(data.error);
                this.setState({
                    disable : false,
                    button: "再次提交"
                })
                return;
            }
            inter.ConfirmDaiFu.data.contarctId = this.props.contarctId;
            inter.ConfirmDaiFu.data.trans_batchid = data.trans_batchid;
            inter.ConfirmDaiFu.data.trans_no = data.trans_no;
            this.requestDaiFu = this.requestDaiFu();
            confirmDaiFu(this.requestDaiFu);
        })
    }

    requestDaiFu(){
        let n=0;
        return (data)=>{
            if(!data){
                console.log(1);
                alert("代付成功");
                this.props.close();
            }
            let that = this;
            if(data.error && n < 4){
                setTimeout(function() {
                    confirmDaiFu(that.requestDaiFu);
                    ++n;
                }, 10000);
                return;
            }
            if(data.error && n === 4){
                alert(data.error);
                this.setState({
                    disable : false,
                    button: "再次提交"
                })
                return;
            }
            
        }
    }

    render(){
        return (
            <DiyDialogView style = {{
            "max-width":"500",
            "margin": "auto"
        }}>
                <DiyDialogTitle>确认代付信息</DiyDialogTitle>
                <DiyDialogContent>
                <div>{
                        <FormBlock tip="姓名" width={2}>
                            <TextField  placeholder="姓名"
                            floatHolder="姓名"
                            disabled = {true}
                            value={this.props.Name} />
                        </FormBlock>
                    }</div>
                    <div>{
                        <FormBlock tip="金额" width={2}>
                            <TextField  placeholder="金额"
                            floatHolder="金额"
                            disabled = {true}
                            value={this.props.Money} />
                        </FormBlock>
                    }</div>
                    <div>{
                        <FormBlock tip="周期" width={2}>
                            <TextField  placeholder="周期"
                            floatHolder="周期"
                            disabled = {true}
                            value={this.props.Trem} />
                        </FormBlock>
                    }</div>
                    <div>{
                        <FormBlock tip="开始日期" width={2}>
                            <TextField  placeholder="开始日期"
                            floatHolder="开始日期"
                            disabled = {true}
                            value={this.props.StartTime} />
                        </FormBlock>
                    }</div>
                    
                    <div>{
                        <FormBlock tip="结束日期" width={2}>
                            <TextField  placeholder="结束日期"
                            floatHolder="结束日期"
                            disabled = {true}
                            value={this.props.EndTime} />
                        </FormBlock>
                    }</div>
                </DiyDialogContent>
                 <DiyDialogAction>
                    <FlatButton
                            disabled={this.state.disable}
                            label={this.state.button}
                            primary={true}
                            onClick={this.apply}/>
                    <FlatButton label='关闭' onClick={this.props.close} disabled={this.state.disable}/>
                </DiyDialogAction>
            </DiyDialogView>
        )
    }
}

class HuaKou extends Component {
    constructor(props){
        super(props);
        this.state= {
            money: !this.props.disabled ? 0 : (props.TotalMoney - props.RepayMoney),
            remark: "",
            state: true,
            tip: "确认划扣"
        }
        this.inputChange = this.inputChange.bind(this);
        this.apply = this.apply.bind(this);
        this.applyPeople = this.applyPeople.bind(this);
    }
    
    apply(){
        inter.daiKou.data.reId = this.props.Id;
        inter.daiKou.data.money = this.state.money;
        if(!this.state.state){
            return;
        }
        this.setState({
            state: false,
            tip: "划扣中……请稍后"
        }, daiKou((data)=>{
            if(data.error){
                alert(data.error);
                this.setState({
                    state: true,
                    tip: "重新划扣"
                })
                return;
            }
            this.props.close();
        }))
        
    }
    applyPeople(){
        inter.daiKouRenGong.data.reId = this.props.Id;
        inter.daiKouRenGong.data.money = this.state.money;
        inter.daiKouRenGong.data.remark = this.state.remark;
        daiKouRenGong((data)=>{
            if(data.error){
                alert(data.error);
                return;
            }
            this.props.close();
        })
    }

    inputChange(name, value){
        let state = this.state;
        state[name] = value;
        this.setState(state);
    }
    render(){
        return <DiyDialogView style={{
            "max-width":"500",
            "margin": "auto"
        }}>
            <DiyDialogTitle>
                {this.props.disabled ? "系统" : "人工"} 划扣
            </DiyDialogTitle>
            <DiyDialogContent>
                <div>{
                    <FormBlock tip="日期" width={2}>
                        <div style={{"line-height": 100+"px"}}>{this.props.RepayTime.replace(/T.*/, "")}</div>
                    </FormBlock>
                }</div>
                <div>{
                    <FormBlock tip="已还金额" width={2}>
                        <div style={{"line-height": 100+"px"}}>{this.props.RepayMoney}</div>
                    </FormBlock>
                }</div>
                <div>{
                    <FormBlock tip="金额" width={2}>
                        <TextField  placeholder="金额"
                        floatHolder="金额"
                        fullWidth={true}
                        onChange={(e)=>this.inputChange("money", e.currentTarget.value)}
                        value={this.state.money} />
                    </FormBlock>
                }</div>
                {!this.props.disabled && <div>{
                    <FormBlock tip="备注" width={2}>
                        <TextField  placeholder="备注"
                        floatHolder="备注"
                        fullWidth={true}
                        onChange={(e)=>this.inputChange("remark", e.currentTarget.value)}
                        value={this.state.remark} />
                    </FormBlock>
                }</div>}
            </DiyDialogContent>
            <DiyDialogAction>
                <FlatButton
                        label={this.state.tip}
                        primary={true}
                        onClick={this.props.disabled ? this.apply : this.applyPeople}/>
                <FlatButton label='关闭' onClick={this.props.close}/>
            </DiyDialogAction>
        </DiyDialogView>
    }
}

class Settle extends Component {
    constructor(props){
        super(props);
        this.state = {
            money: "0",
            type: "3",
            settleType: "1",
            remark: "",
            state: true
        }
        this.inputChange = this.inputChange.bind(this);
        this.apply = this.apply.bind(this);
    }
    inputChange(name,value){
        //console.log(name, value);
        let _state = this.state;
        _state[name] = value;
        this.setState(_state)
    }
    apply(){
        let _inter;
        if(!this.state.state){
            return;
        }
        if(!this.state.money || this.state.money === "0"){
            alert("请输入金额！");
            return;
        }
        if(this.state.settleType.toString() === "1"){
            _inter = inter.settleByPeople.data;
            _inter.contarctId = this.props.contarctId;
            _inter.remark = this.state.remark;
            _inter.money = this.state.money;
            _inter.type = this.state.type;
            this.setState({
                state: false
            }, ()=>{
                settleByPeople((data)=>{
                    if(data.error){
                        alert(data.error);
                        this.setState({
                            state: true
                        })
                        return;
                    }else{
                        alert("结清成功!");
                        this.props.close();
                    }
                })
            })
            
        }else{
            _inter = inter.settleBySystem.data;
            _inter.contarctId = this.props.id;
            _inter.remark = this.state.remark;
            _inter.type = this.state.type;
            this.setState({
                state: false
            }, ()=>{
                settleByPeople((data)=>{
                    if(data.error){
                        alert(data.error);
                        this.setState({
                            state: true
                        })
                        return;
                    }else{
                        alert("结清成功!");
                        this.props.close();
                    }
                })
            })
        }
    }
    render(){
        return <DiyDialogView style={{
            "max-width":"500",
            "margin": "auto"
        }}>
            <DiyDialogTitle>
                结清
            </DiyDialogTitle>
            <DiyDialogContent>
                <div>{
                    <FormBlock tip="类型" width={2}>
                        <ChoseType value={this.state.settleType} selectChange={this.inputChange} />
                    </FormBlock>
                }</div>
                <div>{
                    <FormBlock tip="结清类型" width={2}>
                        <ChoseSettleType value={this.state.type} selectChange={this.inputChange} />
                    </FormBlock>
                }</div>
                <div>{
                    <FormBlock tip="金额" width={2}>
                        <TextField  placeholder="金额"
                        floatHolder="金额"
                        fullWidth={true}
                        onChange={(e)=>this.inputChange("money", e.currentTarget.value)}
                        value={this.state.money} />
                    </FormBlock>
                }</div>
                <div>{
                    <FormBlock tip="备注" width={2}>
                        <TextField  placeholder="备注"
                        floatHolder="备注"
                        fullWidth={true}
                        onChange={(e)=>this.inputChange("remark", e.currentTarget.value)}
                        value={this.state.remark} />
                    </FormBlock>
                }</div>
            </DiyDialogContent>
            <DiyDialogAction>
                <FlatButton
                        label={"确认"}
                        primary={true}
                        onClick={this.apply}/>
                <FlatButton label='关闭' onClick={this.props.close}/>
            </DiyDialogAction>
        </DiyDialogView>
    }
}

class AddImage extends Component{
    constructor(props){
        super(props);
        this.state ={
            file: "",
            length: "",
        }
        this.onChangeImage = this.onChangeImage.bind(this);
        this.apply = this.apply.bind(this);
    }
    onChangeImage(file){
        let files = file.currentTarget.files; //获取文件数量object {{0:"",1:"",length:2}}
        let srcArray = [];
        let _fileState = this.state.file;
        
        /* let length = files.length > 5 && 5 || files.length; */

        /* for(let i=0; i<length; i++){
            if(files[i].size / 1000 > 1000){ // >1m
                alert("图片过大！");
                continue;
            }
            srcArray.push(_src);
        } */
        _fileState = files;
        
        this.setState({
            file: _fileState,
            length: files.length
        })
        
    }
    apply(){
        let _form = new FormData();
        _form.append("id" , this.props.appid);
        _form.append("uploadFileName" , 6);
        _form.append("token", getValue().Token);

        Object.keys(this.state.file).map((sub)=>{
            _form.append("files", this.state.file[sub]);
        });
        inter.postImage.data = _form
        postImage((data)=>{
            if(data.error){
                alert(data.error)
            }else{
                alert("上传成功！");
            }
            
        });
        
    }
    render(){
        return <DiyDialogView style={{
            "max-width":"500",
            "margin": "auto"
        }}>
            <DiyDialogTitle>增加图片</DiyDialogTitle>
            <DiyDialogContent>
                <div>{
                    <FlatButton label="选择图片" labelPosition="before" containerElement="label">
                        <input
                            onChange={(e)=>this.onChangeImage(e)}
                            id="test"
                            className="hidden"
                            name= "a23"
                            accept="image/png, image/jpeg, image/gif, image/jpg"
                            type="file"
                            multiple="multiple"
                            />
                    </FlatButton>
                }{this.state.length && <div>{this.state.length}张图片</div>}</div>
            </DiyDialogContent>
            <DiyDialogAction>
                <FlatButton
                        label='确认'
                        primary={true}
                        onClick={this.apply}/>
                <FlatButton label='关闭' onClick={this.props.close}/>
            </DiyDialogAction>
        </DiyDialogView>
    }
}

const _pljson ={
    0:"待还款",
    2:"逾期",
    3:"划扣失败"
}
class PLhuakou extends Component {
    constructor(props){
        super(props);
        this.state={
            click: true,
            label: "点击开始批量划扣",
            array: [],
            type: {0:0, 2:0, 3: 0},
            chose:{},
            checkOn:false,
            finish: 0,
            totalCount: 0
        }
        this.startHuakou = this.startHuakou.bind(this);
    }

    startHuakou(){
        if(!this.state.click){
            return;
        }
        this.setState({
            click: false,
            checkOn: true,
            label: "收集数据中……"
        });
        let _keys = Object.keys(this.state.chose);
        for(let i=_keys.length -1; i>=0; i--){
            //console.log(this.state.type[_keys[i]]);
            console.log(this.state.type[_keys[i]].PageCount, 1);
            this.oneType(_keys[i], this.state.type[_keys[i]].PageCount, this.state.type[_keys[i]].TotalCount , i);
        }
    }
    //获取某类型总数
    oneType(type, allPage, TotalCount, i){
        this.setState({
            label: `正在划扣……${_pljson[type]}的数据`,
            finish: 0,
            totalCount: TotalCount
        })

        this.statistical(type, 1, allPage, i);
    }

    //获取表数据
    statistical(type, page, allPage, i){
        let _getList = inter.getRepaymentList.data;
        _getList.state = type;
        _getList.pageIndex = page;
        getRepaymentList((e)=>{
            this.batchHuaKou(0, e.data, i, (d)=>{
                if(page < allPage){
                    page = page + 1;
                    this.statistical(type, page, allPage, i);
                }else{
                    if(i === 0){
                        alert("划扣完毕！");
                        this.setState({
                            label: `完成划扣数据`,
                            click: true,
                            checkOn: false,
                        })
                    }else{
                        this.setState({
                            label: `正在划扣……${_pljson[type]}的数据`
                        })
                    }
                    
                }
            });
        })
    }
    //批量划扣
    batchHuaKou(strip, dataList, i, callback){
        let _this = this;
        setTimeout(function(data){
            _this.setState({
                finish: _this.state.finish + 1
            }, ()=>{
                if(strip < dataList.length - 1){
                    strip = strip + 1;
                    _this.batchHuaKou(strip, dataList, callback)
                }else{
                    callback();
                }
            })
        }, 2000);
    }
    onCheck(e, state, bool){
        if(bool){
            if(this.state.type[state] === 0){
                inter.getRepaymentList.data.state = state;
                getRepaymentList((data)=>{
                    let _type = this.state.type;
                    let _chose = this.state.chose;
                    _type[state] = data.pageinfo;
                    _chose[state] = data.pageinfo.TotalCount;
                    this.setState({
                        type: _type,
                        chose: _chose
                    })
                })
            }else{
                let _chose = this.state.chose;
                _chose[state] = this.state.type[state].TotalCount;
                this.setState({
                    chose: _chose
                })
            }
        }else{
            let _chose = this.state.chose;
            delete _chose[state];
            this.setState({
                chose: _chose
            })
        }
    }
    render(){
        return <DiyDialogView style={{
            "max-width":"500",
            "margin": "auto"
        }}>
            <DiyDialogTitle>
                批量划扣
            </DiyDialogTitle>
            <DiyDialogContent>

                <div className="clear-both small-font padding-tb-1x">
                    <div className="block-3">
                        <Checkbox label="待还款" disabled={this.state.checkOn} onCheck={(e, bool)=>{this.onCheck(e,0,bool)}} />
                    </div>
                    <div className="block-3">
                        <Checkbox label="逾期" disabled={this.state.checkOn} onCheck={(e, bool)=>{this.onCheck(e,2,bool)}} />
                    </div>
                    <div className="block-3">
                        <Checkbox label="划扣失败" disabled={this.state.checkOn} onCheck={(e, bool)=>{this.onCheck(e,3,bool)}} />
                    </div>
                </div>

                <div className="clear-both small-font padding-tb-1x">
                    <FlatButton
                        label={this.state.label}
                        primary={true}
                        disable={this.state.click}
                        onClick={this.startHuakou}/>
                    <span>一共{(this.state.chose[0]||0) + (this.state.chose[2]||0) + (this.state.chose[3]||0)}条数据</span>
                    <span>已划{this.state.finish}/总计{(this.state.chose[0]||0) + (this.state.chose[2]||0) + (this.state.chose[3]||0)}</span>
                </div>
                
                <div style={{position: "relative",height:"3px"}}>
                    <p style={{width: "20%",position:"absolute", height: "100%", background: "#333"}} className="zIndex1"></p>
                    <p style={{width: "100%",position:"absolute", height: "100%",background: "#eee"}}></p>
                </div>
                <div className="clear-both">
                    <div className="block-2">
                        <p>成功数</p>
                        <p>{}</p>
                    </div>
                    <div className="block-2">
                        <p>失败数</p>
                    </div>
                </div>
            </DiyDialogContent>
            <DiyDialogAction>
                <FlatButton
                        label='确认'
                        primary={true}
                        onClick={this.props.disabled ? this.apply : this.applyPeople}/>
                <FlatButton label='关闭' onClick={this.props.close}/>
            </DiyDialogAction>
        </DiyDialogView>
    }
}

class DeletePeople extends Component {
    constructor(props){
        super(props);
        this.state = {
            button: {
                state : 1,
                chinese : "确认删除"
            }
        }
        this.apply = this.apply.bind(this);
    }
    apply(){
        if(this.state.button.state === 2){
            return;
        }
        let _button = this.state.button;
        _button.state = 2;
        _button.chinese = "删除中……";
        this.setState({
            button : _button
        }, ()=>{
            inter.delete.data.contarctId = this.props.contarctId;
            deletePeople((data)=>{
                
                _button.state = 1;
                _button.chinese = "确认删除";
                this.setState({
                    button : _button
                }, ()=>{
                    if(data.error){
                        alert(data,error);
                    }else{
                        alert("删除成功!");
                        this.props.close();
                    }
                })
            })
        })
    }
    render(){
        return <DiyDialogView style={{
            "max-width":"500",
            "margin": "auto"
        }}>
            <DiyDialogTitle>
                确认删除
            </DiyDialogTitle>
            <DiyDialogContent>
                <div>是否确认删除<span className="info-color">{this.props.name}</span></div>
            </DiyDialogContent>
            <DiyDialogAction>
                <FlatButton
                        label={this.state.button.chinese}
                        primary={true}
                        onClick={this.apply}/>
                <FlatButton label='关闭' onClick={this.props.close}/>
            </DiyDialogAction>
        </DiyDialogView>
    }
}

export {DiyDialog, 
    Dismission, 
    Employee, 
    Progressive, 
    Result,
    ChangePassword,
    DaiFu,
    HuaKou,
    ChangeTime,
    ChangeTimeAfterSet ,
    ChangeFinalTerm,
    ChangeFinalMoney,
    AddImage,
    PLhuakou,
    Settle,
    DeletePeople
};
/* jshint ignore: end */