const {
    convertSolar2Lunar,
    findGoodHoursInDay,
    getBadStarsInDay,
    getElementOfDay,
    getEvilOfHourInDay,
    getGanZhi,
    getGoodStarsInDay,
    getLuckyDirectionOfHour,
    getMingNeiyinOfGanZhi,
    getOfficerOfDay,
    getSolarTerm,
    getStarOfDay,
    getWealthDirectionOfHour,
    isGoodDay,
    jdFromDate,
    jdToDate
} = require('@junryo/astrology-utils');

module.exports = function (lDate, sDate) {
    let lunarDate = convertSolar2Lunar(sDate.getUTCDate(), sDate.getUTCMonth() + 1, sDate.getUTCFullYear(), -sDate.getTimezoneOffset() / 60);
    lDate.year = lunarDate[2]
    lDate.month = lunarDate[1]
    lDate.day = lunarDate[0]
    lDate.cDay = getGanZhi.ofDay(jdFromDate(sDate.getUTCDate(), sDate.getUTCMonth() + 1, sDate.getUTCFullYear()));
    lDate.cMonth = getGanZhi.ofMonth(lDate.year, lDate.month);
    lDate.cYear = getGanZhi.ofYear(lDate.year);

    lDate.goodHours = findGoodHoursInDay(lDate.cDay)
    lDate.badHours = getEvilOfHourInDay(lDate.cDay)
    lDate.goodDay = isGoodDay(lDate.cMonth, lDate.cDay);
    lDate.mingNeiyin = getMingNeiyinOfGanZhi(lDate.cDay);
    lDate.element = getElementOfDay(lDate.cDay);
    lDate.luckyDirection = getLuckyDirectionOfHour(lDate.cDay)
    lDate.wealthDirection = getWealthDirectionOfHour(lDate.cDay)

    lDate.officer = getOfficerOfDay(sDate.getUTCDate(), sDate.getUTCMonth() + 1, sDate.getUTCFullYear())
    lDate.getSolarTerm = getSolarTerm(sDate.getUTCDate(), sDate.getUTCMonth() + 1, sDate.getUTCFullYear())
    // goodStars gồm sao tốt + việc nên làm tương ứng 
    lDate.goodStars = getGoodStarsInDay(lDate.month, lDate.cDay),
    //badStars gồm sao xấu + việc k nên làm tương ứng
    lDate.badStars = getBadStarsInDay(lDate.day, lDate.month, lDate.cDay),
    lDate.star = getStarOfDay(sDate.getUTCDate(), sDate.getUTCMonth() + 1, sDate.getUTCFullYear());

    return lDate;
}