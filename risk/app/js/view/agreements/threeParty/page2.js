/* jshint ignore: start */
import React, {Component} from 'react';
import {drawCanvas} from '../drawAgreement';
import {page2} from './dot';

class Page2 extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            data: {
                //总金额
                sumMoney: props.BorrowMoney,
                serviceMoney: props.ServiceMoney,
                //回款
                backMoney: props.PayList[0].EveryPaymentMoney,
                term: props.Trem,
                startYear: this.formatTime(props.StartTime).year,
                startMonth: this.formatTime(props.StartTime).month,
                startDay:  this.formatTime(props.StartTime).day,
                endYear: this.formatTime(props.EndTime).year,
                endMonth: this.formatTime(props.EndTime).month,
                endDay: this.formatTime(props.EndTime).day
            }
        }
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

    componentDidMount(){
        drawCanvas("/img/threeParty/page2.jpg", "page2", page2(this.state.data));
    }
    render() {
        return (
            <div id="page2" style={{zoom:.34}}></div>
        );
    }
}

export {Page2};
/* jshint ignore: end */