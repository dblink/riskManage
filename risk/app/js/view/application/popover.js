
/* jshint ignore: start */

import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import {MaterialFlatButton as FlatButton} from '../../module/buttons';

class SelectPopover extends Component {
    constructor(props){
        super(props);
        this.state={ 
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
        this.props.popoverShow();
        this.setState({domPosition:e.currentTarget});
    }

    popoverClose(e) {
        //this.setState({open: false});
        this.props.popoverClose();
    }

    render() {
        return (
            <div>
                 <Popover
                    open={this.props.open}
                    anchorEl={this.state.domPosition}
                    onRequestClose={this.popoverClose}
                    anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom'
                }}
                    targetOrigin={{
                    horizontal: 'left',
                    vertical: 'top'
                }}>
                    {this.props.children}
                </Popover>

                <FlatButton primary={true} label={this.props.name} onClick={this.popoverShow} />
            </div>
        );
    }
}
export {SelectPopover}