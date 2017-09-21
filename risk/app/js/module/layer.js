/* jshint ignore : start */
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

class MaterialPaper extends Component {
    render() {
        return (
            <Paper {...this.props} >
                {this.props.children}
            </Paper>
        );
    }
}

//默认0
MaterialPaper.defaultProps = {
    zDepth: 0
}

export {MaterialPaper}


/* jshint ignore : end */