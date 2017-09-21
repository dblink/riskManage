/* jshint ignore :start */
import React, {Component} from 'react';
import {MaterialTheme as Index} from '../module/index';
import {MaterialFlatButton as FlatButton} from '../module/buttons';
import {MaterialPaper as Layer} from '../module/layer';
import {MaterialMenu as Menu, MaterialList as List} from '../module/list';
import {getValue} from '../config/dataConfig';

import TableEmployee from './employee/tableEmployee';
import {Application} from './application/application';
import {ApplicationList} from './application/applicationList';
import {ReviewList} from './review/reviewList';

import {inter} from '../config/interface';
import logo from '../../img/ytlogo.png';
import IndexWelcome from './welcome';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zDepth: "",
            size: 1,
            open: false,
            domPosition: ""
        }

        this.popoverShow = this
            .popoverShow
            .bind(this);
        this.popoverClose = this
            .popoverClose
            .bind(this);
    }

    popoverShow(e) {
        this.setState({open: true, domPosition: e.currentTarget})
    }

    popoverClose(e) {
        this.setState({open: false});
    }

    render() {
        let item = this.state.innerItem;
        return (
            <div>
                <Index className="clear-both" logo={logo}>
                    <Layer className="block-2-80 layer-top">
                        {this.props.children || getValue().Role !== 10005 && <IndexWelcome /> || "欢迎光临"}
                    </Layer>
                </Index>
            </div>
        );
    }
}

export {Welcome};