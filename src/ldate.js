const {
    getMingNeiyinOfGanZhi,
    isGoodDay,
    jdFromDate,
    convertSolar2Lunar,
    findGoodHoursInDay,
    getGanZhi
} = require('@junryo/astrology-utils');

var LDate = (function (Date, Math, Array, undefined) {

    function LDate() {
        return init(
            (this instanceof LDate) ? this : new LDate(),
            arguments);
    }

    function init(ldate, args) {

        // the length of arguments
        var len = args.length;

        // creates a new LDate with the current date and time
        if (!len) {
            //now
            let date = new Date();
            let lunarDate = convertSolar2Lunar(date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear(), -date.getTimezoneOffset() / 60);
            ldate.year = lunarDate[2]
            ldate.month = lunarDate[1]
            ldate.day = lunarDate[0]
            ldate.goodHours = findGoodHoursInDay('Tí')
            ldate.cDate = getGanZhi.ofDay(jdFromDate(date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear()));
            ldate.cMonth = getGanZhi.ofMonth(ldate.year, ldate.month);
            ldate.cYear = getGanZhi.ofYear(ldate.year);
            ldate.goodDay = isGoodDay(ldate.cMonth, ldate.cDate);
            ldate.mingNeiyin = getMingNeiyinOfGanZhi(ldate.cDate);
        }

        return ldate;
    }

    var proto = LDate.prototype;
    proto.length = 1;
    proto.splice = Array.prototype.splice;

    proto.toString = function () {
        return this.year + '年' + this.month + '月' + this.day + '日';
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = LDate;
    }

    return LDate;

})(Date, Math, Array);