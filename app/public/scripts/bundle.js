(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Import Javascript modules here:
var example = require('./modules/example');

// ...and then do something with them:
example.init();

// This all gets processed by Babel, so feel free
// to use ES2015 syntax if you like - it will be
// transpiled to backwards-compatible ES5:
var b = [1, 2, 3].map(function (x) {
  return x * 2;
});

},{"./modules/example":2}],2:[function(require,module,exports){
'use strict';

/**
 * This is an example module. Feel free to delete or replace it!
 */

function init() {
  console.log('Browserify is working!');
}

module.exports = {
  init: init
};

},{}]},{},[1]);
