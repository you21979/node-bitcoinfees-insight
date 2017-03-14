# node-bitcoinfees-insight

[![NPM](https://nodei.co/npm/bitcoinfees-insight.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/bitcoinfees-insight)  
[![Build Status](https://secure.travis-ci.org/you21979/node-bitcoinfees-insight.png?branch=master)](https://travis-ci.org/you21979/node-bitcoinfees-insight)
[![Coverage Status](https://coveralls.io/repos/github/you21979/node-bitcoinfees-insight/badge.svg?branch=master)](https://coveralls.io/github/you21979/node-bitcoinfees-insight?branch=master)

bitcoinfees from insight

## install

```
npm i bitcoinfees-insight
```

## Usage

### recommended

```
var bitcoinfees = require('bitcoinfees-insight');
bitcoinfees.FeesApi.recommended().then(function(res){
    console.log(res)
})
```

```
{ "fastestFee": 40, "halfHourFee": 20, "hourFee": 10 }
```

## HTTP Error Handling

### simple error control

```
bitcoinfees.FeesApi.recommended().catch(function(e){
    console.log(e.message)
})
```

### technical error control

```
var errors = require('bitcoinfees-insight/errors')
bitcoinfees.FeesApi.recommended()
    .catch(errors.StatusCodeError, function (reason) {
        // HTTP STATUS ERROR(404 or 500, 502, etc...)
        console.log("HTTP StatusCodeError " + reason.statusCode, "HTTP", reason.statusCode)
    })
    .catch(errors.RequestError, function (reason) {
        // REQUEST ERROR(SYSTEMCALL, TIMEOUT)
        console.log(reason.message, "SYSCALL", reason.error.code)
    })
    .catch(function(e){
        // OTHER ERROR
        console.log(e.message)
    })
```

## VALUE Error Handling

```
var bitcoinfees = require('bitcoinfees-insight');
var assert = require('assert');
var clamp = function(value, min, max){
    return Math.min(Math.max(min, value), max)
}
bitcoinfees.FeesApi.recommended().then(function(res){
    assert(res.hourFee > 0);
    return clamp(res.hourFee, 20, 200) // The API obstacle leads to loss
})
```

## memo

It is better to store it in the database when using it on the server

