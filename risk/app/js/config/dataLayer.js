/* jshint ignore : start */
//列表请求
import {getApplicationList, getEmployeeList, getLoanList, getRecode, getReviewList,getTradingManagerList} from './tableConfig';
import menuConfig from './menuConfig' ;
import {getValue, clearStorage} from './dataConfig';
import {inter} from './interface';

const isLogin = (request, callback)=>{
    try {
        request(callback);
    } catch (error) {
        clearStorage();
    }
}

export {
    isLogin, //是否登录
    getApplicationList, //获取请求列表
    getEmployeeList, //获取员工表
    getLoanList, //获取贷款列表
    getRecode, //获取记录
    getReviewList, //获取审核列表
    getTradingManagerList //获取交易明细表
}