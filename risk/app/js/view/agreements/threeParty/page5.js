/* jshint ignore: start */
import React, {Component} from 'react';
import {drawCanvas} from '../drawAgreement';
import {page5} from './dot';

class Page5 extends Component {
    constructor(props) {
        super(props);
        let time = new Date();
        this.state = {
            data: {
                fp: "/img/yaoyun.png",
                fpTime: props
                    .StartTime
                    .replace(/T.*/, ""),
                sp: "",  //this.props.BorrowName, 
                spTime: props
                    .StartTime
                    .replace(/T.*/, ""),
                th: "苏州缘天金服科技有限公司",
                thTime: props
                    .StartTime
                    .replace(/T.*/, ""),
                fop: "苏州缘天普惠企业管理有限公司",
                fopTime: props
                    .StartTime
                    .replace(/T.*/, ""),
                jinfuzhang: "/img/jinfuzhang.png",
                puhuizhang: "/img/puhuizhang.png"
            },
            srcArrray: ["fp", "jinfuzhang", "puhuizhang"]
        }
        this.loadImage = this.loadImage.bind(this);
    }
    componentDidMount() {
        this.loadImage();
    }
    loadImage(sub = 0) {
        let _img = new Image();
        let _data = this.state.data;
        _img.src = _data[this.state.srcArrray[sub]];

        _img.addEventListener("load", () => {
            _data[this.state.srcArrray[sub]] = _img;
            this.setState({
                data: _data
            }, () => {
                if (sub === this.state.srcArrray.length -1) {
                    drawCanvas("/img/threeParty/page5.jpg", "page5", page5(this.state.data));
                } else {
                    this.loadImage(++sub)
                }
            })
        })
    }
    render() {
        return (
            <div id="page5" style={{
                zoom: .34
            }}></div>
        );
    }
}

export {Page5};
/* jshint ignore: end */