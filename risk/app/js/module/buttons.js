/* jshint ignore: start */
import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import lzy from '../common/lvlup';

class MaterialFlatButton extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        //console.log(nextProps, this.props);
        return !(lzy.jsonDeepCompare(nextProps, this.props));
    }
    render() {
        let props = this.props;
        return (<FlatButton {...this.props}/>);
    }
}

class MaterialRaisedButton extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        //console.log(nextProps, this.props);
        return !(lzy.jsonDeepCompare(nextProps, this.props));
    }
    render() {
        let props = this.props;
        return (<RaisedButton {...this.props}/>);
    }
}

export { MaterialFlatButton , MaterialRaisedButton }

/* jshint ignore: end */