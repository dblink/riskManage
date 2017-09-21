/* jshint ignore : start */
import React, {Component} from 'react';
import Menu from 'material-ui/Menu';
import tapeventplugin from 'react-tap-event-plugin';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import lzy from '../common/lvlup';

tapeventplugin();

class MaterialMenu extends Component {
    render() {
        let props = this.props;
        return (
            <Menu desktop={this.props.desktop} >
                {
                    _itemList(props, MenuItem)
                }
            </Menu>
        );
    }
}

class MaterialList extends Component {
  /*   shouldComponentUpdate(nextProps, nextState) {
        return this.props.check
    } */
    render(){
        let props = this.props;
        //console.log(props);
        let _itemlist = _itemList(props, ListItem);
        return (
                <List>
                    {
                        _itemlist
                    }
                </List>
            )
    }
}

const _itemList = (props, Item) => {
    return props
        .item
        .map((e, key) => {
            let _itemlist;
            let _items = [];
            let _rightIcon;
            let _props = {};
            _props[e.nextParameter] = e[e.nextParameter];
            if(e.primaryText === "line"){
                _itemlist = <Divider />;
            }else{
                if(typeof _props[e.nextParameter]  === "object" && _props[e.nextParameter] .length){
                    let _json = {item : _props[e.nextParameter] };
                    _items = _itemList(_json, Item);
                }
                _items = _items.length && _items;
                _props[e.nextParameter] = _items;
                
                _itemlist = <Item {...e} {..._props} key={key+1} />;
            }
            return _itemlist;
        })
};


export function lzyItemList(props, Item){
    return _itemList(props, Item)
}
export {MaterialMenu, MaterialList};
/* jshint ignore : end */