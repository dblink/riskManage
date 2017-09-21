/**
 * Created by Administrator on 2017/4/5.
 */
/* jshint ignore : start */
export function time(time = "2017-12-31") {
    let fault = time = time.split("-");
    return ((name, value) => {
        getMaxDay(time[1], time[0]);
        switch (name) {
            case "year":
                {
                    time[0] = value;
                    break;
                }
            case "month":
                {
                    time[1] = value;
                    break;
                }
            case "day":
            case "date":
                {
                    time[2] = value;
                    break;
                }
            case "full":
                {
                    time = value.split("-");
                    break;
                }
            case "default":
                {
                    time = fault;
                    break;
                }
        }
        time[2] = time[2] > getMaxDay(time[1], time[0])
            ? getMaxDay(time[1], time[0])
            : time[2];
        return time.join("-")
    }).bind(this)
}

export function getTimeOption(stOption, etOption) {
    let option = [];
    for (let i = stOption; i <= etOption; i++) {
        option.push({text: i, value: i});
    }
    return option;
}

export function getMaxDay(month, year) {
    month = parseInt(month);
    year = parseInt(year);
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            {
                return 31
            }
        case 4:
        case 6:
        case 9:
        case 11:
            {
                return 30
            }
        case 2:
            {
                if (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) {
                    return 29;
                } else {
                    return 28;
                }
            }
    }
}

export function getFirst(time) {
    time = time.replace(/\/|-|\./g, "/");
    let date = new Date(time);
    date.setDate(1);
    return date.getDay();
}
export function dataSeparate(time) {
    time = time
        .replace(/\/|-|\./g, "/")
        .split("/");
    return {year: time[0], month: time[1], date: time[2]}
}
/*
 * return selectList
 * */
export function getTimeSelectList(sTime = "2017-1-1", eTime = false) {
    const selectList = {
        stYearSelectList: "",
        stMonthSelectList: "",
        stDaySelectList: "",
        etYearSelectList: "",
        etMonthSelectList: "",
        etDaySelectList: ""
    };
    let stArray,
        isSameYear,
        isSameMonth,
        date,
        etArray;
    date = new Date();
    stArray = sTime.split("-");
    etArray = eTime
        ? eTime.split("-")
        : "";
    isSameYear = stArray[0] === etArray[0];
    isSameMonth = isSameYear && stArray[1] === etArray[1];

    if (isSameYear) {
        selectList.stYearSelectList = getTimeOption(2016, etArray[0]);
        selectList.etYearSelectList = getTimeOption(stArray[0], date.getFullYear() + 2);
        selectList.stMonthSelectList = getTimeOption(1, etArray[1]);
        selectList.etMonthSelectList = getTimeOption(stArray[1], 12);
        if (isSameMonth) {
            selectList.stDaySelectList = getTimeOption(1, etArray[2]);
            selectList.etDaySelectList = getTimeOption(stArray[2], getMaxDay(etArray[1], etArray[0]));
        } else {
            selectList.stDaySelectList = getTimeOption(1, getMaxDay(stArray[1], stArray[0]));
            selectList.etDaySelectList = getTimeOption(1, getMaxDay(etArray[1], etArray[0]));
        }
    } else {
        selectList.stYearSelectList = getTimeOption(2016, etArray
            ? etArray[0]
            : date.getFullYear() + 2);
        selectList.stMonthSelectList = getTimeOption(1, 12);
        selectList.stDaySelectList = getTimeOption(1, getMaxDay(stArray[1], stArray[0]));
        selectList.etYearSelectList = getTimeOption(stArray[0], date.getFullYear() + 2);
        selectList.etMonthSelectList = getTimeOption(1, 12);
        selectList.etDaySelectList = getTimeOption(1, getMaxDay(etArray[1], etArray[0]));
    }
    return selectList;
}