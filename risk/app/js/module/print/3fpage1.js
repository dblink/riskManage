function sanfangPage1() {
    var _file;
    var _canvas = document.getElementById("canvas")
    var _context = _canvas.getContext("2d");
    var img = new Image();
    var fp = {} //甲方
    var fpCard = {} //甲方身份证
    var sp = {} //乙方
    var spCard = {} //乙方身份证
    var spAddress = {} //乙方住址
    var spMobile = {} //乙方手机号
    var tp = {} //丙方
    var tpAddress = {} //丙方地址
    var fop = {} //丁方
    var fopAddress = {} //丁方地址
    //第三方协议p1
    fp = setting("中温1a", 160, 145);
    fpCard = setting("12345678", 103, 180);
    sp = setting("乙方", 163, 212);
    spCard = setting("12345667", 100, 250);
    spAddress = setting("同进花园123冻", 91, 285);
    spMobile = setting("1919191919", 133, 324);
    tp = setting("丙方", 171, 359);
    tpAddress = setting("地址", 90, 394);
    fop = setting("丁方", 163, 429);
    fopAddress = setting("地址", 90, 464);

    function setting(name, x, y, size = 16) {
        return {
            name: name,
            x: x,
            y: y,
            size: size
        }
    }

    img.src = "image/xieyi1.jpg";
    img.onload = function () {
        _context.drawImage(img, 0, 0, 596, 808);
        _context.fillStyle = "#000";
        _context.font = "16px 宋体";
        //甲方
        _context.fillText(fp.name, fp.x, fp.y);
        _context.fillText(fpCard.name, fpCard.x, fpCard.y);
        //乙方
        _context.fillText(sp.name, sp.x, sp.y);
        _context.fillText(spCard.name, spCard.x, spCard.y);
        _context.fillText(spAddress.name, spAddress.x, spAddress.y);
        _context.fillText(spMobile.name, spMobile.x, spMobile.y);
        //丙方
        _context.fillText(tp.name, tp.x, tp.y);
        _context.fillText(tpAddress.name, tpAddress.x, tpAddress.y);
        //丁方
        _context.fillText(fop.name, fop.x, fop.y);
        _context.fillText(fopAddress.name, fopAddress.x, fopAddress.y);

        var image = new Image();
        image.src = _canvas.toDataURL("image/png", 1.0);
        var dataURL = _canvas.toDataURL("image/png");

        document.getElementById("imagelist").appendChild(image);
        _file = toBlob(dataURL, "png");
        _file.name = "xieyi";
    }
    return _file;
}