/**
 * Created by Administrator on 2017/1/13.
 */

/* jshint ignore:start */
import React, {Component} from 'react';
import {
  Router,
  Route,
  hashHistory,
  browserHistory,
  IndexRoute,
  IndexRedirect,
  Redirect
} from 'react-router';

import {Welcome as Index } from './index';
//import Login from './login';
/*import Welcome from './welcome';
import WeekLoanList from './weekLoanList';
import Loan from './getloan';
import LoanList from './loanList';
import AllPlanList from './allPlanList';
import Index from './index';
//import Maintenance from './maintenance'; //维护页
import Undefined from './404';*/
/*import {
  AdminRoutes,
  JumpIndex,
  IsRoot,
  IsRootShowEmployee,
  OnlySmall10002,
  JumpMobile,
  JumpPc
} from './component/islogin';*/
/*import {} from "../css/index.css";
import {} from "../css/common.css";
import {} from "../css/index.css";
import {} from "../css/modal.css";
import {} from "../css/screen.css";*/

class Rout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory}>
        {/*这有一个坑，Route path 为域名下的主页路径*/}
        <Route path="/">
          {/*当前页面*/}
          {/*<IndexRoute component={Login} onEnter={JumpIndex}/>*/}
          <IndexRoute component={Index} />
          <Route path="/:apply/:detailInfoId" component={Index} />
          {/*<Route path="/:apply" component={Index} onEnter={AdminRoutes}/>
          <Route path="/:apply" component={Index} onEnter={AdminRoutes}/>
          <Route path="/emp/emplist.html" component={AllPlanList} onEnter={AdminRoutes}/>
          <Route path="/loan(/:id)" component={Loan} onEnter={AdminRoutes}/> {/*<Route path="/loan/:id" component={LoanList} onEnter={AdminRoutes}/>*/}
          <Route path="/**" component={Undefined}/>
        </Route>
      </Router>
    )
  }
}
export default Rout;

/* jshint ignore:end */