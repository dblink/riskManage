/* jshint ignore: start */
const drawCanvas = (src, id, drawData, callback) => {
    let _drawData = drawData;
    let img = new Image();
    let url;
    //"img/threeParty/page1.jpg"
    img.src = src;
    img.onload = function () {
        let _canvas = document.createElement("canvas");
        let _context = _canvas.getContext("2d");;
        let width = 596;
        let height = 596 * img.height / img.width;
        let imgArray = [];
        _canvas.height = 2048 * img.height / img.width;
        _canvas.width = 2048;

        /* _context.scale(2,2); */
        _context.beginPath();
        _context.drawImage(img, 0, 0, _canvas.width, _canvas.height);
        _context.fillStyle = "#000";
        _context.font = "48px 宋体";

        Object
            .keys(_drawData)
            .map((e, key) => {
                switch (_drawData[e].type) {
                    case "map":
                        {
                            _drawData[e]
                                .value
                                .map((sub, key) => {
                                    let marginX = _drawData[e].marginX && key * _drawData[e].marginX || 0;
                                    let marginY = _drawData[e].marginY && key * _drawData[e].marginY || 0;
                                    _context.fillText(sub, (_drawData[e].first.x + marginX) * _canvas.width / width, (_drawData[e].first.y + marginY) * _canvas.height / height);
                                })
                            break;
                        }
                    case "img":{
                        let value = _drawData[e].value;
                        let _width = _drawData[e].width || value.width;
                        let _height = _drawData[e].height || value.height / value.width * _width;
                        //console.log(_drawData[e]);
                        _context.drawImage(value, _drawData[e].x * _canvas.width / width, _drawData[e].y * _canvas.height / height , _width, _height);
                        break;
                    }
                    default:
                        {
                            _context.fillText(_drawData[e].name, _drawData[e].x * _canvas.width / width, _drawData[e].y * _canvas.height / height);
                        }
                }
            });
        
        let newImage = new Image();
        newImage.src = _canvas.toDataURL("image/png");
        document
            .getElementById(id)
            .appendChild(newImage);
    }

}
export {drawCanvas}
/* */