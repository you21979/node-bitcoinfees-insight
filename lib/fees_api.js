'use strict'
var rp = require('request-promise');
var constant = require('./constant');

var createGetOption = function(url, param) {
    return {
        url: url,
        qs: param,
        method: 'GET',
        timeout: Math.floor(constant.OPT_TIMEOUT_SEC * 1000),
        transform2xxOnly : true,
        transform: function(body){
            return JSON.parse(body)
        },
    };
}

var get = function(method, param) {
    return rp(createGetOption(constant.API_BASE_URL + method, param || {}))
}

var recommended = exports.recommended = function() {
    return get('/utils/estimatefee', { nbBlocks: 2 }).then(function(res){
        var value = Object.keys(res).map(function(key){ return res[key] }).shift()
        if(value === -1 || value === void 0){
            throw new Error("minus error");
        }
        var spb = Math.round(value / 1000 * 1e8);
        return {
            "fastestFee": spb, "halfHourFee": Math.round(spb * 0.9), "hourFee": Math.round(spb * 0.8)
        }
    })
}

