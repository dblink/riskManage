/* jshint ignore: start */
import React, {Component} from 'react';
import Close from 'material-ui/svg-icons/navigation/close';
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import {MaterialPaper as Layer} from '../../module/layer';
import {MaterialTextField as TextField} from '../../module/input/input';
import {ChoseLeader as SelectLeader, ChoseCompany as SelectCompany, ChoseRole as SelectRole} from '../../module/input/select';
import {MaterialRaisedButton as RaisedButton , MaterialFlatButton as FlatButton} from '../../module/buttons';
import {getCompany, getRole, getLeader, addEmployee} from '../../config/itemConfig';
import {check} from '../../module/check/check';
import {red600, lightGreen600} from 'material-ui/styles/colors';
import {inter} from '../../config/interface';

import Popover from 'material-ui/Popover';

class AddEmployee extends Component {
    constructor(props) {
        super(props);
        let data = this.props.data
        this.state = {
            value: {
                role: "",
                company: "" ,
                leader: "",
                mobile: "",
                name: ""
            },
            update: {
                leader: ""
            },
            error: {
                role: "",
                company: "",
                leader: "",
                mobile: "",
                name: ""
            },
            disable: {
                leader: true
            },
            requestError: "",
            requestColor: ""
        }

        this.getRole = getRole.bind(this);
        this.getCompany = getCompany.bind(this);
        this.getLeader = getLeader.bind(this);
        this.addEmployee = addEmployee.bind(this);

        this.setOption = this
            .setOption
            .bind(this);
        this.setValue = this
            .setValue
            .bind(this);
        this.setError = this
            .setError
            .bind(this);

        this.inputChange = this
            .inputChange
            .bind(this);
        this.selectChange = this
            .selectChange
            .bind(this);

        this.postAddEmployee = this
            .postAddEmployee
            .bind(this)
    }

    setOption(name, value) {
        let _option = this.state.option;
        _option[name] = value;
        this.setState({option: _option, update: 'finish'});
    }

    setValue(name, value) {
        let _value = this.state.value;
        _value[name] = value;
        this.setState({value: _value});
    }

    setError(name, value) {
        let _error = this.state.error;
        _error[name] = value;
        this.setState({error: _error});
    }

    selectChange(name, value) {
        var _value = this.state.value;
        _value[name] = value;
        if(name === 'role' || name === 'company'){
            _value['leader'] = '';
        }
        this.setState({value: _value});
        this.setError(name,'');
    }

    inputChange(e) {
        let name = e
            .currentTarget
            .getAttribute("data-name");
        let value = e.currentTarget.value;
        this.setValue(name, value);
        this.setError(name, '');
        this.setState({requestError: ''});
    }

    postAddEmployee() {
        let _data = inter.addEmployee.data;
        _data.Mobile = this.state.value.mobile;
        _data.Name = this.state.value.name;
        _data.RoleID = this.state.value.role;
        _data.LeaderID = this
            .state
            .value
            .leader
            .toString() || -1;
        _data.Company = this
            .state
            .value
            .company
            .toString() || -1;

        let back = check.employee();

        console.log(back.error);

        if(back.error){
            this.setError(back.name, back.error);
            return;
        }

        addEmployee(function (str) {
            if (str === 'success') {
                this.setState({
                    value: {
                        mobile: '',
                        name: '',
                        role: '',
                        leader: '',
                        company: ''
                    },
                    requestError: ` '[${inter.addEmployee.data.Name}]'添加成功!`,
                    requestColor: lightGreen600
                });
            } else {
                this.setState({requestError: str, requestColor: red600})
            }
        }.bind(this));
    }

    render() {
        return (
            <Layer>
                <Toolbar >
                    <ToolbarTitle text="添加员工"/>
                    <ToolbarGroup>
                        <IconButton >
                            <Close onClick={this.props.popoverClose}/>
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
                <Layer
                    style={{
                    width: '90%',
                    'margin': '20px auto',
                    'display': 'block'
                }}>
                    <Layer style={{
                        'color': this.state.requestColor
                    }}>
                        {this.state.requestError}
                    </Layer>
                    <TextField
                        placeholder="姓名"
                        floatHolder="员工姓名"
                        type="text"
                        data-name="name"
                        value={this.state.value.name}
                        fullWidth={true}
                        onChange={this.inputChange}
                        errorText={this.state.error.name}/>
                    <TextField
                        placeholder="电话"
                        floatHolder="员工电话"
                        type="text"
                        data-name="mobile"
                        fullWidth={true}
                        onChange={this.inputChange}
                        value={this.state.value.mobile}
                        errorText={this.state.error.mobile}/>

                    <SelectRole
                        value={this.state.value.role}
                        selectChange={this.selectChange}
                        errorText={this.state.error.role}/>

                    <SelectCompany
                        value={this.state.value.company}
                        selectChange={this.selectChange}
                        errorText={this.state.error.company}/>

                    {this.state.value.company.toString() && this.state.value.company.toString() !== '-1' && this.state.value.role && <SelectLeader
                        {...this.state.value}
                        selectChange={this.selectChange}
                        errorText={this.state.error.leader} />}

                    <RaisedButton
                        label='添加'
                        fullWidth={true}
                        primary={true}
                        onTouchTap={this.postAddEmployee}/>
                </Layer>
            </Layer>
        );
    }
}

class AddPopover extends Component {
    constructor(props){
        super(props);
        this.state={ 
            open: false,
            domPosition: ''
        }
        this.popoverShow = this
            .popoverShow
            .bind(this);
        this.popoverClose = this
            .popoverClose
            .bind(this);
    }

    popoverShow(e) {
        this.setState({open: true, domPosition: e.currentTarget})
    }

    popoverClose(e) {
        this.setState({open: false});
        this.props.request();
    }

    render() {
        return (
            <div>
                 <Popover
                    open={this.state.open}
                    anchorEl={this.state.domPosition}
                    anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom'
                }}
                    targetOrigin={{
                    horizontal: 'left',
                    vertical: 'top'
                }}
                    style={{
                    width: '400px'
                }}>
                    <AddEmployee popoverClose={this.popoverClose}/>

                </Popover>

                <FlatButton label="添加员工" onClick={this.popoverShow} />
            </div>
        );
    }
}


export {AddEmployee, AddPopover};

/* jshint ignore: end */