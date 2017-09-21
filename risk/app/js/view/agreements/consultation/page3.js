/* jshint ignore :start */
import React, {Component} from 'react';
/*import {json as dot} from './dot';
 import {Welcome} from '../../index'; */
import {drawCanvas} from '../drawAgreement';

class Page3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                time: props.StartTime.replace(/T.*/, ""),
                jinfuzhang: "/img/jinfuzhang.png",
                puhuizhang: "/img/puhuizhang.png"
            },
            srcArrray: ["jinfuzhang", "puhuizhang"]
        }
    }
    dot(data) {
        return [
            {
                "name": data.time,
                "x": 92,
                "y": 448
            }, {
                "name": data.time,
                "x": 89,
                "y": 549
            }, {
                "name": data.time,
                "x": 91,
                "y": 680
            }, {
                type: "img",
                value: data.jinfuzhang,
                x: 155,
                y: 342,
                width: 500
            }, {
                type: "img",
                value: data.puhuizhang,
                x: 170,
                y: 578,
                width: 500
            }
        ]
    }
    componentDidMount() {
        /* let _canvas = document.createElement("canvas");
        let _context = _canvas.getContext("2d");
        let img = new Image();
        let array = [];
        let nameList = Object.keys(this.state.data);
        let sub = 0;
        img.src = "/img/threeParty/page11.jpg";
        img.onload = function () {
            _canvas.height = 596 * img.height / img.width;
            _canvas.width = 596;

            _context.drawImage(img, 0, 0, _canvas.width, _canvas.height);

            _canvas.addEventListener("click", function (e) {
                array.push({name: `data.${nameList[sub]}`, x: e.layerX, y: e.layerY});
                sub++;
                console.log(JSON.stringify(array));
            })
            document
                .getElementById("canvas4")
                .appendChild(_canvas);
        } */
        //drawCanvas("/img/threeParty/page11.jpg","canvas4", this.dot(this.state.data));
        this.loadImage();
    }

    loadImage(sub = 0) {
        let _img = new Image();
        let _data = this.state.data;
        _img.src = _data[this.state.srcArrray[sub]];

        _img.addEventListener("load", () => {
            _data[this.state.srcArrray[sub]] = _img;
            this.setState({
                data: _data
            }, () => {
                if (sub === this.state.srcArrray.length -1) {
                    drawCanvas("/img/threeParty/page11.jpg", "canvas4", this.dot(this.state.data));
                } else {
                    this.loadImage(++sub)
                }
            })
        })
    }

    clicked(e) {}

    render() {
        return (
            <div id="canvas4" style={{zoom:0.34}}>
                {/* <div id="page1" style={{zoom:0.34}}></div> */}
                {/*  <canvas onClick={this.clicked} id="canvas" ></canvas> */}
            </div>

        );
    }
}

export {Page3};
/* jshint ignore :end */