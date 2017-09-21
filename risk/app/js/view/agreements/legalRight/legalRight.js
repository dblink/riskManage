/* jshint ignore :start */
import React, {Component} from 'react';
/*import {json as dot} from './dot';
 import {Welcome} from '../../index'; */
import {drawCanvas} from '../drawAgreement';

class Page1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                time: props.StartTime.replace(/T.*/, "")
            }
        }
    }
    dot(data) {
        return[
            {
                "name" : data.time,
                "x" : 409,
                "y" : 592
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
        img.src = "/img/threeParty/page8.jpg";
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
                .getElementById("canvas")
                .appendChild(_canvas);
        } */
         drawCanvas("/img/threeParty/page8.jpg","legalRight", this.dot(this.state.data));
    }

    clicked(e) {}

    render() {
        return (
            <div id="legalRight" style={{zoom:0.34}}>
                {/* <div id="page1" style={{zoom:0.34}}></div> */}
                {/*  <canvas onClick={this.clicked} id="canvas" ></canvas> */}
            </div>

        );
    }
}

export {Page1};
/* jshint ignore :end */