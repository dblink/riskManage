export var jsonCompare = function(json1, json2) {
    var json1Length,
        json2Length,
        compare;
    json1Length = compare = json2Length = 0;

    for (var k in json1) {
        json1Length += 1;
        var result = true;
        if (typeof json1[k] === "object") {
            result = jsonCompare(json1[k], json2[k]);
        } else {
            result = json1[k] === json2[k];
        }
        if (!result) {
            return;
        } else {
            compare += 1;
        }
    }
    for (var j in json2) {
        json2Length += 1;
    }
    return json1Length === compare && compare === json2Length;
};