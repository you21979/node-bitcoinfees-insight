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
    return get('/utils/estimatefee', { nbBlocks: '2,3' }).then(function(res){
        if(res[2] === -1 || res[3] === -1){
            throw new Error("no data");
        }
        var spb2 = Math.round(res[2] / 1000 * 1e8);
        var spb3 = Math.round(res[3] / 1000 * 1e8);
        return {
            "fastestFee": Math.round(spb2 * 1.05), "halfHourFee": Math.round(spb2), "hourFee": Math.round(spb3)
        }
    })
}

