/* jshint ignore : start */
const split = (value) => {
    //console.log(value);
    value = value.toString();
    var dotq = value.split(".")[0];
    var dotqLength = dotq.length;
    var doth = value.split(".")[1] || "00";
    var dothLength = doth.length;
    var bigWrite = "壹.贰.叁.肆.伍.陆.柒.捌.玖".split(".");
    var unit = "分.角.圆.拾.佰.仟.万".split(".");
    var valueArray;
    var puter = 6 - dotqLength;
    var valueBig = "";
    var dothput = 2 - dothLength;

    var number = '';
    var splitArray= [];
    for (var i = 0; i < puter; i++) {
        number += '0';
    }
    dotq = number + dotq;

    number = '';
    for (var i = 0; i < dothput; i++) {
        number += '';
    }
    doth = number + doth;
    valueArray = (dotq + doth).split("");

    valueArray.map((e, key) => {
        if (e === "0") {
            valueBig += key === 1 && valueArray[0] !== "0" && "万零" || key === 5 && "零圆" || "零";
        } else {
            switch (key) {
                case 0:
                    {
                        valueBig += bigWrite[e - 1] + unit[3];
                        break;
                    }
                default:
                    {
                        valueBig += bigWrite[e - 1] + unit[7 - key];
                    }
            }
        }
        splitArray.push(e === "0" ? "零" : bigWrite[e-1])
    });
    valueBig = valueBig.replace(/^零{1,}|零{1,}$/g, "");
    valueBig = valueBig.replace(/零{2,}/g, "零");
    valueBig = valueBig.replace(/零{1}圆/, "圆");
    valueBig = valueBig[valueBig.length - 1] === "圆" && valueBig + "整" || valueBig;

    return {array: splitArray, big: valueBig}
}

export { split }
