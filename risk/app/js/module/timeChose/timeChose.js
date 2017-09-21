/* jshint ignore : start */
/* export table.css */
/* export common.css */
import React, {Component} from 'react';

/**
 * onSelect(type, value, text, opsition)
 * stTime
 * etTime
 */
class TimeChose extends Component {
    getTimeList(type, month, year) {
        switch (type) {
            case "year":
                {
                    return [
                        {
                            value: "2017"
                        }, {
                            value: "2018"
                        }
                    ];
                }
            case "month":
                {
                    var array = [];
                    for (var i = 1; i <= 12; i++) {
                        array.push(i);
                    }
                    return array;
                }
            case "date":
                {
                    var array = [];
                    var maxDay = getMaxDay(month, year);
                    for (var i = 1; i <= maxDay; i++) {
                        array.push(i);
                    }
                    return array;
                }
        }
    }
    render() {
        let timeList = this.props.stTime.split("-");
        let nowTimeList = this.props.etTime.split("-");
        return (
            <div
                style={{
                padding: "20px 0 10px",
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
                    }}>{timeList[0] === "string" && "" || timeList[0]}</p>年
                    <ul style={{
                        "width": "100%"
                    }}>
                        {this
                            .getTimeList("year")
                            .map((e) => (
                                <li
                                    onClick={() => {
                                    this.props.onSelect("st", e.value, `${e.value}年`, 0)
                                }}>{`${e.value}年`}</li>
                            ))}
                    </ul>
                </div>
                <div
                    className="title-hover pointer"
                    style={{
                    "display": "inline-block",
                    "width": "50px",
                    "position": "relative",
                    "text-align": "center"
                }}>
                    <p
                        style={{
                        "display": "inline",
                        "font-size": "20px"
                    }}>{timeList[1] < 10 && `0${timeList[1]}` || timeList[1]}</p>月
                    <ul style={{
                        "width": "100%"
                    }}>{this
                            .getTimeList("month")
                            .map((e) => {
                                let text = e < 10
                                    ? `0${e}月`
                                    : `${e}月`;
                                return <li
                                    onClick={() => {
                                    this.props.onSelect("st", e, text, 1)
                                }}>{text}</li>
                            })}
                    </ul>
                </div>
                <div
                    className="title-hover pointer"
                    style={{
                    "display": "inline-block",
                    "width": "80px",
                    "position": "relative",
                    "text-align": "center"
                }}>
                    <p
                        style={{
                        "display": "inline",
                        "font-size": "20px"
                    }}>{timeList[2] < 10 && `0${timeList[2]}` || timeList[2]}</p>日
                    <ul style={{
                        "width": "100%"
                    }}>
                        {this.getTimeList("date", timeList[1], timeList[0]).map((e) => {
                            let text = e < 10
                                ? `0${e}日`
                                : `${e}日`;
                            return <li
                                onClick={() => {
                                this.props.onSelect("st", e, text, 2)
                            }}>{text}</li>
                        })}
                    </ul>
                </div>
                ——
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
                    }}>{nowTimeList[0] === "string" && "" || nowTimeList[0]}</p>年
                    <ul style={{
                        "width": "100%"
                    }}>
                        {this
                            .getTimeList("year")
                            .map((e) => (
                                <li
                                    onClick={() => {
                                    this.props.onSelect("et", e.value, `${e.value}年`, 0)
                                }}>{`${e.value}年`}</li>
                            ))}
                    </ul>
                </div>
                <div
                    className="title-hover pointer"
                    style={{
                    "display": "inline-block",
                    "width": "50px",
                    "position": "relative",
                    "text-align": "center"
                }}>
                    <p
                        style={{
                        "display": "inline",
                        "font-size": "20px"
                    }}>{nowTimeList[1] < 10 && `0${nowTimeList[1]}` || nowTimeList[1]}</p>月
                    <ul style={{
                        "width": "100%"
                    }}>{this
                            .getTimeList("month")
                            .map((e) => {
                                let text = e < 10
                                    ? `0${e}月`
                                    : `${e}月`;
                                return <li
                                    onClick={() => {
                                    this.props.onSelect("et", e, text, 1)
                                }}>{text}</li>
                            })}
                    </ul>
                </div>
                <div
                    className="title-hover pointer"
                    style={{
                    "display": "inline-block",
                    "width": "80px",
                    "position": "relative",
                    "text-align": "center"
                }}>
                    <p
                        style={{
                        "display": "inline",
                        "font-size": "20px"
                    }}>{nowTimeList[2] < 10 && `0${nowTimeList[2]}` || nowTimeList[2]}</p>日
                    <ul style={{
                        "width": "100%"
                    }}>
                        {this.getTimeList("date", nowTimeList[1], nowTimeList[0]).map((e) => {
                            let text = e < 10
                                ? `0${e}日`
                                : `${e}日`;
                            return <li
                                onClick={() => {
                                this.props.onSelect("et", e, text, 2)
                            }}>{text}</li>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

function getMaxDay(month, year) {
    month = parseInt(month);
    year = parseInt(year);
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            {
                return 31
            }
        case 4:
        case 6:
        case 9:
        case 11:
            {
                return 30
            }
        case 2:
            {
                if (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) {
                    return 29;
                } else {
                    return 28;
                }
            }
    }
}

export {TimeChose, getMaxDay};
/* hshint ignore : end */