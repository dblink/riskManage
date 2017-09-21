/* jshint ignore : start */
import React, {Component} from 'react';
import {Paper} from '../module/'

class List extends Component {
    render() {
        return (
            <Paper
                deep="1"
                className={paperClassName[this.state.page].leftPaper}
                style={{
                "height": "90%",
                "overflow": "auto",
                "width": "90%",
                "margin": "1rem auto"
            }}>
                <div className="title clear-both table" style={theme.title}>
                    <div className="va-middle clear-both">
                        <div
                            className="display-inline-block width-percent-50"
                            style={{
                            "font-size": "18px"
                        }}>
                            <span
                                style={{
                                "margin-left": "10px"
                            }}>借款列表</span>
                        </div>
                        <div className="display-inline-block width-percent-50 text-right">
                            <Button style={theme.titleButton}>
                                增加
                            </Button>
                            <Button style={theme.titleButton}>
                                展开
                            </Button>
                        </div>
                    </div>
                </div>
                <Table
                    setting={this.state.infoSetting}
                    data={this.state.infoData}
                    rowsOperation={this.changeInfo}
                    click={"click"}
                    style={{
                    "height": "90%"
                }}/>
            </Paper>
        );
    }
}

export default componentName;
/* ighint ignore : end */