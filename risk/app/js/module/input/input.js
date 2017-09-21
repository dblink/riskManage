/* jshint ignore: start */
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {lzyItemList as itemList} from '../list';


class MaterialTextField extends Component {
    render() {
        let props = this.props;
        props.hintText = props.placeholder || props.hintText;
        props.floatingLabelText = props.floatHolder;
        delete props.placeholder;
        return (<TextField {...props}/>);
    }
}

class MaterialTextSelect extends Component {
    render() {
        let props = this.props;
        props.floatingLabelText = props.placeholder;
        delete props.placeholder;
        return (
            <SelectField {...this.props}>
                {itemList(props, MenuItem)}
            </SelectField>
        )
    }
}

class MaterialTextFieldAndButton extends Component {
    render(){
        let props = this.props;
        props.hintText = props.placeholder || props.hintText;
        props.floatingLabelText = props.floatHolder;
        delete props.placeholder;
        return (
            <div>
                <TextField {...props}/>
            </div>
        )
    }
}

export {MaterialTextField, MaterialTextSelect};

/* jshint ignore: end */
