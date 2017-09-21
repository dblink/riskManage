/* jshint ignore: start */
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {MaterialPaper as Layer} from '../module/layer';
import Calendar from '../module/calender/calendar';
import {inter} from '../config/interface';
import {getStateListByTime, getStateListOnMouseOver} from '../config/infoConfig'
import src from '../../img/loading.gif';


//test
import { ExcelTable } from '../module/table';

const style = {
    dataBlock: {
        "display": "block",
        "height": "200px",
        "width": "200px",
        "text-align": "center",
        /*  "line-height": "185px", */
        "font-size": "2rem",
        /*  "border": "10px solid #eee" */
    },
    dataBlockTitle: {
        "height": "25px",
        "font-size": "14px",
        "line-height": "25px",
        "text-align": "left",
        "letter-spacing": "1px"
    },
    dataBlockContent: {
        "height": "150px",
        "line-height": "150px"
    }
}

const json = {
    year: [
        {
            value: "2017",
            primaryText: "2017年"
        }, {
            value: "2018",
            primaryText: "2018年"
        }
    ]
}

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                "overdueTime": ["loading"],
                "pendingRepaymentTime": ["loading"],
                "repaymentTime": ["loading"]
            },
            moveData: ""
        };
        let date = new Date();
        inter.getStateListByTime.data.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-1`;
        this.request = this
            .request
            .bind(this);
        this.onSelect = this
            .onSelect
            .bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.request();
    }

    request() {
        getStateListByTime((data) => {
            this.setState({
                data: {
                    overdueTime: data.overdueTime,
                    pendingRepaymentTime: data.pendingRepaymentTime,
                    repaymentTime: data.repaymentTime
                },
                refresh: true
            })
        })
    }

    onSelect(name, value, primaryText) {
        let timeList = inter
            .getStateListByTime
            .data
            .startTime
            .split("-");
        switch (name) {
            case "year":
                {
                    timeList[0] = value;
                    break;
                }
            case "month":
                {
                    timeList[1] = value;
                    break;
                }
        }
        inter.getStateListByTime.data.startTime = timeList.join("-");
        this.request();
    }

    jump(e){
        browserHistory.push(`/index/${e.currentTarget.getAttribute("data-time")}`);
    }

    mouseOver(e){
        let _time = e.currentTarget.getAttribute("data-time");
        let _state = e.currentTarget.getAttribute("data-state");
        inter.getStateListOnMouseOver.data.st = _time;
        inter.getStateListOnMouseOver.data.state = _state;
        getStateListOnMouseOver((data)=>{
            this.setState({
                moveData : data
            })
        })
    }

    mouseOut(e){
        this.setState({
            moveData :""
        })
    }

    render() {
        let timeList = inter
            .getStateListByTime
            .data
            .startTime
            .split("-");
        return (
            <div>
                <div
                    style={{
                    "max-width": "1024px",
                    padding: "50px 0 10px",
                    "text-align": "center",
                    "font-size": "14px"
                }}>
                    <div
                        className="title-hover pointer"
                        style={{
                        "display": "inline-block",
                        "width": "100px",
                        "position": "relative",
                        "text-align": "center"
                    }}>
                        <p
                            style={{
                            "display": "inline",
                            "font-size": "20px"
                        }}>{timeList[0]}</p>年
                        <ul
                            style={{
                            "width": "100%"
                        }}>
                            {json
                                .year
                                .map((e) => (
                                    <li
                                        onClick={() => {
                                        this.onSelect("year", e.value, `${e.value}年`)
                                    }}>{`${e.value}年`}</li>
                                ))
}
                        </ul>
                    </div>
                    <div
                        className="title-hover pointer"
                        style={{
                        "display": "inline-block",
                        "width": "100px",
                        "position": "relative",
                        "text-align": "center"
                    }}>
                        <p
                            style={{
                            "display": "inline",
                            "font-size": "20px"
                        }}>{timeList[1] < 10 && `0${timeList[1]}` || timeList[1]}</p>月
                        <ul
                            style={{
                            "width": "100%"
                        }}>{[1,2,3,4,5,6,7,8,9,10,11,12].map((e) => {
                                let text = e < 10
                                    ? `0${e}月`
                                    : `${e}月`;
                                return <li
                                    onClick={() => {
                                    this.onSelect("month", e, text)
                                }}>{text}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <div style={{
                    "max-width": "1024px"
                }}>
                    <Calendar
                        data={this.state.data}
                        state={this.state.refresh}
                        jump={this.jump}
                        mouseOver={this.mouseOver}
                        mouseOut = {this.mouseOut}
                        moveData={this.state.moveData ? <Data data={this.state.moveData} /> : <img src={src} style={{display:"block"}} />}
                        time={inter.getStateListByTime.data.startTime}/>
                </div>
                {/* <ExcelTable firstData={{name: "手机号",attr: "a"}} setting={[{name: "title1", attr: "a"},{name: "title2", attr: "b"},{name: "title1", attr: "a"},{name: "title2", attr: "b"},{name: "title1", attr: "a"},{name: "title2", attr: "b"},{name: "title1", attr: "a"},{name: "title2", attr: "b"},{name: "title1", attr: "a"},{name: "title2", attr: "b"},{name: "title1", attr: "a"},{name: "title2", attr: "b"},{name: "title1", attr: "a"},{name: "title2", attr: "b"}]} data={[{a:123,b:234},{a:456, b:789},{a:123,b:234},{a:456, b:789},{a:123,b:234},{a:456, b:789},{a:123,b:234},{a:456, b:789},{a:123,b:234},{a:456, b:789}]} />
             */}</div>
        );
    }
}

const Data=(props)=>{
    return <div>
    <h4>总金额</h4>
    <p>{props.data.TotalMoney}元</p>
    {
        props.data.List && props.data.List.map((e)=>{
            return <div>
                <h5>{e.Company}({e.Count})</h5>
                <div>{e.Money}元</div>
            </div>
        })
    }
</div>
}

export default Welcome;
/* jshint ignore: end */