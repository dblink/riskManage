/* jshint ignore : start */
import React, {Component} from 'react';
import {Paper} from '../module/paper';
import {Button} from '../module/button';
import Table from '../module/table';
import {Info} from './detailInfo';
import {Palette} from '../module/palette';
import {} from '../../css/common.css';
import {} from '../../css/index.css';
import {json, dataTableConfig} from '../config/tableConfig'; //表格设置
import {style} from '../style/theme'; //样式
import dataName from '../../json/dataName.json'; //数据名
import dataJson from '../../json/data.json';

//test;
import lzy from '../module/lvlup0';

const themeStyle = "light";
const theme = style[themeStyle];

/*class componentName extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

componentName.propTypes = {

};

export default componentName;*/

const paperClassName = {
    list: {
        left: "width-full paper",
        right: "width-none paper",
        leftPaper: "deep-2",
        rightPaper: "deep-1"
    },
    detail: {
        left: "width-percent-20 paper",
        right: "width-percent-80 paper",
        leftPaper: "deep-1",
        rightPaper: "deep-1"
    }
}

export class Index extends Component {
    constructor(props) {
        super(props);
        let setting = json.call(this)
        this.state = {
            infoSetting: setting.infoSetting,
            infoData: setting.infoData,
            page: "list",
            activeInfoData: {},
            data: dataJson.data,
            type: "list",
            modal: "none"
        }
        //改变数据
        this.changeInfo = this
            .changeInfo
            .bind(this);
        //改变页面
        this.changePage = this
            .changePage
            .bind(this);
        //隐藏modal
        this.hiddenModal = this
            .hiddenModal
            .bind(this);
    }

    componentDidMount() {
        //lzy("modal").eq(0).addStyle({"display":"block"});
        
        console.log(lzy.jsonDeepCompare([{a:1}, {b:2}, {c:{a:1}}],[{a:1}, {b:2}, {c:3}]));
        this.scrollAlign();
    }

    //table的scroll位置
    scrollAlign() {
        let title = document.getElementsByClassName("data-title")[0];
        let content = document.getElementsByClassName("data-content")[0];

        let scrollWidth = title.offsetWidth - content.scrollWidth;
        title.setAttribute("style", `padding-right: ${scrollWidth}px`);
    }

    /* isTable(e){
       let isTable = this.state.data[e.parameter] && this.state.data[e.parameter].length;
       isTable = this.state.dataName[e.parent] this.state.dataName[e.parameter]
    }*/

    //隐藏滚动条
    /**
     * @param {string} className
     */
    scrollHidden(className) {
        let _detail = document.getElementsByClassName(className)[0];
        let style;
        let scrollWidth = _detail.offsetWidth - _detail.scrollWidth;

        style = _detail.getAttribute("style");
        style = style.replace(/overflow: auto/g, "overflow:hidden");
        _detail.setAttribute("style", style);

        style = style.indexOf("border-right") === -1
            ? style + `border-right: ${scrollWidth}px solid transparent`
            : style;
        _detail.setAttribute("style", style);
    }

    /**
     * 页面改变
     * @param {event} e 
     */
    changePage(e) {
        let page = e
            .target
            .getAttribute("data-show") || e
            .currentTarget
            .getAttribute("data-show");

        if (page === this.state.page) {
            return;
        }
        let setting = json.call(this);
        switch (page) {
            case "list":
                {
                    this.setState({infoSetting: setting.infoSetting, page: page, type: page});
                    break;
                }
            case "detail":
                {
                    this.setState({infoSetting: setting.smallTableData, page: page, type: page});
                    break;
                }
            default:
                {
                    let parent = e
                        .target
                        .getAttribute("data-parent") || e
                        .currentTarget
                        .getAttribute("data-parent");
                    let ele = e.currentTarget;

                    console.log(ele.offsetWidth, ele.offsetHeight, window.event.clientX, ele.offsetTop, e);
                    this.setState({page: page, type: "detail", parent: parent, modal: "block"});
                    break;
                }
        }
    }

    /**
     * 动态改变当前信息
     * @param {event} e 
     */
    changeInfo(e) {
        this.setState({
            activeInfoData: e
                .currentTarget
                .getAttribute("data-id")
        })
    }

    /**
     * 隐藏modal
     */
    hiddenModal() {
        this.setState({modal: "none"})
    }

    /**
     * 改变浮动深度
     * @param {event} e 
     */
    changeDeep(e) {
        let classNames = e
            .currentTarget
            .getAttribute("class");
        if (e.type === "mouseover" && classNames.indexOf("deep-2") !== -1) {
            return;
        }
        if (classNames.indexOf("deep-1") !== -1) {
            classNames = classNames.replace(/deep-1/g, "deep-2");
        } else {
            classNames = classNames.replace(/deep-2/g, "deep-1");
        }
        e
            .currentTarget
            .setAttribute("class", classNames);
    }

    render() {
        return (
            <div className="clear-both indexFixed height-full">
                <div
                    className={`float-left left height-full ${paperClassName[this.state.type].left}`}>
                    <Paper
                        deep="1"
                        className={paperClassName[this.state.type].leftPaper}
                        style={{
                        "height": "90%",
                        "overflow": "auto",
                        "width": "90%",
                        "margin": "1rem auto"
                    }}>
                        <Palette
                            title="借款列表"
                            theme={themeStyle}
                            button={[
                            {
                                name: "增加"
                            }, {
                                name: "展开",
                                operate: {
                                    onClick: this.changePage,
                                    "data-show": "list"
                                }
                            }
                        ]}/>
                        <Table
                            setting={this.state.infoSetting}
                            data={this.state.infoData}
                            rowsOperation={this.changeInfo}
                            click={"click"}
                            style={{
                            "height": "90%"
                        }}/>
                    </Paper>
                </div>
                <div
                    className={`float-left right height-full relative ${paperClassName[this.state.type].right}`}>

                    <div
                        style={{
                        display: this.state.modal
                    }}
                        className="paper deep-2 modal">
                        <Palette
                            title
                            ={this.state.page}
                            theme={themeStyle}
                            button={[{
                                name: "关闭",
                                operate: {
                                    onClick: this.hiddenModal
                                }
                            }
                        ]}/>
                        <div
                            style={{
                            height: "90%",
                            overflow: "auto"
                        }}>
                            <Info
                                data={this.state.data[this.state.page] || this.state.data[this.state.parent] && this.state.data[this.state.parent][this.state.page]}
                                setting={dataTableConfig(this.state.page)}/>
                        </div>
                    </div>

                    <div
                        className="clear-both detail"
                        style={{
                        height: "90%",
                        overflow: "auto",
                        margin: "1rem auto"
                    }}>

                        {this.state.page === "list"
                            ? <Info
                                    setting={this.state.infoSetting}
                                    data={this.state.infoData[this.state.activeInfoData]}/>
                            : dataName
                                .index
                                .map((e, key) => {
                                    
                                    let setting = dataTableConfig(e.parameter, 4);
                                    let parameter = this.state.data[e.parameter] || this.state.data[e.parent][e.parameter] || {};
                                    let _html;
                                    if(parameter.length){
                                        _html = <Table data={parameter} setting={setting}/>;
                                    }else{
                                        _html = <Info data={parameter} setting={setting}/>
                                    }

                                    return <div
                                        className="block-3"
                                        style={{
                                        "height": "300px"
                                    }}>
                                        <Paper
                                            className={`width-percent-90 margin-auto pointer`}
                                            deep="1"
                                            key={key}
                                            operate={{
                                            onMouseLeave: this.changeDeep,
                                            onMouseOver: this.changeDeep,
                                            onClick: this.changePage,
                                            "data-show": e.parameter,
                                            "data-parent": e.parent || ""
                                        }}
                                            style={{
                                            "height": "90%",
                                            "margin": "auto"
                                        }}>
                                            <Palette title ={e.name} theme={themeStyle}/>
                                            <div
                                                style={{
                                                height: "90%",
                                                "overflow": "hidden"
                                            }}
                                                title="点击查看详情">

                                                {_html}
                                            </div>
                                        </Paper>
                                    </div>
                                })}
                    </div>
                </div>
            </div>
        );
    }
}

/* jshint ignore : end */(function () {
    _theme(theme);
    function _theme(theme) {
        document
            .body
            .setAttribute("style", 'background:' + theme.background);
    }

})();
