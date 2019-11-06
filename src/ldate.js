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
            let date = new Date();
            ldate = assignValuesForDate(ldate, date);
            
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