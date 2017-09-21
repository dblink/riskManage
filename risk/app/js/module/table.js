/**
 * Created by Administrator on 2017/2/10.
 */
/*jshint ignore : start*/
import React, {Component} from 'react';
import Checkbox from 'material-ui/Checkbox';

import {} from '../../css/table.css';

/**
 * for example
 * data=[
 *  title: "开始时间",
    attr: "StartTime",
    className: "width-percent-10 phone-percent-15",
    format: (data)=>{
      return data.split("T")[0].replace(/-/g, ".");
    }
 * ]
 */
const style = {
    checkbox: {
        display: "inline-block",
        'vertical-align': 'middle'
    }
}
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCheck: false
        }
        this.allSelect = this
            .allSelect
            .bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || this.state.allCheck != nextState.allCheck
    }

    allSelect() {
        this.setState({
            allCheck: !this.state.allCheck
        })
    }

    render() {
        return (
            <div className="data-table" style={this.props.style}>
                {
                    <TableTitle {...this.props} />
                }
                {
                    <TableContent {...this.props} />
                }
                
            </div>
        )
    }
}

class TableRows extends Component {
    render() {
        return <div {...this.props}>
            {this.props.children}
        </div>
    }
}

class TableCols extends Component {
    render() {
        return (
            <div className={'data-cols ' + this.props.className} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

class TableTitle extends Component {
    render(){
        return <div className="data-title">
                    {this.props.chose && <TableCols
                        className="block-2-10"
                        style={{
                        "overflow": "hidden"
                    }}>
                        <p style={style.checkbox} className="text-center">
                            <Checkbox
                                label=""
                                onCheck={this.allSelect}
                                iconStyle={{
                                "margin-right": "0"
                            }}
                                className="text-left"/>
                        </p>
                    </TableCols>}

                    {this
                        .props
                        .setting
                        .map((cols, key) => {
                            let _data = cols.title;
                            return (
                                <TableCols className={cols.className}>
                                    <p>
                                        {_data}
                                    </p>
                                </TableCols>
                            )
                        })}

                </div>
    }
}

class TableTitleBySelect extends Component {
    render(){
        return <div className="data-title">
                    {this.props.chose && <TableCols
                        className="block-2-10"
                        style={{
                        "overflow": "hidden"
                    }}>
                        <p style={style.checkbox} className="text-center">
                            <Checkbox
                                label=""
                                onCheck={this.allSelect}
                                iconStyle={{
                                "margin-right": "0"
                            }}
                                className="text-left"/>
                        </p>
                    </TableCols>}

                    {this
                        .props
                        .setting
                        .map((cols, key) => {
                            let _data = cols.title;
                            let _value = this.props.list && this.props.list[cols.attr] || "";
                            return (
                                <TableCols className={cols.className + " title-hover"}>
                                    <p>
                                        {cols.input 
                                            && <input placeholder={_data} value={_value} onChange={(e)=>this.props.inputChange(cols.attr, e.currentTarget.value)} />
                                            ||  _value || _data}
                                        {cols.input && <img src="/img/edit.svg" />}
                                        {cols.item && <img src="/img/more_unfold.svg" />}
                                    </p>
                                    {
                                        cols.item && <ul className={cols.className + " pointer"}>
                                            {
                                                cols.item.map((e)=><li onClick={()=>this.props.itemClick(cols.attr, e.value, e.primaryText)}>{e.primaryText}</li>)
                                            }
                                        </ul>
                                    }
                                    
                                </TableCols>
                            )
                        })}

                </div>
    }
}

class TableContent extends Component {
    render(){
        return (
            <div className="data-content">
                    {this
                        .props
                        .data
                        .map((data, key) => {
                            let rowKey = key;
                            return (
                                <TableRows className="data-rows" data-id={data.id}>
                                    {data === "noData"
                                        ? <div>暂无数据</div>
                                        : <div>
                                            {this.props.chose && <TableCols
                                                className="block-2-10"
                                                style={{
                                                "overflow": "hidden"
                                            }}>
                                                <p style={style.checkbox} className="text-center">
                                                    <Checkbox
                                                        label=""
                                                        checked={this.state.allCheck}
                                                        iconStyle={{
                                                        "margin-right": "0"
                                                    }}
                                                        className="text-left"/>
                                                </p>
                                            </TableCols>}
                                            {this
                                                .props
                                                .setting
                                                .map((cols, key) => {
                                                    let _data = data[cols.attr];
                                                    return (
                                                        <TableCols className={cols.className} dropDown={this.props.dropDown}>
                                                            <p
                                                                
                                                                onClick={this.props.operate && this.props.operate[cols.click]}
                                                                >
                                                                {cols.format && cols.format(data, cols.attr) || _data}
                                                            </p>
                                                        </TableCols>
                                                    )
                                                })}</div>}
                                </TableRows>
                            )
                        })}
                </div>
        )
    }
}

class ExcelTable extends Component {
    constructor(props){
        super(props);
        
    }
    scroll(e){
        document.getElementsByClassName("title-name")[0].scrollLeft = e.currentTarget.scrollLeft;
        document.getElementsByClassName("col-name")[0].scrollTop = e.currentTarget.scrollTop;
    }
    render(){
        return <div>
        {
            this.props.firstData && <div style={{width: "10%","display":"inline-block","overflow":"hidden","height": "3rem","line-height": "3rem"}}>
                {this.props.firstData.name}
            </div>
        }
            
            <div className="ExcelTitle" style={{width: "90%","display":"inline-block","overflow":"hidden","white-space": "nowrap","height": "3rem","line-height": "3rem"}}>
                <ExcelFixedRow setting={this.props.setting} />
            </div>
            <div className="clear-both">
                <div style={{width: "10%",float:"left",overflow:"hidden",height: "200px"}}>
                    {
                        this.props.firstData && <ExcelFixedCol data={this.props.data} firstData={this.props.firstData.attr} />
                    }
                </div>
                <div onScroll={this.scroll} style={{width: "90%",float:"left",overflow:"auto","white-space": "nowrap",height: "200px"}}>
                    {
                        this.props.data.map((e)=>{
                            return <div style={{"line-height": "3rem"}}>
                                {
                                    <ExcelFixedRowMessage data={e} setting={this.props.setting} />
                                }
                            </div> 
                        })
                    }
                </div>
            </div>
        </div>
    }
}

class ExcelFixedRow extends Component {
    constructor(props){
        super(props);
    }
    scroll(e){
        e.preventDefault();
    }
    render(){
        return <div className="title-name" onScroll={this.scroll} style={{"overflow-y": "hidden","overflow-x": "auto","box-sizing": "border-box","padding-right": "18px"}}>
            {
                this.props.setting.map((e)=>{
                    return <span style={{display: "inline-block", width: "10%"}}>{e.name}</span>
                })
            }
        </div>
    }
}

class ExcelFixedRowMessage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let _props= this.props;
        return <div className="title-name">
            {
                _props.setting.map((e)=>{
                    return <span style={{display: "inline-block", width: "10%"}}>{_props.data[e.attr]}</span>
                })
            }
        </div>
    }
}

class ExcelFixedCol extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let _props = this.props;
        return <div className="col-name" style={{"overflow": "hidden","height":"100%","box-sizing": "border-box","padding-bottom": "18px"}}>
            {
                _props.data.map((e)=>{
                    return <span style={{display: "block","line-height": "3rem"}}>{e[_props.firstData]}</span>
                })
            }
        </div>
    }
}
export {Table, TableTitle, TableContent, TableTitleBySelect, ExcelTable};

/*jshint ignore : end*/