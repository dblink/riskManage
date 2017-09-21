/* jshint ignore: start */
import React, {Component} from 'react';
import {Table, TableTitleBySelect, TableContent} from '../../module/table';
import {json, getTradingManagerList} from '../../config/tableConfig';
import {getCompany} from '../../config/itemConfig';
import {Welcome} from '../index';
import {inter} from '../../config/interface';
import option from '../../../json/option';
import PageNumber from '../../module/pageNumber';
import {getMaxDay, TimeChose} from '../../module/timeChose/timeChose';

class TradingManager extends Component {
    constructor(props) {
        super(props);
        let _Date = new Date();
        let _nowDate = `${_Date.getFullYear()}-${_Date.getMonth() + 1}-${_Date.getDate()}`;
        let _firstDate = `${_Date.getFullYear()}-${_Date.getMonth() + 1}-1`;
        this.state = {
            setting: [],
            data: ["noData"],
            pageinfo: ["noData"],
            value: {
                "company": "0",
                "st": _firstDate,
                "et": _nowDate,
                "pageIndex": "1",
                "pageSize": "10",
                "state": "-1"
            },
            TotalFangKuan: "",
            TotalHuaKou: "",
            TotalRuZhang: "",
            title: {
                Company: "苏州"
            }
        }
        getCompany(() => {
            let _title = this.state.title;
            /* _title.Company = inter.getTradingManagerList.data.company > -1 && inter.getCompany.callback[inter.getTradingManagerList.data.company+1].primaryText || "";
            _title.State = inter.getTradingManagerList.data.state > -1 && option.TradingState[inter.getTradingManagerList.data.state-1].primaryText || ""; */
            inter.getTradingManagerList.data = this.state.value;
            getTradingManagerList((data) => {
                this.setState({
                    setting: json().tradingManager,
                    data: data.data,
                    TotalFangKuan: data.TotalFangKuan,
                    TotalHuaKou: data.TotalHuaKou,
                    TotalRuZhang: data.TotalRuZhang,
                    pageinfo: data.pageinfo,
                    title: _title
                })
            })
        });
        this.itemClick = this
            .itemClick
            .bind(this);
        this.changeIndex = this
            .changeIndex
            .bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    itemClick(name, value, text) {
        let _title = this.state.title;
        _title[name] = text;
        inter.getTradingManagerList.data[name.toLowerCase()] = value;
        inter.getTradingManagerList.data.pageIndex = 1;
        getTradingManagerList((data) => {
            this.setState({
                title: _title,
                data: data.data,
                TotalFangKuan: data.TotalFangKuan,
                TotalHuaKou: data.TotalHuaKou,
                TotalRuZhang: data.TotalRuZhang,
                pageinfo: data.pageinfo
            })
        });
    }

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

    onSelect(name, value, text, position) {
        let timeList = inter
            .getTradingManagerList
            .data[name]
            .split("-");
        timeList[position] = value;
        let maxDay = getMaxDay(timeList[1], timeList[0]);

        if (maxDay < timeList[2]) {
            timeList[2] = maxDay;
        }
        inter.getTradingManagerList.data[name] = timeList.join("-");
        inter.getApplicationList.data.pageIndex = 1;
        getTradingManagerList((data) => {
            this.setState({data: data.data, TotalFangKuan: data.TotalFangKuan, TotalHuaKou: data.TotalHuaKou, TotalRuZhang: data.TotalRuZhang, pageinfo: data.pageinfo})
        });
    }

    changeIndex(e) {
        inter.getTradingManagerList.data.pageIndex = e;
        getTradingManagerList((data) => {
            this.setState({data: data.data, TotalFangKuan: data.TotalFangKuan, TotalHuaKou: data.TotalHuaKou, TotalRuZhang: data.TotalRuZhang, pageinfo: data.pageinfo})
        })
    }

    render() {
        let _data = inter.getTradingManagerList.data;
        return (
            <Welcome>
                <div style={{"font-size": "24px","text-align": "center", "font-weight": "bold"}}>交易明细表</div>
                <TimeChose stTime={_data.st} etTime={_data.et} onSelect = {this.onSelect}/>
                <div className="clear-both">
                    <div className="block-3 small-font">
                        总共放款：{this.state.TotalFangKuan} 元
                    </div>
                    <div className="block-3 small-font">
                        总共划扣：{this.state.TotalHuaKou} 元
                    </div>
                    <div className="block-3 small-font">
                        总共入账：{this.state.TotalRuZhang} 元
                    </div>
                </div>
                <div
                    className="data-table"
                    style={{
                    position: "relative"
                }}>
                    <TableTitleBySelect
                        setting={this.state.setting}
                        itemClick={this.itemClick}
                        list={this.state.title}/>
                    <TableContent setting={this.state.setting} data={this.state.data}/>
                </div>

                {this.state.pageinfo[0] != "noData" && <PageNumber
                    allCount={this.state.pageinfo.TotalCount}
                    changeIndex={this.changeIndex}
                    index={this.state.pageinfo.PageIndex}
                    allPage={this.state.pageinfo.PageCount}/>}
                {/* <Table setting={this.state.setting} data={this.state.data} /> */}
            </Welcome>
        );
    }
}

export {TradingManager};
/* jshint ignore: end */