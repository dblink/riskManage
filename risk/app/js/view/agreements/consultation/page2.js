/* jshint ignore :start */
import React, {Component} from 'react';
/*import {json as dot} from './dot';
 import {Welcome} from '../../index'; */
import {drawCanvas} from '../drawAgreement';
import {split} from '../split';


class Page2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                money: props.ServiceMoney,
                big: split(props.ServiceMoney).big
            }
        }
    }
    dot(data) {
        return [
            {
                "name": data.money,
                "x": 74,
                "y": 284
            }, {
                "name": data.big,
                "x": 224,
                "y": 288
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
        img.src = "/img/threeParty/page9.jpg";
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
                .getElementById("canvas3")
                .appendChild(_canvas);
        } */
        drawCanvas("/img/threeParty/page10.jpg","canvas3", this.dot(this.state.data));
    }

    clicked(e) {}

    render() {
        return (
            <div id="canvas3" style={{zoom:0.34}}>
                {/* <div id="page1" style={{zoom:0.34}}></div> */}
                {/*  <canvas onClick={this.clicked} id="canvas" ></canvas> */}
            </div>

        );
    }
}

export {Page2};
/* jshint ignore :end */