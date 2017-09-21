/* jshint ignore:  start */
import React, { Component } from 'react';
import {MaterialTextField as Input} from '../../module/input/input';
import {FormBlock} from '../../module/form/formBlock';

import {MaterialFlatButton as FlatButton} from '../../module/buttons';
import {selectUserMessage} from '../../config/applyConfig';
import {inter} from '../../config/interface';
import {isIdCard} from '../../common/check';
import CircularProgress from 'material-ui/CircularProgress';


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

class ApplyStep1 extends Component {
    constructor(props){
        super(props);
        let _inter = inter.addUserMessage.data;
        this.state = {
            value: {
                PersonCardNo: _inter.PersonCardNo !== "string" && _inter.PersonCardNo || "" //身份证
            },
            error: {
                PersonCardNo: ""
            },
            loading: false
        }
        this.inputChange = this.inputChange.bind(this);
        this.apply = this.apply.bind(this);
    }

    inputChange(name, value){
        let _value = this.state.value;
        let _error = this.state.error;
        _value[name] = value;
        _error[name] = '';
        this.setState({
            value: _value,
            error: _error
        })
    }

    apply(index){
        let _json = isIdCard(this.state.value.PersonCardNo);
         if(_json.error){
            let _error = this.state.error;
            _error.PersonCardNo = '身份证格式不正确';
            this.setState({
                error: _error
            });
            return;
        }
        inter.selectUserMessage.data.PersonCardNo = this.state.value.PersonCardNo;
        this.setState({
            loading: true
        })
        selectUserMessage((data)=>{
            inter.addUserMessage.data = {};
            inter.addUserMessage.data.PersonCardNo = this.state.value.PersonCardNo;
            this.setState({
                loading: false
            })
            if(data.errorCode === 1){
                alert(data.error);
                return;
            }
            if(data.error){
                this.props.callback('isSelectSuccess', false, index);
            }else{
                inter.addUserMessage.data = data;
                this.props.callback('isSelectSuccess', true, index);
            }
        });
    }

    render() {
        return (
            <div style={{'max-width': "1000px",'width': "95%"}} >
                <FormBlock tip="身份证" width={2} >
                    <Input placeholder="身份证号"
                            floatHolder="请输入身份证号"
                            type="text"
                            name="PersonCardNo"
                            value={this.state.value.PersonCardNo}
                            fullWidth={true}
                            disabled = {this.props.disabled}
                            errorText={this.state.error.PersonCardNo}
                            onChange={(e)=>this.inputChange('PersonCardNo', e.currentTarget.value)}
                        />
                </FormBlock>
                { !this.state.loading && !this.props.static && <FlatButton primary={true} fullWidth={true} style={{margin: '10px 0'}} label="下一步" onClick={()=>this.apply(1)} />}
                {this.state.loading && <FlatButton primary={true} fullWidth={true} style={{margin: '10px 0'}} label={<CircularProgress />} /> }
                <span className="wrong-color" style={{'padding': '0 10px'}}>{this.state.error.summary}</span>
              </div>
        );
    }
}

export {ApplyStep1};
/* jshint ignore: end */