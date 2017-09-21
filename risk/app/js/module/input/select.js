/* jshint ignore: start */
import React, {Component} from 'react';
import {MaterialTextSelect as Select} from './input';
import {getValue} from './../../config/dataConfig';
import {inter} from './../../config/interface';
import {getLeader, getCompany, getRole} from './../../config/itemConfig';
import option from '../../../json/option';
import lzy from '../../common/lvlup';

class ChoseLeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: [],
            update: "update"
        }
        this.setOption = this
            .setOption
            .bind(this);
        this.getLeader = getLeader.bind(this);
        this.getLeaderItem = this.getLeaderItem.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.getLeaderItem();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.update === "update"){
            return true;
        }

        if(this.props.role !== nextProps.role){
            return true;
        }

        if(this.props.company !== nextProps.company){
            return true;
        }

        if(this.props.leader !== nextProps.leader){
            return true;
        }
        
        if(this.props.errorText !== nextProps.errorText){
            return true;
        }

        return false;
    }

    componentWillUpdate(nextProps, nextState) {
        //console.log(nextProps.data, this.props.data);
        if(this.props.role !== nextProps.role || this.props.company !== nextProps.company){
            this.setState({update: "update"}, ()=>{
                this.getLeaderItem();
            }); 
        }
    }

    setOption(value) {
        //this.props.leader && this.selectChange('', '', this.props.leader);
        this.setState({option: value || []},()=>{
            this.setState({
                update: "finish"
            })
        });
    }

    getLeaderItem() {
        inter.getLeader.data.roleId = this.props.role;
        inter.getLeader.data.company = this.props.company;
        this.getLeader(this.setOption);
    }

    selectChange(event, index, value) {
        this
            .props
            .selectChange('leader', value);
    }

    render() {
        return (<Select
            item={this.state.option}
            value={this.props.leader}
            onChange={this.selectChange}
            placeholder="所属上级"
            fullWidth={true}
            errorText={this.props.errorText}/>);
    }
}
class ChoseCompany extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option: [],
            update: "update"
        }
        this.setOption = this
            .setOption
            .bind(this);

        this.getCompany = getCompany.bind(this);

        this.getCompanyItem = this
            .getCompanyItem
            .bind(this);

        let callback = inter.getCompany.callback;
        this.getCompanyItem();
        /* if(callback[0].PrimaryText === "string"){
            this.getCompanyItem();
        }else{
            this.state.option = callback;
            this.state.update = "finish";
        } */

        this.selectChange = this
            .selectChange
            .bind(this);
    }

   /*  shouldComponentUpdate(nextProps, nextState) {
        return this.state.update === "update" || nextProps.value !== this.props.value || this.props.errorText !== nextProps.errorText;
    } */

    getCompanyItem() {
        this.getCompany(this.setOption);
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(this.state.update, 1);
    }

    setOption(value) {
        let that = this;
        setTimeout(function() {
            that.setState({option: value, update: 'finish'});
        }, 500);
        
    }

    selectChange(event, index, value) {
        this
            .props
            .selectChange('company', value, event.target.innerHTML);
    }

    render() {
        return (<Select
            item={this.state.option}
            value={this.props.value}
            onChange={this.selectChange}
            placeholder="所属公司"
            fullWidth={true}
            errorText={this.props.errorText}/>)
    }
}

class ChoseRole extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option: [],
            update: "update"
        }
        this.setOption = this
            .setOption
            .bind(this);

        this.getRole = getRole.bind(this);
        
        this.getRoleItem = this
            .getRoleItem
            .bind(this);

        //inter.getRole.callback[0].PrimaryText === "string" && this.getRoleItem();

        let callback = inter.getRole.callback;

       /*  if(callback[0].PrimaryText=== "string"){ */
            this.getRoleItem();
        /* }else{
            this.state.option = callback;
            this.state.update = "finish";
        } */

        this.selectChange = this
            .selectChange
            .bind(this);
    }

    getRoleItem() {
        this.getRole(this.setOption);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.update === "update" || this.props.value !== nextProps.value || this.props.errorText !== nextProps.errorText;
    }

    setOption(value) {
        this.setState({option: value, update: 'finish'});
    }

    selectChange(event, index, value) {
        this
            .props
            .selectChange('role', value, event.target.innerHTML);
    }

    render() {
        return (<Select
            item={this.state.option}
            value={this.props.value}
            onChange={this.selectChange}
            placeholder="选择角色"
            fullWidth={true}
            errorText={this.props.errorText}/>)
    }
}

class ChosePayType extends Component {
    constructor(props){
        super(props);
        this.state={
            option: [
                {
                    value:"15",
                    primaryText:"15期"
                },{
                    value: "20",
                    primaryText: "20期"  
                },{
                    value: "25",
                    primaryText: "25期"
                },{
                    value: "30",
                    primaryText: "30期"
                }
            ]
        }
        this.selectChange = this.selectChange.bind(this);
    }
    selectChange(event, index, value){
        this.props.selectChange('ApplyTerm', value);
    }
    render() {
        return (<Select
            item={this.state.option}
            value={this.props.value}
            onChange={this.selectChange}
            disabled={this.props.disabled}
            placeholder="申请期限"
            fullWidth={true}
            errorText={this.props.errorText}/>)
    }
}

//选择来源
class ChoseComeFrom extends Component {
    constructor(props){
        super(props);
        this.state={
            option: [
                {
                    value:"1",
                    primaryText:"信贷"
                },{
                    value: "2",
                    primaryText: "投资公司"  
                },{
                    value: "3",
                    primaryText: "空放"
                },{
                    value: "4",
                    primaryText: "同行"
                },{
                    value: "5",
                    primaryText: "展业"
                }
            ]
        }
        this.selectChange = this.selectChange.bind(this);
    }
    selectChange(event, index, value){
        this.props.selectChange('ComeFrom', value);
    }
    render() {
        return (<Select
            item={this.state.option}
            value={this.props.value}
            onChange={this.selectChange}
            disabled={this.props.disabled}
            placeholder="申请来源"
            fullWidth={true}
            errorText={this.props.errorText}/>)
    }
}
//选择类型
class ChoseType extends Component {
    constructor(props){
        super(props);
        let _option = [{
            value:"0",
            primaryText:"系统"
        }];
        (getValue().Role === 10010 || getValue().Role === 10008) && _option.push({
            value: "1",
            primaryText: "人工"
        })
        this.state={
            option:_option
        }
        this.selectChange = this.selectChange.bind(this);
    }
    selectChange(event, index,value){
        this.props.selectChange("messageType", value);
    }
    render(){
        return (
            <Select
            item={this.state.option}
            value={this.props.value}
            onChange={this.selectChange}
            disabled={this.props.disabled}
            placeholder="选择类型"
            fullWidth={true}
            errorText={this.props.errorText}/>
        )
    }
}

//结清类型
class ChoseSettleType extends Component {
    constructor(props){
        super(props);
        this.state={option:option.settleState};
        this.selectChange = this.selectChange.bind(this);
    }
    selectChange(event, index,value){
        this.props.selectChange("type", value);
    }
    render(){
        return (
            <Select
            item={this.state.option}
            value={this.props.value}
            onChange={this.selectChange}
            disabled={this.props.disabled}
            placeholder="结清类型"
            fullWidth={true}
            errorText={this.props.errorText}/>
        )
    }
}

//通用选择  
const CommonSelect = (props) => <Select {...props} />


export {ChoseLeader, ChoseCompany, ChoseRole, ChosePayType, ChoseComeFrom, ChoseType, ChoseSettleType};
/* jshint ignore: end */
