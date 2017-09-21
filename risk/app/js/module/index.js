/* jshint ignore: start */
import React, {Component} from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import {MaterialPaper as Layer} from './layer';
import {MaterialList as List} from './list';
import {MaterialFlatButton} from './buttons';
import {DiyDialog as Dialog, ChangePassword} from './dialog/dialog';
import {clearStorage} from '../config/dataConfig';
import { browserHistory } from 'react-router';
import menuConfig from '../config/menuConfig';
import {restore} from '../config/interface';

class MaterialTheme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                item: [],
                check: true
            },
            show: false
        };

        menuConfig((callback) => {
            //console.log(callback);
            this.setState({
                item: {
                    item: callback,
                    check: true
                }
            })
        });
        this.show = () => {
            this.setState({show: true})
        }
        this.close = () => {
            this.setState({show: false})
        }
        
    }
    clear(){
        clearStorage();
        browserHistory.push("/");
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className={this.props.className} style={this.props.style}>
                    <Layer
                        className="block-2-20"
                        style={{
                        "max-width": "256px",
                        "height": document.body.clientHeight+"px",
                        "overflow": "auto"
                    }}>
                        <div
                            style={{
                            "text-align": "center",
                            "padding": "50px 0"
                        }}>
                            <img
                                src={this.props.logo}
                                style={{
                                width: "80%"
                            }}/>
                        </div>
                        <div>
                            <MaterialFlatButton label="主页" fullWidth={true} onClick={()=>{browserHistory.push("/index")}} />
                            <MaterialFlatButton label="修改密码" style={{"width": "50%"}} onClick={this.show}/>
                            <MaterialFlatButton label="注销" style={{"width": "50%"}} onClick={this.clear} />
                        </div>
                        <List item={this.state.item.item} check={this.state.item.check}/>
                    </Layer>
                    {this.props.children}
                    <Dialog show={this.state.show}>
                        <ChangePassword close={this.close}/>
                    </Dialog>
                </div>

            </MuiThemeProvider>
        )
    }
}

class MaterialThemeNoMenu extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className={this.props.className} style={this.props.style}>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        )
    }
}

export {MaterialTheme, MaterialThemeNoMenu}
/* jshint ignore:end */