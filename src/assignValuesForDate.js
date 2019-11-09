const {
    getStarOfDay,
    getBadStarsInDay,
    getGoodStarsInDay,
    getElementOfDay,
    getMingNeiyinOfGanZhi,
    isGoodDay,
    jdFromDate,
    convertSolar2Lunar,
    findGoodHoursInDay,
    getGanZhi
} = require('@junryo/astrology-utils');

module.exports = function (lDate, sDate) {
    let lunarDate = convertSolar2Lunar(sDate.getUTCDate(), sDate.getUTCMonth() + 1, sDate.getUTCFullYear(), -sDate.getTimezoneOffset() / 60);
    lDate.year = lunarDate[2]
    lDate.month = lunarDate[1]
    lDate.day = lunarDate[0]
    lDate.goodHours = findGoodHoursInDay('Tí')
    lDate.cDate = getGanZhi.ofDay(jdFromDate(sDate.getUTCDate(), sDate.getUTCMonth() + 1, sDate.getUTCFullYear()));
    lDate.cMonth = getGanZhi.ofMonth(lDate.year, lDate.month);
    lDate.cYear = getGanZhi.ofYear(lDate.year);
    lDate.goodDay = isGoodDay(lDate.cMonth, lDate.cDate);
    lDate.mingNeiyin = getMingNeiyinOfGanZhi(lDate.cDate);
    lDate.element = getElementOfDay(lDate.cDate);
    lDate.goodStars = getGoodStarsInDay(lDate.month, lDate.cDate),
    lDate.badStars = getBadStarsInDay(lDate.day, lDate.month, lDate.cDate),

    lDate.star = getStarOfDay(sDate.getUTCDate(), sDate.getUTCMonth() + 1, sDate.getUTCFullYear());

    // việc nên làm
    lDate.auspicious = ''

    // việc không nên làm
    lDate.inauspicious = ''

    return lDate;
}