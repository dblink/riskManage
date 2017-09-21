/* jshint ignore :start */
import React, {Component} from 'react';
 import {json as dot} from './dot'; 
 /*import {Welcome} from '../../index'; */
 import {drawCanvas} from '../drawAgreement'; 

class Page1 extends Component {
      constructor(props) {
        super(props);
        let date = this.formatTime(props.StartTime);

        this.state = {
            data: {
                people: props.BorrowName,
                peopleCard: props.PesonCardNo,
                moneyBig: props.EcanRMB,
                money:props.BorrowMoney,
                repay:props.PayList[0].EveryPaymentMoney,
                week: props.Trem,
                year: date.year,
                month: date.month,
                day: date.day
            }
        }
    } 
     componentDidMount() {
        /* let _canvas = document.createElement("canvas");
        let _context = _canvas.getContext("2d");
        let img = new Image();
        let array = [];
        let nameList = Object.keys(this.state.data);
        let sub = 0;
        img.src = "/img/threeParty/page7.jpg";
        img.onload = function(){
            _canvas.height = 596 * img.height / img.width;
            _canvas.width = 596;

            _context.drawImage(img, 0, 0, _canvas.width, _canvas.height);
            
            _canvas.addEventListener("click", function(e){
                array.push({name: `data.${nameList[sub]}`, x: e.layerX, y:e.layerY});
                sub++;
                console.log(JSON.stringify(array));
            })
            document.getElementById("canvas").appendChild(_canvas);
        }  */ 
          drawCanvas("/img/threeParty/page7.jpg","canvas", dot(this.state.data));  
    }
    
    formatTime(date){
        date = date.replace(/T.*/, "");
        date= date.split("-");
        return {
            year: date[0],
            month: date[1],
            day: date[2]
        }
    }

    clicked(e){
        
    }

    render() {
        return (
            <div id="canvas"  style={{zoom:0.34}}>
                {/* <div id="page1" style={{zoom:0.34}}></div> */}
               {/*  <canvas onClick={this.clicked} id="canvas" ></canvas> */}
            </div>

        );
    }
}

export {Page1};
/* jshint ignore :end */