/* jshint ignore: start */
import React, { Component } from 'react';
import {MaterialFlatButton as FlatButton} from '../../module/buttons';
import {updateRadar} from '../../config/applyConfig';
import {inter} from '../../config/interface';
class ApplyStep6 extends Component {
    constructor(props){
        super(props);
        this.state ={
            buttonName: "点击开启雷达验证",
            buttonState: true,
            buttonColor: "",
            buttonClick: false
        }
        this.radar = this.radar.bind(this);
        this.apply = this.apply.bind(this);
    }
    radar(){
        if(!this.state.buttonState){
            return;
        }
        this.setState({
            buttonName: "验证中……请稍后",
            buttonState: false
        }, ()=>{
            inter.UpdateRadar.data.id = this.props.applyID;
            updateRadar((data)=>{
                if(data.error){
                    this.setState({
                        buttonName: data.error + "，点击重试!",
                        buttonState: true,
                        buttonColor: "#a94442"
                    })
                }else{
                    this.setState({
                        buttonName: "验证成功！",
                        buttonColor: "#00c795",
                        buttonClick: true
                    })
                    
                }
            })
        })
       
    }
    apply(index){
        if(!this.state.buttonClick){
            alert("雷达必须验证！");
            return;
        }

        this.props.callback("","",index);
    }
    render() {
        
        return (
            <div>{/*#a94442*/}
                <FlatButton style={{color: this.state.buttonColor}} label={this.state.buttonName} onClick={this.radar} />
                <div>
                    <FlatButton primary={true} style={{margin: '10px 0','width': '100%'}} label="下一步" onClick={()=>this.apply(6)} />
                </div>
            </div>
        );
    }
}

export {ApplyStep6};