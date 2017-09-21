/* jshint ignore : start */
import React, { Component } from 'react';

class BlockTwo extends Component {
    render() {
        return (
            <div className="container layer width-50 offset-top-10 bottom-border bottom-padding ">
                <div className="layer width-50  nav_all">
                    <div className="layer  nav1 text-left p-09rem">{this.props.title}</div>
                </div>
                <div className="layer width-50 content1 ">{this.props.info}</div>
            </div>
        );
    }
}

class BlockThree extends Component {
    render() {
        return (
            <div className="container layer width-30 offset-3 offset-top-10 bottom-border bottom-padding ">
                <div className="layer width-50  nav_all">
                    <div className="layer  nav1 text-left p-09rem">{this.props.title}</div>
                </div>
                <div className="layer width-50 content1 ">{this.props.info}</div>
            </div>
        );
    }
}

class FullWidth extends  Component {
    render() {
        return (
            <div className="container offset-top-10 bottom-border bottom-padding ">
                <div className="layer width-full text-center  nav_all">
                    <div className="layer nav1 text-left p-09rem">{this.props.title}</div>
                </div>
                <div className="layer content1 vertical-top">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export {BlockThree, FullWidth, BlockTwo};