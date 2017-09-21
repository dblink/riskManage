/* jshint ignore : start */
import {inter} from '../../config/interface';
export const check = {
    employee(change) {
        let _paramter = inter.addEmployee.data;
        if(change){
            _paramter = inter.changeEmployee.data;
        }
        if (!_paramter.Name.toString()) {
            return {
                name: 'name',
                error: '员工名不能为空'
            };
        }

        if (!_paramter.Mobile.toString()) {
            return {
                name: 'mobile',
                error: '手机号不能为空'
            };
        }

        if (!_paramter.RoleID.toString()) {
            return {
                name: 'role',
                error: '角色不能为空'
            };
        }

        if (!_paramter.Company.toString()) {
            return{
                name: 'company',
                error: '所属公司不能为空'
            }
        }

        if (_paramter.Company.toString() && _paramter.Company.toString() !== '-1' && _paramter.LeaderID === -1) {
            return {
                name: 'leader',
                error: '上级不能为空'
            }
        }
        return {
            success: true
        }
    }
}
/* jshint ignore : end */