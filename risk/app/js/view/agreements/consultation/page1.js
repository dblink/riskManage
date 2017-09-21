/* jshint ignore :start */
import React, {Component} from 'react';
/*import {json as dot} from './dot';
 import {Welcome} from '../../index'; */
import {drawCanvas} from '../drawAgreement';

class Page1 extends Component {
    constructor(props) {
        super(props);
        let date = this.formatTime(props.StartTime);
         let company = props.Company.length === 1 && `00${props.Company}` || props.Company.length === 2 && `0${props.Company}` || props.Company
        this.state = {
            data: {
                fp: "苏州缘天金服科技有限公司",
                fpAddress: "苏州工业园区华池街88号晋合广场1座1101-A室",
                sp: props.BorrowName,
                spCard: props.PesonCardNo,
                spAddress: props.BorrowPeopleAddress,
                spPhone: props.BorrowMobile,
                bf: "苏州缘天普惠企业管理有限公司",
                bfAddress: "苏州工业园区华池街88号晋合广场1座1101-B室" ,
                year: date.year,
                month: date.month,
                day: date.day,
                big: props.EcanRMB,
                bh: company + props.ContarctNo
            }
        }
    }
    dot(data) {
        return [
            {
                "name": data.fp,
                "x": 162,
                "y": 87
            }, {
                "name": data.fpAddress,
                "x": 88,
                "y": 107
            }, {
                "name": data.sp,
                "x": 158,
                "y": 151
            }, {
                "name": data.spCard,
                "x": 107,
                "y": 171
            }, {
                "name": data.spAddress,
                "x": 95,
                "y": 196
            }, {
                "name": data.spPhone,
                "x": 135,
                "y": 217
            }, {
                "name": data.bf,
                "x": 92,
                "y": 261
            }, {
                "name": data.bfAddress,
                "x": 92,
                "y": 283
            }, {
                "name": data.year,
                "x": 264,
                "y": 544
            }, {
                "name": data.month,
                "x": 334,
                "y": 545
            }, {
                "name": data.day,
                "x": 379,
                "y": 544
            }, {
                "name": data.big,
                "x": 248,
                "y": 570
            }, {
                "name": data.bh,
                "x": 125,
                "y": 588
            }
        ]
    }
    componentDidMount() {
        /* let _canvas = document.createElement("canvas");
        let _context = _canvas.getContext("2d");
        let img = new Image();
        let array = [];
        let nameList = Object.keys(this.state.data);
        let sub = 0;
        img.src = "/img/threeParty/page9.jpg";
        img.onload = function () {
            _canvas.height = 596 * img.height / img.width;
            _canvas.width = 596;

            _context.drawImage(img, 0, 0, _canvas.width, _canvas.height);

            _canvas.addEventListener("click", function (e) {
                array.push({name: `data.${nameList[sub]}`, x: e.layerX, y: e.layerY});
                sub++;
                console.log(JSON.stringify(array));
            })
            document
                .getElementById("canvas")
                .appendChild(_canvas);
        } */
        drawCanvas("/img/threeParty/page9.jpg","canvas2", this.dot(this.state.data));
    }

     formatTime(date){
        date = date.replace(/T.*/, "");
        date= date.split("-");
        return {
            year: date[0],
            month: date[1],
            day: date[2]
        }
    }

    clicked(e) {}

    render() {
        return (
            <div id="canvas2" style={{zoom:0.34}}>
                {/* <div id="page1" style={{zoom:0.34}}></div> */}
                {/*  <canvas onClick={this.clicked} id="canvas" ></canvas> */}
            </div>

        );
    }
}

export {Page1};
/* jshint ignore :end */