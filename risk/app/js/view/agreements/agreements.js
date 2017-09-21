/* jshint ignore :start */
import React, {Component} from 'react';
import {Page1} from './threeParty/page1';
import {Page2} from './threeParty/page2';
import {Page5} from './threeParty/page5';
import {Page1 as PromiseAgree} from './promise/promise';
import {Page1 as LegalRight} from './legalRight/legalRight';
import {Page1 as RepayDeail} from './repayDeatil/page1';
import {Page1 as ConsultationPage1} from './consultation/page1';
import {Page2 as ConsultationPage2} from './consultation/page2';
import {Page3 as ConsultationPage3} from './consultation/page3';
import {inter} from '../../config/interface';
import {getAgreement} from '../../config/infoConfig';

class Agreements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        }

        this.requestMessage = this
            .requestMessage
            .bind(this);

        inter.getAgreement.data.id = this.props.params.id;
        getAgreement((data) => {
            this.requestMessage(data)
        })
    }

    

    requestMessage(data) {
        this
            .setState({
                data: data
            });
    }

    render() {
        return (
            <div className="text-center">
                {this.state.data && <div>
                    <ConsultationPage1 {...this.state.data}/>
                    <ConsultationPage2 {...this.state.data}/>
                    <ConsultationPage3 {...this.state.data}/>
                    <LegalRight {...this.state.data}/>
                    <PromiseAgree {...this.state.data}/>
                    <RepayDeail {...this.state.data}/>
                    <Page1 {...this.state.data}/>
                    <Page2 {...this.state.data}/>
                    <div
                        id="page3"
                        style={{
                        zoom: 0.34
                    }}>
                        <img
                            src="/img/threeParty/page3.jpg"
                            style={{
                            width: "2047px",
                            height: "2779px"
                        }}/>
                    </div>
                    <div
                        id="page4"
                        style={{
                        zoom: 0.34
                    }}>
                        <img
                            src="/img/threeParty/page4.jpg"
                            style={{
                            width: "2047px",
                            height: "2779px"
                        }}/>
                    </div>
                    <Page5 {...this.state.data}/>
                </div>}
            </div>
        );
    }
}

export default Agreements;
/* jshint ignore :end */