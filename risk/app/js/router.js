/* jshint ignore: start */
import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Welcome} from './view/index';
import {ReviewList} from './view/review/reviewList';
import {Application} from './view/application/application';
import {ApplicationList} from './view/application/applicationList';
import {EmployeeTable} from './view/employee/tableEmployee';
import {ReviewDetail} from './view/review/reviewDetail';
import {Loan} from './view/contact/loan';
import Agreements from './view/agreements/Agreements';
import {LoanList} from './view/contact/loanList';
import {RepaymentList} from './view/contact/repayment';
import {TradingManager} from './view/tradingMannger/tradingManngerList';
import {KfApplicationList} from './view/application/keApplicationList';
import {System} from './view/system/system';
import {CitySum} from './view/citySum/citySum';
import {Edit} from './view/application/editUser';

import Login from './module/login';
import {isManager} from './rooter';
/* import Loan from './view/contact/loanList'; */
import {} from '../css/login.css';
import {} from '../css/common.css';
import {} from '../css/layer.css';

import Undefined from './404';

let setting = '/';
class PageRoute extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/">
                    {/*当前页面*/}
                    <IndexRoute component={Login}/>
                    <Route path="/index" component={Welcome}/>
                    <Route path="/auditList" component={ReviewList}/>
                    <Route path="/employee" component={EmployeeTable}/>
                    <Route path="/application" component={Application}/>
                    <Route path="/selectApplication" component={ApplicationList}/> 
                    <Route path="/getTradingMannger" component={TradingManager} />
                    <Route path="/getRepaymentList" component={RepaymentList} />
                    <Route path="/generatedContarct" component={KfApplicationList} />
                </Route>
                <Route path="/getContarct/:empid" component={LoanList} />
                <Route path="/index/:time" component={RepaymentList} />
                <Route path="/auditList/:apply/:detailInfoId" component={ReviewDetail}/>
                <Route path="/print/:id">
                    <IndexRoute component={Agreements} />
                </Route>
                {/* <Route path="/system" component = {System} /> */}
                {/* <Route path="/get" component={CitySum} /> */}
                <Route path="/getContarct" component={Loan} />
                <Route path="/editUserMessage" component={Edit} onEnter={isManager}/>
                <Route path="/**" component={Undefined} />
            </Router>
        );
    }
}

export default PageRoute;
/* jshint ignore : end */