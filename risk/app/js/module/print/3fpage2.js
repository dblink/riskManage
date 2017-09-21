function page2() {
    var _file;
    var img = new Image();
    var drawList = {};

    drawList = {
        //总金额
        sumMoney: setting("12345.56", 194, 111),
        //大写总金额
        sumbig: setting(split("12345.56").big, 274, 147),
        //分单位写
        sumSplit: {
            type: "map",
            first: {
                x: 327,
                y: 111
            },
            value: split("12345.56").array
        },
        backMoney: setting("12345.56", 194, 180),
        backMoneyBig: {
            type: "map",
            first: {
                x: 327,
                y: 180
            },
            value: split("12345.56").array
        },
        term: setting("50", 216, 212),
        startYear: setting("2017", 203, 246),
        startMonth: setting("01", 270, 246),
        startDay: setting("02", 301, 246),
        endYear: setting("2018", 382, 246),
        endMonth: setting("01", 447, 246),
        endDay: setting("02", 480, 246)
    }

    function split(value) {
        var dotq = value.split(".")[0];
        var dotqLength = dotq.length;
        var doth = value.split(".")[1];
        var dothLength = doth.length;
        var bigWrite = "壹.贰.叁.肆.伍.陆.柒.捌.玖".split(".");
        var unit = "分.角.圆.拾.佰.仟.万".split(".");
        var valueArray;
        var puter = 6 - dotqLength;
        var valueBig = "";
        var dothput = 2 - dothLength;

        var number = '';
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

        })
        valueBig = valueBig.replace(/^零{1,}|零{1,}$/g, "");
        valueBig = valueBig.replace(/零{2,}/g, "零");
        valueBig = valueBig.replace(/零{1}圆/, "圆");
        valueBig = valueBig[valueBig.length - 1] === "圆" && valueBig + "整" || valueBig;

        return {
            array: valueArray,
            big: valueBig
        }
    }

    function setting(name, x, y, size = 16) {
        return {
            name: name,
            x: x,
            y: y,
            size: size
        }
    }

    img.src = "image/xieyi2.jpg";
    img.onload = function () {
        _context.drawImage(img, 0, 0, 596, 808);
        _context.fillStyle = "#000";
        _context.font = "16px 宋体";
        //甲方
        //_context.fillText(fp.name, fp.x , fp.y);
        Object.keys(drawList).map((e) => {
            if (drawList[e].type === "map") {
                drawList[e].value.map((sub, key) => {
                    let marginX = key * 30;
                    _context.fillText(sub, drawList[e].first.x + marginX, drawList[e].first.y);
                })
            } else {
                _context.fillText(drawList[e].name, drawList[e].x, drawList[e].y)
            }

        })


        var image = new Image();
        image.src = _canvas.toDataURL("image/png", 1.0);
        var dataURL = _canvas.toDataURL("image/png");
        /*var src= window.URL.createObjectURL(_canvas.toDataURL("image/png"));
        console.log(src);*/
        document.getElementById("imagelist").appendChild(image);
        _file = toBlob(dataURL, "png");
        _file.name = "xieyi";
    }
    return _file
}