const {
    convertSolar2Lunar,
    findGoodHoursInDay,
    getBadStarsInDay,
    getElement,
    findBadHourInDay,
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
    jdToDate,
    getSolarFestival,
    getLunarFestival,
    getBadAgeOfDay,
    getBadAgeOfMonth,
    getAuspiciousNInauspicious,
    getEvilDirectionOfDay,
    getTimeZodiac
} = require('@junryo/astrology-utils');

module.exports = function (lDate, sDate) {

    // Solar date information 
    lDate.sDay = sDate.getUTCDate()
    lDate.sMonth = sDate.getUTCMonth() + 1
    lDate.sYear = sDate.getUTCFullYear()

    //lunar date information
    let lunarDate = convertSolar2Lunar(lDate.sDay, lDate.sMonth, lDate.sYear, -sDate.getTimezoneOffset() / 60);
    lDate.year = lunarDate[2]
    lDate.month = lunarDate[1]
    lDate.day = lunarDate[0]

    //lunar date ganzhi
    lDate.cDay = getGanZhi.ofDay(jdFromDate(lDate.sDay, lDate.sMonth, lDate.sYear));
    lDate.cMonth = getGanZhi.ofMonth(lDate.year, lDate.month);
    lDate.cYear = getGanZhi.ofYear(lDate.year);

    //Festival
    lDate.lunarFestival = getLunarFestival(lDate.day, lDate.month)
    lDate.solarFestival = getSolarFestival(lDate.sDay, lDate.sMonth)

    //Good hours, bad hours in specific day
    lDate.goodHours = findGoodHoursInDay(lDate.cDay)
    lDate.badHours = findBadHourInDay(lDate.cDay)

    lDate.isGoodDay = isGoodDay(lDate.cMonth, lDate.cDay);
    lDate.mingNeiyinOfYear = getMingNeiyinOfGanZhi(lDate.cYear);
    lDate.mingNeiyinOfDay = getMingNeiyinOfGanZhi(lDate.cDay);
    lDate.elementOfDay = getElement(lDate.cDay);
    lDate.elementOfMonth = getElement(lDate.cMonth);
    lDate.elementOfYear = getElement(lDate.cYear);
    
    //Direction for start
    lDate.luckyDirection = getLuckyDirectionOfHour(lDate.cDay)
    lDate.wealthDirection = getWealthDirectionOfHour(lDate.cDay)
    lDate.evilDirection = getEvilDirectionOfDay(lDate.cDay)
    lDate.officer = getOfficerOfDay(lDate.sDay, lDate.sMonth, lDate.sYear)
    lDate.solarTerm = getSolarTerm(lDate.sDay, lDate.sMonth, lDate.sYear)

    lDate.goodStars = getGoodStarsInDay(lDate.month, lDate.cDay),
    lDate.badStars = getBadStarsInDay(lDate.day, lDate.month, lDate.cDay)
    let auspiciousNInauspicious = getAuspiciousNInauspicious(lDate.goodStars['names'], lDate.badStars['names'])

    lDate.auspicious = auspiciousNInauspicious.auspicious
    lDate.inauspicious = auspiciousNInauspicious.inauspicious
    lDate.star = getStarOfDay(lDate.sDay, lDate.sMonth, lDate.sYear)
    lDate.badAgeOfDay = getBadAgeOfDay(lDate.cDay)
    lDate.badAgeOfMonth = getBadAgeOfMonth(lDate.cMonth)

    lDate.timeZodiac = getTimeZodiac(lDate.cDay)
    console.log(lDate.timeZodiac)
    return lDate;
}