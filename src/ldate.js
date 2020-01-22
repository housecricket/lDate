const assignValuesForDate = require('./assignValuesForDate');

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
            ldate = assignValuesForDate(ldate, new Date());
        } else if (len == 1) {
            var arg = args[0];
            if (arg instanceof Date) {
                ldate = assignValuesForDate(ldate, new Date(arg.getTime()));
            }
            else if (isNumber(arg)) {
                ldate = new assignValuesForDate(ldate, new Date(arg));
            }
        }

        return ldate;
    }

    var proto = LDate.prototype;
    proto.length = 1;
    proto.splice = Array.prototype.splice;

    proto.toString = function () {
        return this.year + '年' + this.month + '月' + this.day + '日';
    };

    proto.toJSON = function() {
        return {
            'cDay': this.cDay, 
            'cMonth': this.cMonth, 
            'cYear': this.cYear, 
            'lDay': this.day,
            'lMonth': this.month, 
            'lYear': this.year, 
            'lunarFestival': this.lunarFestival, 
            'sDay': this.sDay, 
            'sMonth': this.sMonth, 
            'sYear': this.sYear, 
            'solarFestival': this.solarFestival, 
            'solarTerm': this.solarTerm,
            'goodHours' : this.goodHours,
            'badHours' : this.badHours,
            'isGoodDay' : this.isGoodDay,
            'mingNeiyinOfYear' : this.mingNeiyinOfYear,
            'mingNeiyinOfDay' : this.mingNeiyinOfDay,
            'elementOfDay' : this.elementOfDay,
            'elementOfYear': this.elementOfYear,
            'luckyDirection' : this.luckyDirection,
            'wealthDirection' : this.wealthDirection,
            'evilDirection' : this.evilDirection,
            'officer' : this.officer,
            'goodStars' : this.goodStars,
            'badStars' : this.badStars,
            'auspicious' : this.auspicious,
            'inauspicious' : this.inauspicious,
            'star' : this.star,
            'badAgeOfDay' : this.badAgeOfDay,
            'badAgeOfMonth' : this.badAgeOfMonth,
            'timeZodiac' : this.timeZodiac
        }
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = LDate;
    }

    return LDate;

})(Date, Math, Array);
