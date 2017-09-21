/* jshint ignore :start */
import React, {Component} from 'react';
import {page1 as dot} from './dot';
import {Welcome} from '../../index';
import {drawCanvas} from '../drawAgreement';

class Page1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                fp: "姚云",
                fpCard: "320586199107091217",
                sp: this.props.BorrowName,
                spCard: this.props.PesonCardNo,
                spAddress: this.props.BorrowPeopleAddress,
                spMobile: this.props.BorrowMobile,
                tp: "苏州缘天金服科技有限公司",
                tpAddress: "苏州工业园区华池街88号晋合广场1座1101-A室",
                fop: "苏州缘天普惠企业管理有限公司",
                fopAddress: "苏州工业园区华池街88号晋合广场1座1101-B室"
            }
        }
    }
     componentDidMount() {
        drawCanvas("/img/threeParty/page1.jpg", "page1", dot(this.state.data));
    }
    
    render() {
        return (
                <div id="page1" style={{zoom:0.34}}></div>

        );
    }
}

export {Page1};
/* jshint ignore :end */