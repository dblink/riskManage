/**
 * Created by Administrator on 2016/4/28.
 */
/*var check = (function () {
    'use strict';
    var reg,
        result,
        re;
    reg = {
        judge: function (re, text) {
            return re.test(text);
        },
        //判断密码是否有效
        password: function (text) {
            //re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;带有大写字母
            re = /^(?=.*\d)(?=.*[a-z]).{8,15}$/;
            result = reg.judge(re, text);
            //result=  re.test(text);
            if (!result) {
                console.log("密码必须8-15位之间且包含数字和字母");
            } else {
                console.log("ok");
            }
        }, //字符串只能为中文
        onlyChinese: function (text) {
            re = /^[\u4e00-\u9fa5]*$/;
            //re = /^[\\u4e00-\\u9fa5]$/;不能为中文的表达式
            text = decodeURI(text);
            result = reg.judge(re, text);
            if (!result) {
                console.log("请输入中文");
            } else {
                console.log("ok");
            }
            return result;
        }, //字母，数字或下划线
        complexCode: function (text) {
            re = /^\w+$/;
            result = reg.judge(re, text);
            if (!result) {
                console.log("请输入小写字母、数字或下划线");
            } else {
                console.log("ok");
            }
        }, //邮箱
        eMail: function (text) {
            re = /[\w!#$%&'*+/=?^{|}~-]+(?:\.[\w!#$%&'*+/=?^{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w]/ && /(?:[\w-]*[\w])?/;
            result = re.test(text);
            if (!result) {
                console.log("请输入正确的E-mail地址");
            } else {
                console.log("ok");
            }
        }, //身份证
        idCard: function (text) {
            re = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0-2]\d)|3[0-1=])\d{3}$/; //15位;
            result = re.test(text);
            re = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0-2]\d)|3[0-1])\d{3}([0-9]|X)$/; //18位;
            if (result || reg.judge(re, text)) {
                console.log("ok");
                return 1;
            } else {
                console.log("请输入正确的身份证号码！");
                return 0;
            }
        }, //手机号
        idPhone: function (text) {
            re = /^(13[0-9]|14[4|7]|15[0-3|5-9]|18[0-9])\d{8}$/;
            result = reg.judge(re, text);
            return result;
        }
    };

    return reg;
}());*/

/* jshint ignore : start */
    const isIdCard = (text) => {
            let re = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0-2]\d)|3[0-1=])\d{3}$/; //15位;
            let result = re.test(text);
            re = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0-2]\d)|3[0-1])\d{3}([0-9]|X)$/; //18位;
            if (result || re.test(text)) {
                return 'success';
            } else {
                return {error: '请输入正确的身份证号码！'};
            }
    }

export {
    isIdCard,

}
/* jshint ignore : end */


