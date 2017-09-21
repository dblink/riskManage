/* jshint ignore :start */
import React, {Component} from 'react';
import {page1 as dot} from './dot';
/* import {Welcome} from '../../index'; */
import {drawCanvas} from '../drawAgreement';

class Page1 extends Component {
    constructor(props) {
        super(props);
        let qs = [],
            rq = [],
            qcbj = [],
            zhbj = [],
            zhlx = [],
            zhke = [],
            zmbj = [],
            tqjq = [];
        this
            .props
            .PayList
            .map((json) => {
                qs.push(json.Times);
                rq.push(json.PayTime.replace(/T.*/, ""));
                qcbj.push(json.StartCroups);
                zhbj.push(json.EveryWeekCroups);
                zhlx.push(json.EveryInterest);
                zhke.push(json.EveryPaymentMoney);
                zmbj.push(json.ResidualCroups);
                tqjq.push(json.ServiceMoney);
            });
        let time=  new Date();
        let company = props.Company.length === 1 && `00${props.Company}` || props.Company.length === 2 && `0${props.Company}` || props.Company
        this.state = {
            data: {
                htbh: company + props.ContarctNo,
                qxrq: props.StartTime.replace(/T.*/,""),
                qsrq: props.PayList[0].PayTime.replace(/T.*/,""),
                jsrq: props.EndTime.replace(/T.*/,""),
                jkhtje: props.BorrowMoney ,
                jkqs: props.Trem,
                cplb: "A",
                zhje: props.PayList[0].EveryPaymentMoney,
                fze: props.ServiceMoney,
                khm: props.BorrowName,
                khh: props.BankName,
                zh: props.BankNo,
                qs: qs,
                rq: rq,
                qcbj: qcbj,
                zhbj: zhbj,
                zhlx: zhlx,
                zhke: zhke,
                zmbj: zmbj,
                tqjq: tqjq,
                time: props.StartTime.replace(/T.*/, ""),
            }
        }
    }
    componentDidMount() {
        /*  let _canvas = document.createElement("canvas");
        let _context = _canvas.getContext("2d");
        let img = new Image();
        let array = [];
        let nameList = Object.keys(this.state.data);
        let sub = 0;
        img.src = "/img/threeParty/page6.jpg";
        img.onload = function(){
            _canvas.height = 596 * img.height / img.width;
            _canvas.width = 596;

            _context.drawImage(img, 0, 0, _canvas.width, _canvas.height);

            _canvas.addEventListener("click", function(e){
                array.push({name: `data.${nameList[sub]}`, x: e.layerX, y:e.layerY});
                sub++;
                console.log(JSON.stringify(array));
            })
            document.getElementById("canvas").appendChild(_canvas);
        }  */
        drawCanvas("/img/threeParty/page6.jpg", "repayDetail", dot(this.state.data));
    }

    formatTime(date) {
        date = date.replace(/T.*/, "");
        date = date.split("-");
        return {year: date[0], month: date[1], day: date[2]}
    }

    clicked(e) {}

    render() {
        return (
            <div className="center" id="repayDetail" style={{
                zoom: 0.34,
                "margin-top": "300px"
            }}>
                {/* <div id="page1" style={{zoom:0.34}}></div> */}
                {/*  <canvas onClick={this.clicked} id="canvas" ></canvas> */}
            </div>

        );
    }
}

export {Page1};
/* jshint ignore :end */