/* jshint ignore : start */
import React, { Component } from 'react';
import {MaterialPaper as Layer} from '../layer';


class FormBlock extends Component {
    render() {
        let maxWidth = '323';
        let minWidth = '220';
        let style = {
             width:`100%`,
             'min-width': minWidth,
             'max-width': `${maxWidth * this.props.width + (this.props.width - 1)*4 }px`,
             'border': '1px solid #eee'
        }
        return (
            <Layer className="formInputGroup" style={style} zDepth={0}>
                <span className="formInputLeft">{this.props.tip}</span>
                <div className="formInput">
                    {this.props.children}
                </div>{
                    this.props.button && <div className="formInputRight"> {this.props.button} </div>
                }
            </Layer>
        );
    }
}

FormBlock.defaultProps = {
    width: 1
}

export {FormBlock};
/* jshint ignore : end */