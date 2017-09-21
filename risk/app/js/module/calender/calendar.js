/**
 * Created by Administrator on 2017/4/7.
 */

/* jshint ignore: start */
import React, {Component} from 'react';
import {getMaxDay, getFirst, dataSeparate, getTimeOption} from './time';
/* import {Select} from './../component/form'; */
import {} from '../../../css/calendar.css';
import parameter from './data.json';

class DataDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indexParameter: parameter.indexParameter
        }
        this.backLi = this.backLi.bind(this);
    }
    getResult(e, handle) {
        let result = parameter.indexDefault;
        Object
            .keys(this.state.indexParameter)
            .map((key) => {
                let _parameter = this.state.indexParameter[key].parameter;
                if (this.props.propData[_parameter].indexOf(e.fullDate) !== -1) {
                    result = this.state.indexParameter[key];
                } else if (this.props.propData[_parameter][0] === "loading") {
                    result = {text: "载入中……"};
                }
            });
        return handle(e, result);
    }

    backLi(e, _result) {
        let toDate = "";
        if (e.text === this.props.date && this.props.nowMonth) {
            e.text = "今日";
        }
        switch (e.day) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                {
                    return <li
                        className={`calender-button ${toDate} ${_result.parameter && "pointer able-click" || ""}`}
                        data-time={e.fullDate}
                        data-state= {_result.code}
                        onClick={_result.parameter && this.props.onClick}
                        onMouseEnter={_result.parameter && this.props.onMouseOver}
                        onMouseLeave = {_result.parameter && this.props.onMouseOut}>
                        <p >{e.text}</p>
                        <p className={`${_result.color}-color small-font`}>{_result.text}</p>
                        <div className="calendar-after">{this.props.moveData}</div>
                    </li>;
                }
            case "no":
                {
                    return <li className={`calender-button ${toDate}`}></li>;
                }
            default:
                {
                    return <li className={`calender-button ${toDate}`}>
                        <p>{e.text}</p>
                        <p className="warming-color small-font">今日无数据</p>
                    </li>;
                }
        }
    }

    render() {
        return <ul className="clear-both">{
            this.props.data.map((e) => this.getResult(e, this.backLi))
        }</ul>
    }
}

class DateTitle extends Component {
    render() {
        return <p className="clear-both text-center calendar title">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
        </p>
    }
}

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.pushDate = this
            .pushDate
            .bind(this);
        this.state = {
            dateData: this.pushDate(),
            update: "finish"
        };
        this.select = this
            .select
            .bind(this);
    }
    select(e) {
        this
            .props
            .selectChange(e);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.state === true;
    }

    pushDate() {
        let lastMonth,
            nowMonth,
            nowDateNumber,
            arrayLength,
            arrayFullDate = [],
            dataArray = [],
            firstDay,
            timeJson,
            lastDateNumber;
        timeJson = dataSeparate(this.props.time);
        nowMonth = timeJson.month;
        firstDay = getFirst(this.props.time);
        nowDateNumber = getMaxDay(nowMonth, timeJson.year);

        for (let i = firstDay - 1; i >= 0; i--) {
            dataArray.push({"text": "", day: "no"});
        }

        arrayFullDate.push(timeJson.year, timeJson.month < 10
            ? `0${timeJson.month}`
            : timeJson.month);

        for (let j = 1; j <= nowDateNumber; j++) {
            let k = j < 10 && `0${j}` || j;
            dataArray.push({
                "text": j,
                day: (j - 1 + firstDay) % 7,
                "fullDate": `${arrayFullDate.join("-")}-${k}`
            });
        }

        arrayLength = dataArray.length;
        for (let k = 1; k <= 42 - arrayLength; k++) {
            //dataArray.push(k);
            dataArray.push({"text": "", day: "no"});
        }
        return dataArray
    }

    render() {
        let timeJson,
            date;
        timeJson = dataSeparate(this.props.time);
        date = new Date();
        return <div className="width-percent-80 block-center" style={{border:" 1px solid #eee"}}>
            {/* <div className="calendar-select clear-both">
        <Select name="year" option={getTimeOption(2017, 2018)} tip="选择年份" value={timeJson.year} operate={{onChange: this.select}} />
        <Select name="month" option={getTimeOption(1,12)} tip="选择月份" value={timeJson.month} operate={{onChange: this.select}} />
      </div> */}
            <DateTitle/>
            <div className="calendar date text-center clear-both">
                <DataDate
                    data={this.pushDate()}
                    propData={this.props.data}
                    nowMonth={date.getMonth() + 1 == timeJson.month}
                    date={date.getDate()}
                    onClick={this.props.jump}
                    moveData={this.props.moveData}
                    onMouseOver = {this.props.mouseOver}
                    onMouseOut = {this.props.mouseOut}
                    />
            </div>
        </div>
    }
}

export default Calendar;