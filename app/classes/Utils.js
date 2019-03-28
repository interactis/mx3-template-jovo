'use strict';

class Utils {

    static isEmpty(value) {
        return (value == null || value === undefined || typeof value === "undefined" || value.length === 0 || Object.keys(value).length === 0);
    }
    
    static currentTimestamp() {
        return Math.round((new Date()).getTime() / 1000);
    }

}

module.exports = Utils;
