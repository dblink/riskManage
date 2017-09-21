/* jshint ignore: start */
import React, {Component} from 'react';
import {ExcelTable} from '../../module/table';
import {Welcome} from '../index';

class CitySum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {},
            setting: [
                {
                    name: "title1",
                    attr: "a"
                }, {
                    name: "title2",
                    attr: "b"
                }, {
                    name: "title1",
                    attr: "a"
                }, {
                    name: "title2",
                    attr: "b"
                }, {
                    name: "title1",
                    attr: "a"
                }, {
                    name: "title2",
                    attr: "b"
                }, {
                    name: "title1",
                    attr: "a"
                }, {
                    name: "title2",
                    attr: "b"
                }, {
                    name: "title1",
                    attr: "a"
                }, {
                    name: "title2",
                    attr: "b"
                }, {
                    name: "title1",
                    attr: "a"
                }, {
                    name: "title2",
                    attr: "b"
                }, {
                    name: "title1",
                    attr: "a"
                }, {
                    name: "title2",
                    attr: "b"
                }
            ],
            data: [
                {
                    a: 123,
                    b: 234
                }, {
                    a: 456,
                    b: 789
                }, {
                    a: 123,
                    b: 234
                }, {
                    a: 456,
                    b: 789
                }, {
                    a: 123,
                    b: 234
                }, {
                    a: 456,
                    b: 789
                }, {
                    a: 123,
                    b: 234
                }, {
                    a: 456,
                    b: 789
                }, {
                    a: 123,
                    b: 234
                }, {
                    a: 456,
                    b: 789
                }
            ]
        }
    }
    render() {
        return (<Welcome>
            <ExcelTable
                firstData={{
                name: "手机号",
                attr: "a"
            }}
            setting={this.state.setting}
            data={this.state.data}/>
        </Welcome>);
    }
}

export {CitySum};