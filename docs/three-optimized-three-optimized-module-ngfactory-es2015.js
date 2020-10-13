(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["three-optimized-three-optimized-module-ngfactory"],{

/***/ "./node_modules/ow-lite/index.js":
/*!***************************************!*\
  !*** ./node_modules/ow-lite/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const symbols = __webpack_require__(/*! ./lib/symbols */ "./node_modules/ow-lite/lib/symbols.js")
const number = __webpack_require__(/*! ./lib/number */ "./node_modules/ow-lite/lib/number.js")
const string = __webpack_require__(/*! ./lib/string */ "./node_modules/ow-lite/lib/string.js")
const object = __webpack_require__(/*! ./lib/object */ "./node_modules/ow-lite/lib/object.js")

const typePredicates = {
  number,
  string,
  object
}

const createOw = ({
  validators = [],
  predicates = typePredicates,
  type = null
} = { }) => {
  const ow = new Proxy(function () { }, {
    get: (obj, key) => {
      if (key === symbols.validate) {
        return (value, label = 'argument') => {
          if (!type) {
            return new Error('missing required type specifier')
          }

          for (let i = 0; i < validators.length; ++i) {
            const validator = validators[i]
            const result = validator.fn(value)

            if (!result) {
              if (i === 0) {
                throw new Error(`Expected ${label} \`${value}\` to be of type \`${type}\`, but received type \`${typeof value}\``)
              } else {
                throw new Error(`Expected ${type} \`${label}\` \`${value}\` failed predicate \`${validator.key}\``)
              }
            }
          }
        }
      }

      const predicate = predicates[key]

      if (predicate) {
        if (typeof predicate === 'function') {
          validators.push({
            key,
            fn: predicate
          })

          return ow
        } else {
          return createOw({
            type: key,
            validators: [
              {
                key,
                fn: predicate.validator
              }
            ],
            predicates: predicate.predicates
          })
        }
      } else {
        const fn = predicates[symbols.func] && predicates[symbols.func][key]

        if (fn) {
          return new Proxy(function () { }, {
            get: () => {
              throw new Error(`invalid use of functional predicate "${key}"`)
            },

            apply: (obj, thisArg, args) => {
              validators.push({
                key,
                fn: fn(...args)
              })

              return ow
            }
          })
        } else {
          if (key === 'default' || key === '__esModule') {
            return ow
          }

          return ow
          // throw new Error(`unrecognized predicate "${key}"`)
        }
      }
    },

    apply: (obj, thisArg, args) => {
      if (args.length !== 2 && args.length !== 3) {
        throw new Error('invalid number of arguments to "ow"')
      } else {
        args[1][symbols.validate](args[0], args[2])
      }
    }
  })

  return ow
}

module.exports = createOw()


/***/ }),

/***/ "./node_modules/ow-lite/lib/number.js":
/*!********************************************!*\
  !*** ./node_modules/ow-lite/lib/number.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { func } = __webpack_require__(/*! ./symbols */ "./node_modules/ow-lite/lib/symbols.js")

const numberPredicates = {
  positive: (value) => (value > 0),
  negative: (value) => (value < 0),
  nonNegative: (value) => (value >= 0),
  integer: (value) => (value === (value | 0)),

  [func]: {
    is: (fn) => fn,
    eq: (v) => (value) => (value === v),
    gt: (v) => (value) => (value > v),
    gte: (v) => (value) => (value >= v),
    lt: (v) => (value) => (value < v),
    lte: (v) => (value) => (value <= v)
  }
}

module.exports = {
  predicates: numberPredicates,
  validator: (value) => {
    return typeof value === 'number'
  }
}


/***/ }),

/***/ "./node_modules/ow-lite/lib/object.js":
/*!********************************************!*\
  !*** ./node_modules/ow-lite/lib/object.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { func } = __webpack_require__(/*! ./symbols */ "./node_modules/ow-lite/lib/symbols.js")

const objectPredicates = {
  plain: (value) => {
    if (typeof value !== 'object') return false

    const proto = Object.getPrototypeOf(value)
    return proto === null || proto === Object.getPrototypeOf({})
  },
  empty: (value) => Object.keys(value).length === 0,
  nonEmpty: (value) => Object.keys(value).length > 0,

  [func]: {
    is: (fn) => fn,
    instanceOf: (v) => (value) => (value instanceof v)
  }
}

module.exports = {
  predicates: objectPredicates,
  validator: (value) => {
    return typeof value === 'object'
  }
}


/***/ }),

/***/ "./node_modules/ow-lite/lib/string.js":
/*!********************************************!*\
  !*** ./node_modules/ow-lite/lib/string.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { func } = __webpack_require__(/*! ./symbols */ "./node_modules/ow-lite/lib/symbols.js")

const stringPredicates = {
  empty: (value) => (value === ''),
  nonEmpty: (value) => (value !== ''),

  [func]: {
    is: (fn) => fn,
    eq: (v) => (value) => (value === v),
    length: (v) => (value) => (value.length === v),
    minLength: (v) => (value) => (value.length >= v),
    maxLength: (v) => (value) => (value.length <= v),
    matches: (v) => (value) => v.test(value),
    startsWith: (v) => (value) => value.startsWith(v),
    endsWith: (v) => (value) => value.endsWith(v)
  }
}

module.exports = {
  predicates: stringPredicates,
  validator: (value) => {
    return typeof value === 'string'
  }
}


/***/ }),

/***/ "./node_modules/ow-lite/lib/symbols.js":
/*!*********************************************!*\
  !*** ./node_modules/ow-lite/lib/symbols.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.func = Symbol('func')
exports.validate = Symbol('validate')


/***/ }),

/***/ "./node_modules/random/dist/distributions/bates.js":
/*!*********************************************************!*\
  !*** ./node_modules/random/dist/distributions/bates.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _owLite = __webpack_require__(/*! ow-lite */ "./node_modules/ow-lite/index.js");

var _owLite2 = _interopRequireDefault(_owLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (random) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  (0, _owLite2.default)(n, _owLite2.default.number.integer.positive);
  var irwinHall = random.irwinHall(n);

  return function () {
    return irwinHall() / n;
  };
};
//# sourceMappingURL=bates.js.map

/***/ }),

/***/ "./node_modules/random/dist/distributions/bernoulli.js":
/*!*************************************************************!*\
  !*** ./node_modules/random/dist/distributions/bernoulli.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _owLite = __webpack_require__(/*! ow-lite */ "./node_modules/ow-lite/index.js");

var _owLite2 = _interopRequireDefault(_owLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (random) {
  var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;

  (0, _owLite2.default)(p, _owLite2.default.number.gte(0).lt(1));

  return function () {
    return random.next() + p | 0;
  };
};
//# sourceMappingURL=bernoulli.js.map

/***/ }),

/***/ "./node_modules/random/dist/distributions/binomial.js":
/*!************************************************************!*\
  !*** ./node_modules/random/dist/distributions/binomial.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _owLite = __webpack_require__(/*! ow-lite */ "./node_modules/ow-lite/index.js");

var _owLite2 = _interopRequireDefault(_owLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (random) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var p = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;

  (0, _owLite2.default)(n, _owLite2.default.number.positive.integer);
  (0, _owLite2.default)(p, _owLite2.default.number.gte(0).lte(1));

  return function () {
    var i = 0;
    var x = 0;

    while (i++ < n) {
      x += random.next() < p;
    }

    return x;
  };
};
//# sourceMappingURL=binomial.js.map

/***/ }),

/***/ "./node_modules/random/dist/distributions/exponential.js":
/*!***************************************************************!*\
  !*** ./node_modules/random/dist/distributions/exponential.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _owLite = __webpack_require__(/*! ow-lite */ "./node_modules/ow-lite/index.js");

var _owLite2 = _interopRequireDefault(_owLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (random) {
  var lambda = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  (0, _owLite2.default)(lambda, _owLite2.default.number.positive);

  return function () {
    return -Math.log(1 - random.next()) / lambda;
  };
};
//# sourceMappingURL=exponential.js.map

/***/ }),

/***/ "./node_modules/random/dist/distributions/geometric.js":
/*!*************************************************************!*\
  !*** ./node_modules/random/dist/distributions/geometric.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _owLite = __webpack_require__(/*! ow-lite */ "./node_modules/ow-lite/index.js");

var _owLite2 = _interopRequireDefault(_owLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (random) {
  var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;

  (0, _owLite2.default)(p, _owLite2.default.number.gt(0).lte(1));
  var invLogP = 1.0 / Math.log(1.0 - p);

  return function () {
    return 1 + Math.log(random.next()) * invLogP | 0;
  };
};
//# sourceMappingURL=geometric.js.map

/***/ }),

/***/ "./node_modules/random/dist/distributions/irwin-hall.js":
/*!**************************************************************!*\
  !*** ./node_modules/random/dist/distributions/irwin-hall.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _owLite = __webpack_require__(/*! ow-lite */ "./node_modules/ow-lite/index.js");

var _owLite2 = _interopRequireDefault(_owLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (random) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  (0, _owLite2.default)(n, _owLite2.default.number.integer.gte(0));

  return function () {
    var sum = 0;
    for (var i = 0; i < n; ++i) {
      sum += random.next();
    }

    return sum;
  };
};
//# sourceMappingURL=irwin-hall.js.map

/***/ }),

/***/ "./node_modules/random/dist/distributions/log-normal.js":
/*!**************************************************************!*\
  !*** ./node_modules/random/dist/distributions/log-normal.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (random) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var normal = random.normal.apply(random, args);

  return function () {
    return Math.exp(normal());
  };
};
//# sourceMappingURL=log-normal.js.map

/***/ }),

/***/ "./node_modules/random/dist/distributions/normal.js":
/*!**********************************************************!*\
  !*** ./node_modules/random/dist/distributions/normal.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _owLite = __webpack_require__(/*! ow-lite */ "./node_modules/ow-lite/index.js");

var _owLite2 = _interopRequireDefault(_owLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (random) {
  var mu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var sigma = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  (0, _owLite2.default)(mu, _owLite2.default.number);
  (0, _owLite2.default)(sigma, _owLite2.default.number);

  return function () {
    var x = void 0,
        y = void 0,
        r = void 0;

    do {
      x = random.next() * 2 - 1;
      y = random.next() * 2 - 1;
      r = x * x + y * y;
    } while (!r || r > 1);

    return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
  };
};
//# sourceMappingURL=normal.js.map

/***/ }),

/***/ "./node_modules/random/dist/distributions/pareto.js":
/*!**********************************************************!*\
  !*** ./node_modules/random/dist/distributions/pareto.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _owLite = __webpack_require__(/*! ow-lite */ "./node_modules/ow-lite/index.js");

var _owLite2 = _interopRequireDefault(_owLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (random) {
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  (0, _owLite2.default)(alpha, _owLite2.default.number.gte(0));
  var invAlpha = 1.0 / alpha;

  return function () {
    return 1.0 / Math.pow(1.0 - random.next(), invAlpha);
  };
};
//# sourceMappingURL=pareto.js.map

/***/ }),

/***/ "./node_modules/random/dist/distributions/poisson.js":
/*!***********************************************************!*\
  !*** ./node_modules/random/dist/distributions/poisson.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _owLite = __webpack_require__(/*! ow-lite */ "./node_modules/ow-lite/index.js");

var _owLite2 = _interopRequireDefault(_owLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logFactorialTable = [0.0, 0.0, 0.69314718055994529, 1.7917594692280550, 3.1780538303479458, 4.7874917427820458, 6.5792512120101012, 8.5251613610654147, 10.604602902745251, 12.801827480081469];

var logFactorial = function logFactorial(k) {
  return logFactorialTable[k];
};

var logSqrt2PI = 0.91893853320467267;

exports.default = function (random) {
  var lambda = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  (0, _owLite2.default)(lambda, _owLite2.default.number.positive);

  if (lambda < 10) {
    // inversion method
    var expMean = Math.exp(-lambda);

    return function () {
      var p = expMean;
      var x = 0;
      var u = random.next();

      while (u > p) {
        u = u - p;
        p = lambda * p / ++x;
      }

      return x;
    };
  } else {
    // generative method
    var smu = Math.sqrt(lambda);
    var b = 0.931 + 2.53 * smu;
    var a = -0.059 + 0.02483 * b;
    var invAlpha = 1.1239 + 1.1328 / (b - 3.4);
    var vR = 0.9277 - 3.6224 / (b - 2);

    return function () {
      while (true) {
        var u = void 0;
        var v = random.next();

        if (v <= 0.86 * vR) {
          u = v / vR - 0.43;
          return Math.floor((2 * a / (0.5 - Math.abs(u)) + b) * u + lambda + 0.445);
        }

        if (v >= vR) {
          u = random.next() - 0.5;
        } else {
          u = v / vR - 0.93;
          u = (u < 0 ? -0.5 : 0.5) - u;
          v = random.next() * vR;
        }

        var us = 0.5 - Math.abs(u);
        if (us < 0.013 && v > us) {
          continue;
        }

        var k = Math.floor((2 * a / us + b) * u + lambda + 0.445) | 0;
        v = v * invAlpha / (a / (us * us) + b);

        if (k >= 10) {
          var t = (k + 0.5) * Math.log(lambda / k) - lambda - logSqrt2PI + k - (1 / 12.0 - (1 / 360.0 - 1 / (1260.0 * k * k)) / (k * k)) / k;

          if (Math.log(v * smu) <= t) {
            return k;
          }
        } else if (k >= 0) {
          if (Math.log(v) <= k * Math.log(lambda) - lambda - logFactorial(k)) {
            return k;
          }
        }
      }
    };
  }
};
//# sourceMappingURL=poisson.js.map

/***/ }),

/***/ "./node_modules/random/dist/distributions/uniform-boolean.js":
/*!*******************************************************************!*\
  !*** ./node_modules/random/dist/distributions/uniform-boolean.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (random) {
  return function () {
    return random.next() >= 0.5;
  };
};
//# sourceMappingURL=uniform-boolean.js.map

/***/ }),

/***/ "./node_modules/random/dist/distributions/uniform-int.js":
/*!***************************************************************!*\
  !*** ./node_modules/random/dist/distributions/uniform-int.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _owLite = __webpack_require__(/*! ow-lite */ "./node_modules/ow-lite/index.js");

var _owLite2 = _interopRequireDefault(_owLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (random, min, max) {
  if (max === undefined) {
    max = min === undefined ? 1 : min;
    min = 0;
  }

  (0, _owLite2.default)(min, _owLite2.default.number.integer);
  (0, _owLite2.default)(max, _owLite2.default.number.integer);

  return function () {
    return random.next() * (max - min + 1) + min | 0;
  };
};
//# sourceMappingURL=uniform-int.js.map

/***/ }),

/***/ "./node_modules/random/dist/distributions/uniform.js":
/*!***********************************************************!*\
  !*** ./node_modules/random/dist/distributions/uniform.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _owLite = __webpack_require__(/*! ow-lite */ "./node_modules/ow-lite/index.js");

var _owLite2 = _interopRequireDefault(_owLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (random, min, max) {
  if (max === undefined) {
    max = min === undefined ? 1 : min;
    min = 0;
  }

  (0, _owLite2.default)(min, _owLite2.default.number);
  (0, _owLite2.default)(max, _owLite2.default.number);

  return function () {
    return random.next() * (max - min) + min;
  };
};
//# sourceMappingURL=uniform.js.map

/***/ }),

/***/ "./node_modules/random/dist/generators/function.js":
/*!*********************************************************!*\
  !*** ./node_modules/random/dist/generators/function.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _owLite = __webpack_require__(/*! ow-lite */ "./node_modules/ow-lite/index.js");

var _owLite2 = _interopRequireDefault(_owLite);

var _rng = __webpack_require__(/*! ../rng */ "./node_modules/random/dist/rng.js");

var _rng2 = _interopRequireDefault(_rng);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RNGFunction = function (_RNG) {
  _inherits(RNGFunction, _RNG);

  function RNGFunction(thunk, opts) {
    _classCallCheck(this, RNGFunction);

    var _this = _possibleConstructorReturn(this, (RNGFunction.__proto__ || Object.getPrototypeOf(RNGFunction)).call(this));

    _this.seed(thunk, opts);
    return _this;
  }

  _createClass(RNGFunction, [{
    key: 'next',
    value: function next() {
      return this._rng();
    }
  }, {
    key: 'seed',
    value: function seed(thunk) {
      (0, _owLite2.default)(thunk, _owLite2.default.function);
      this._rng = thunk;
    }
  }, {
    key: 'clone',
    value: function clone() {
      for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
        opts[_key] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(RNGFunction, [null].concat([this._rng], opts)))();
    }
  }, {
    key: 'name',
    get: function get() {
      return 'function';
    }
  }]);

  return RNGFunction;
}(_rng2.default);

exports.default = RNGFunction;
//# sourceMappingURL=function.js.map

/***/ }),

/***/ "./node_modules/random/dist/random.js":
/*!********************************************!*\
  !*** ./node_modules/random/dist/random.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RNGFactory = exports.RNG = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _owLite = __webpack_require__(/*! ow-lite */ "./node_modules/ow-lite/index.js");

var _owLite2 = _interopRequireDefault(_owLite);

var _rng = __webpack_require__(/*! ./rng */ "./node_modules/random/dist/rng.js");

var _rng2 = _interopRequireDefault(_rng);

var _rngFactory = __webpack_require__(/*! ./rng-factory */ "./node_modules/random/dist/rng-factory.js");

var _rngFactory2 = _interopRequireDefault(_rngFactory);

var _uniform2 = __webpack_require__(/*! ./distributions/uniform */ "./node_modules/random/dist/distributions/uniform.js");

var _uniform3 = _interopRequireDefault(_uniform2);

var _uniformInt2 = __webpack_require__(/*! ./distributions/uniform-int */ "./node_modules/random/dist/distributions/uniform-int.js");

var _uniformInt3 = _interopRequireDefault(_uniformInt2);

var _uniformBoolean2 = __webpack_require__(/*! ./distributions/uniform-boolean */ "./node_modules/random/dist/distributions/uniform-boolean.js");

var _uniformBoolean3 = _interopRequireDefault(_uniformBoolean2);

var _normal2 = __webpack_require__(/*! ./distributions/normal */ "./node_modules/random/dist/distributions/normal.js");

var _normal3 = _interopRequireDefault(_normal2);

var _logNormal2 = __webpack_require__(/*! ./distributions/log-normal */ "./node_modules/random/dist/distributions/log-normal.js");

var _logNormal3 = _interopRequireDefault(_logNormal2);

var _bernoulli2 = __webpack_require__(/*! ./distributions/bernoulli */ "./node_modules/random/dist/distributions/bernoulli.js");

var _bernoulli3 = _interopRequireDefault(_bernoulli2);

var _binomial2 = __webpack_require__(/*! ./distributions/binomial */ "./node_modules/random/dist/distributions/binomial.js");

var _binomial3 = _interopRequireDefault(_binomial2);

var _geometric2 = __webpack_require__(/*! ./distributions/geometric */ "./node_modules/random/dist/distributions/geometric.js");

var _geometric3 = _interopRequireDefault(_geometric2);

var _poisson2 = __webpack_require__(/*! ./distributions/poisson */ "./node_modules/random/dist/distributions/poisson.js");

var _poisson3 = _interopRequireDefault(_poisson2);

var _exponential2 = __webpack_require__(/*! ./distributions/exponential */ "./node_modules/random/dist/distributions/exponential.js");

var _exponential3 = _interopRequireDefault(_exponential2);

var _irwinHall2 = __webpack_require__(/*! ./distributions/irwin-hall */ "./node_modules/random/dist/distributions/irwin-hall.js");

var _irwinHall3 = _interopRequireDefault(_irwinHall2);

var _bates2 = __webpack_require__(/*! ./distributions/bates */ "./node_modules/random/dist/distributions/bates.js");

var _bates3 = _interopRequireDefault(_bates2);

var _pareto2 = __webpack_require__(/*! ./distributions/pareto */ "./node_modules/random/dist/distributions/pareto.js");

var _pareto3 = _interopRequireDefault(_pareto2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.RNG = _rng2.default;
exports.RNGFactory = _rngFactory2.default;

/**
 * Seedable random number generator supporting many common distributions.
 *
 * Defaults to Math.random as its underlying pseudorandom number generator.
 *
 * @name Random
 * @class
 *
 * @param {RNG|function} [rng=Math.random] - Underlying pseudorandom number generator.
 */

var Random = function () {
  function Random(rng) {
    _classCallCheck(this, Random);

    if (rng) (0, _owLite2.default)(rng, _owLite2.default.object.instanceOf(_rng2.default));

    this._cache = {};
    this.use(rng);
  }

  /**
   * @member {RNG} Underlying pseudo-random number generator
   */


  _createClass(Random, [{
    key: 'clone',


    /**
     * Creates a new `Random` instance, optionally specifying parameters to
     * set a new seed.
     *
     * @see RNG.clone
     *
     * @param {string} [seed] - Optional seed for new RNG.
     * @param {object} [opts] - Optional config for new RNG options.
     * @return {Random}
     */
    value: function clone() {
      if (arguments.length) {
        return new Random(_rngFactory2.default.apply(undefined, arguments));
      } else {
        return new Random(this.rng.clone());
      }
    }

    /**
     * Sets the underlying pseudorandom number generator used via
     * either an instance of `seedrandom`, a custom instance of RNG
     * (for PRNG plugins), or a string specifying the PRNG to use
     * along with an optional `seed` and `opts` to initialize the
     * RNG.
     *
     * @example
     * const random = require('random')
     *
     * random.use('example_seedrandom_string')
     * // or
     * random.use(seedrandom('kittens'))
     * // or
     * random.use(Math.random)
     *
     * @param {...*} args
     */

  }, {
    key: 'use',
    value: function use() {
      this._rng = _rngFactory2.default.apply(undefined, arguments);
    }

    /**
     * Patches `Math.random` with this Random instance's PRNG.
     */

  }, {
    key: 'patch',
    value: function patch() {
      if (this._patch) {
        throw new Error('Math.random already patched');
      }

      this._patch = Math.random;
      Math.random = this.uniform();
    }

    /**
     * Restores a previously patched `Math.random` to its original value.
     */

  }, {
    key: 'unpatch',
    value: function unpatch() {
      if (this._patch) {
        Math.random = this._patch;
        delete this._patch;
      }
    }

    // --------------------------------------------------------------------------
    // Uniform utility functions
    // --------------------------------------------------------------------------

    /**
     * Convenience wrapper around `this.rng.next()`
     *
     * Returns a floating point number in [0, 1).
     *
     * @return {number}
     */

  }, {
    key: 'next',
    value: function next() {
      return this._rng.next();
    }

    /**
     * Samples a uniform random floating point number, optionally specifying
     * lower and upper bounds.
     *
     * Convence wrapper around `random.uniform()`
     *
     * @param {number} [min=0] - Lower bound (float, inclusive)
     * @param {number} [max=1] - Upper bound (float, exclusive)
     * @return {number}
     */

  }, {
    key: 'float',
    value: function float(min, max) {
      return this.uniform(min, max)();
    }

    /**
     * Samples a uniform random integer, optionally specifying lower and upper
     * bounds.
     *
     * Convence wrapper around `random.uniformInt()`
     *
     * @param {number} [min=0] - Lower bound (integer, inclusive)
     * @param {number} [max=1] - Upper bound (integer, inclusive)
     * @return {number}
     */

  }, {
    key: 'int',
    value: function int(min, max) {
      return this.uniformInt(min, max)();
    }

    /**
     * Samples a uniform random integer, optionally specifying lower and upper
     * bounds.
     *
     * Convence wrapper around `random.uniformInt()`
     *
     * @alias `random.int`
     *
     * @param {number} [min=0] - Lower bound (integer, inclusive)
     * @param {number} [max=1] - Upper bound (integer, inclusive)
     * @return {number}
     */

  }, {
    key: 'integer',
    value: function integer(min, max) {
      return this.uniformInt(min, max)();
    }

    /**
     * Samples a uniform random boolean value.
     *
     * Convence wrapper around `random.uniformBoolean()`
     *
     * @alias `random.boolean`
     *
     * @return {boolean}
     */

  }, {
    key: 'bool',
    value: function bool() {
      return this.uniformBoolean()();
    }

    /**
     * Samples a uniform random boolean value.
     *
     * Convence wrapper around `random.uniformBoolean()`
     *
     * @return {boolean}
     */

  }, {
    key: 'boolean',
    value: function boolean() {
      return this.uniformBoolean()();
    }

    // --------------------------------------------------------------------------
    // Uniform distributions
    // --------------------------------------------------------------------------

    /**
     * Generates a [Continuous uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)).
     *
     * @param {number} [min=0] - Lower bound (float, inclusive)
     * @param {number} [max=1] - Upper bound (float, exclusive)
     * @return {function}
     */

  }, {
    key: 'uniform',
    value: function uniform(min, max) {
      return this._memoize('uniform', _uniform3.default, min, max);
    }

    /**
     * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).
     *
     * @param {number} [min=0] - Lower bound (integer, inclusive)
     * @param {number} [max=1] - Upper bound (integer, inclusive)
     * @return {function}
     */

  }, {
    key: 'uniformInt',
    value: function uniformInt(min, max) {
      return this._memoize('uniformInt', _uniformInt3.default, min, max);
    }

    /**
     * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution),
     * with two possible outcomes, `true` or `false.
     *
     * This method is analogous to flipping a coin.
     *
     * @return {function}
     */

  }, {
    key: 'uniformBoolean',
    value: function uniformBoolean() {
      return this._memoize('uniformBoolean', _uniformBoolean3.default);
    }

    // --------------------------------------------------------------------------
    // Normal distributions
    // --------------------------------------------------------------------------

    /**
     * Generates a [Normal distribution](https://en.wikipedia.org/wiki/Normal_distribution).
     *
     * @param {number} [mu=0] - Mean
     * @param {number} [sigma=1] - Standard deviation
     * @return {function}
     */

  }, {
    key: 'normal',
    value: function normal(mu, sigma) {
      return (0, _normal3.default)(this, mu, sigma);
    }

    /**
     * Generates a [Log-normal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution).
     *
     * @param {number} [mu=0] - Mean of underlying normal distribution
     * @param {number} [sigma=1] - Standard deviation of underlying normal distribution
     * @return {function}
     */

  }, {
    key: 'logNormal',
    value: function logNormal(mu, sigma) {
      return (0, _logNormal3.default)(this, mu, sigma);
    }

    // --------------------------------------------------------------------------
    // Bernoulli distributions
    // --------------------------------------------------------------------------

    /**
     * Generates a [Bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution).
     *
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */

  }, {
    key: 'bernoulli',
    value: function bernoulli(p) {
      return (0, _bernoulli3.default)(this, p);
    }

    /**
     * Generates a [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution).
     *
     * @param {number} [n=1] - Number of trials.
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */

  }, {
    key: 'binomial',
    value: function binomial(n, p) {
      return (0, _binomial3.default)(this, n, p);
    }

    /**
     * Generates a [Geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution).
     *
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */

  }, {
    key: 'geometric',
    value: function geometric(p) {
      return (0, _geometric3.default)(this, p);
    }

    // --------------------------------------------------------------------------
    // Poisson distributions
    // --------------------------------------------------------------------------

    /**
     * Generates a [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution).
     *
     * @param {number} [lambda=1] - Mean (lambda > 0)
     * @return {function}
     */

  }, {
    key: 'poisson',
    value: function poisson(lambda) {
      return (0, _poisson3.default)(this, lambda);
    }

    /**
     * Generates an [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).
     *
     * @param {number} [lambda=1] - Inverse mean (lambda > 0)
     * @return {function}
     */

  }, {
    key: 'exponential',
    value: function exponential(lambda) {
      return (0, _exponential3.default)(this, lambda);
    }

    // --------------------------------------------------------------------------
    // Misc distributions
    // --------------------------------------------------------------------------

    /**
     * Generates an [Irwin Hall distribution](https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution).
     *
     * @param {number} [n=1] - Number of uniform samples to sum (n >= 0)
     * @return {function}
     */

  }, {
    key: 'irwinHall',
    value: function irwinHall(n) {
      return (0, _irwinHall3.default)(this, n);
    }

    /**
     * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
     *
     * @param {number} [n=1] - Number of uniform samples to average (n >= 1)
     * @return {function}
     */

  }, {
    key: 'bates',
    value: function bates(n) {
      return (0, _bates3.default)(this, n);
    }

    /**
     * Generates a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution).
     *
     * @param {number} [alpha=1] - Alpha
     * @return {function}
     */

  }, {
    key: 'pareto',
    value: function pareto(alpha) {
      return (0, _pareto3.default)(this, alpha);
    }

    // --------------------------------------------------------------------------
    // Internal
    // --------------------------------------------------------------------------

    /**
     * Memoizes distributions to ensure they're only created when necessary.
     *
     * Returns a thunk which that returns independent, identically distributed
     * samples from the specified distribution.
     *
     * @private
     *
     * @param {string} label - Name of distribution
     * @param {function} getter - Function which generates a new distribution
     * @param {...*} args - Distribution-specific arguments
     *
     * @return {function}
     */

  }, {
    key: '_memoize',
    value: function _memoize(label, getter) {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      var key = '' + args.join(';');
      var value = this._cache[label];

      if (value === undefined || value.key !== key) {
        value = { key: key, distribution: getter.apply(undefined, [this].concat(args)) };
        this._cache[label] = value;
      }

      return value.distribution;
    }
  }, {
    key: 'rng',
    get: function get() {
      return this._rng;
    }
  }]);

  return Random;
}();

// defaults to Math.random as its RNG


exports.default = new Random();
//# sourceMappingURL=random.js.map

/***/ }),

/***/ "./node_modules/random/dist/rng-factory.js":
/*!*************************************************!*\
  !*** ./node_modules/random/dist/rng-factory.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _seedrandom = __webpack_require__(/*! seedrandom */ "./node_modules/seedrandom/index.js");

var _seedrandom2 = _interopRequireDefault(_seedrandom);

var _rng = __webpack_require__(/*! ./rng */ "./node_modules/random/dist/rng.js");

var _rng2 = _interopRequireDefault(_rng);

var _function = __webpack_require__(/*! ./generators/function */ "./node_modules/random/dist/generators/function.js");

var _function2 = _interopRequireDefault(_function);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var _args$ = args[0],
      arg0 = _args$ === undefined ? 'default' : _args$,
      rest = args.slice(1);


  switch (typeof arg0 === 'undefined' ? 'undefined' : _typeof(arg0)) {
    case 'object':
      if (arg0 instanceof _rng2.default) {
        return arg0;
      }
      break;

    case 'function':
      return new _function2.default(arg0);

    case 'string':
    case 'number':
      return new _function2.default(_seedrandom2.default.apply(undefined, _toConsumableArray(rest)));
  }

  throw new Error('invalid RNG "' + arg0 + '"');
};
//# sourceMappingURL=rng-factory.js.map

/***/ }),

/***/ "./node_modules/random/dist/rng.js":
/*!*****************************************!*\
  !*** ./node_modules/random/dist/rng.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RNG = function () {
  function RNG() {
    _classCallCheck(this, RNG);
  }

  _createClass(RNG, [{
    key: 'next',
    value: function next() {
      throw new Error('RNG.next must be overridden');
    }
  }, {
    key: 'seed',
    value: function seed(_seed, opts) {
      throw new Error('RNG.seed must be overridden');
    }
  }, {
    key: 'clone',
    value: function clone(seed, opts) {
      throw new Error('RNG.clone must be overridden');
    }
  }, {
    key: '_seed',
    value: function _seed(seed, opts) {
      // TODO: add entropy and stuff

      if (seed === (seed | 0)) {
        return seed;
      } else {
        var strSeed = '' + seed;
        var s = 0;

        for (var k = 0; k < strSeed.length; ++k) {
          s ^= strSeed.charCodeAt(k) | 0;
        }

        return s;
      }
    }
  }, {
    key: 'name',
    get: function get() {
      throw new Error('RNG.name must be overridden');
    }
  }]);

  return RNG;
}();

exports.default = RNG;
//# sourceMappingURL=rng.js.map

/***/ }),

/***/ "./node_modules/random/index.js":
/*!**************************************!*\
  !*** ./node_modules/random/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./dist/random */ "./node_modules/random/dist/random.js").default


/***/ }),

/***/ "./node_modules/seedrandom/index.js":
/*!******************************************!*\
  !*** ./node_modules/seedrandom/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__(/*! ./lib/alea */ "./node_modules/seedrandom/lib/alea.js");

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__(/*! ./lib/xor128 */ "./node_modules/seedrandom/lib/xor128.js");

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__(/*! ./lib/xorwow */ "./node_modules/seedrandom/lib/xorwow.js");

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__(/*! ./lib/xorshift7 */ "./node_modules/seedrandom/lib/xorshift7.js");

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__(/*! ./lib/xor4096 */ "./node_modules/seedrandom/lib/xor4096.js");

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__(/*! ./lib/tychei */ "./node_modules/seedrandom/lib/tychei.js");

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__(/*! ./seedrandom */ "./node_modules/seedrandom/seedrandom.js");

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;


/***/ }),

/***/ "./node_modules/seedrandom/lib/alea.js":
/*!*********************************************!*\
  !*** ./node_modules/seedrandom/lib/alea.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = String(data);
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.alea = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/tychei.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/tychei.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.tychei = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xor128.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xor128.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor128 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xor4096.js":
/*!************************************************!*\
  !*** ./node_modules/seedrandom/lib/xor4096.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xorshift7.js":
/*!**************************************************!*\
  !*** ./node_modules/seedrandom/lib/xorshift7.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorshift7 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xorwow.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xorwow.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorwow = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/seedrandom.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/seedrandom.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
Copyright 2019 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (global, pool, math) {
//
// The following constants are related to IEEE 754 limits.
//

var width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ( true && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = __webpack_require__(/*! crypto */ 3);
  } catch (ex) {}
} else if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return seedrandom; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}


// End anonymous scope, and pass initial values.
})(
  // global: `self` in browsers (including strict mode and web workers),
  // otherwise `this` in Node and other environments
  (typeof self !== 'undefined') ? self : this,
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-define.js":
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/app/three-optimized/components/instance-optimized/instance-optimized.component.ngfactory.js":
/*!*********************************************************************************************************!*\
  !*** ./src/app/three-optimized/components/instance-optimized/instance-optimized.component.ngfactory.js ***!
  \*********************************************************************************************************/
/*! exports provided: RenderType_InstanceOptimizedComponent, View_InstanceOptimizedComponent_0, View_InstanceOptimizedComponent_Host_0, InstanceOptimizedComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_InstanceOptimizedComponent", function() { return RenderType_InstanceOptimizedComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_InstanceOptimizedComponent_0", function() { return View_InstanceOptimizedComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_InstanceOptimizedComponent_Host_0", function() { return View_InstanceOptimizedComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstanceOptimizedComponentNgFactory", function() { return InstanceOptimizedComponentNgFactory; });
/* harmony import */ var _instance_optimized_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instance-optimized.component.scss.shim.ngstyle */ "./src/app/three-optimized/components/instance-optimized/instance-optimized.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _instance_optimized_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instance-optimized.component */ "./src/app/three-optimized/components/instance-optimized/instance-optimized.component.ts");
/* harmony import */ var _three_services_three_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../three/services/three.service */ "./src/app/three/services/three.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




var styles_InstanceOptimizedComponent = [_instance_optimized_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_InstanceOptimizedComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_InstanceOptimizedComponent, data: {} });

function View_InstanceOptimizedComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { canvasEl: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 2, { statsEl: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, [[2, 0], ["stats", 1]], null, 11, "section", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Instancing and Ray-cast click event"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](6, null, ["Render calls :", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](8, null, ["Object Count :", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 1, "div", [["class", "app--margin__vertical object-range"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 0, "input", [["id", "points"], ["max", "10000"], ["min", "10"], ["name", "points"], ["step", "100"], ["type", "range"]], [[8, "value", 0]], [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.objectCountChangeHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 1, "div", [["class", "app--margin__vertical stats"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Stats enabled"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, [[1, 0], ["canvasEl", 1]], null, 0, "canvas", [["height", "500"], ["width", "1000"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.clickHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.renderCalls; _ck(_v, 6, 0, currVal_0); var currVal_1 = _co.objectCount; _ck(_v, 8, 0, currVal_1); var currVal_2 = _co.objectCount; _ck(_v, 10, 0, currVal_2); }); }
function View_InstanceOptimizedComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-instance-optimized", [], null, null, null, View_InstanceOptimizedComponent_0, RenderType_InstanceOptimizedComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _instance_optimized_component__WEBPACK_IMPORTED_MODULE_2__["InstanceOptimizedComponent"], [_three_services_three_service__WEBPACK_IMPORTED_MODULE_3__["ThreeService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var InstanceOptimizedComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-instance-optimized", _instance_optimized_component__WEBPACK_IMPORTED_MODULE_2__["InstanceOptimizedComponent"], View_InstanceOptimizedComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/three-optimized/components/instance-optimized/instance-optimized.component.scss.shim.ngstyle.js":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/three-optimized/components/instance-optimized/instance-optimized.component.scss.shim.ngstyle.js ***!
  \*****************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RocmVlLW9wdGltaXplZC9jb21wb25lbnRzL2luc3RhbmNlLW9wdGltaXplZC9pbnN0YW5jZS1vcHRpbWl6ZWQuY29tcG9uZW50LnNjc3MifQ== */"];



/***/ }),

/***/ "./src/app/three-optimized/components/instance-optimized/instance-optimized.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/three-optimized/components/instance-optimized/instance-optimized.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: InstanceOptimizedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstanceOptimizedComponent", function() { return InstanceOptimizedComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/stats.js/build/stats.min.js */ "./node_modules/stats.js/build/stats.min.js");
/* harmony import */ var _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_2__);



class InstanceOptimizedComponent {
    constructor(threeService) {
        this.threeService = threeService;
        this.objectCount = 1000;
        this.renderCalls = 0;
        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_1__["Raycaster"]();
        this.color = new three__WEBPACK_IMPORTED_MODULE_1__["Color"]();
    }
    ngOnInit() {
        this.loadGeometry();
    }
    ngAfterViewInit() {
        this.setUpStats();
        this.threeCommon = this.threeService.getThreeCommon(this.canvasEl.nativeElement);
        this.threeCommon.camera.position.z = 20;
        this.threeCommon.camera.aspect =
            this.canvasEl.nativeElement.offsetWidth /
                this.canvasEl.nativeElement.offsetHeight;
        this.threeCommon.renderer.setPixelRatio(window.devicePixelRatio);
        this.threeCommon.camera.updateProjectionMatrix();
    }
    setUpStats() {
        this.stats = new _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_2__();
        this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
        this.statsEl.nativeElement.appendChild(this.stats.dom);
        this.stats.domElement.style.position = "absolute";
        this.stats.domElement.style.left = "0px";
        this.stats.domElement.style.top = "0px";
    }
    loadGeometry() {
        const loader = new three__WEBPACK_IMPORTED_MODULE_1__["BufferGeometryLoader"]();
        loader.load("assets/custom/geometry2.json", (geometry) => {
            this.geometry = geometry;
            this.drawInstanceMesh();
            this.renderView();
        });
    }
    drawInstanceMesh() {
        this.clean();
        const material = new three__WEBPACK_IMPORTED_MODULE_1__["MeshNormalMaterial"]();
        this.geometry.computeVertexNormals();
        const matrix = new three__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]();
        this.mesh = new three__WEBPACK_IMPORTED_MODULE_1__["InstancedMesh"](this.geometry, material, this.objectCount);
        for (var i = 0; i < this.objectCount; i++) {
            this.randomizeMatrix(matrix);
            this.mesh.setMatrixAt(i, matrix);
        }
        this.threeCommon.scene.add(this.mesh);
    }
    objectCountChangeHandler($event) {
        this.objectCount = Number.parseInt($event.target.value, 10);
        this.drawInstanceMesh();
    }
    clean() {
        var meshes = [];
        this.threeCommon.scene.traverse(function (object) {
            if (object.isMesh)
                meshes.push(object);
        });
        for (var i = 0; i < meshes.length; i++) {
            var mesh = meshes[i];
            mesh.material.dispose();
            mesh.geometry.dispose();
            this.threeCommon.scene.remove(mesh);
        }
    }
    randomizeMatrix(matrix) {
        var position = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
        var rotation = new three__WEBPACK_IMPORTED_MODULE_1__["Euler"]();
        var quaternion = new three__WEBPACK_IMPORTED_MODULE_1__["Quaternion"]();
        var scale = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
        position.x = Math.random() * 40 - 20;
        position.y = Math.random() * 40 - 20;
        position.z = Math.random() * 40 - 20;
        rotation.x = Math.random() * 2 * Math.PI;
        rotation.y = Math.random() * 2 * Math.PI;
        rotation.z = Math.random() * 2 * Math.PI;
        quaternion.setFromEuler(rotation);
        scale.x = scale.y = scale.z = Math.random() * 1;
        matrix.compose(position, quaternion, scale);
    }
    renderView() {
        if (this.mouse) {
            this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);
        }
        var intersection = this.raycaster.intersectObject(this.mesh);
        if (intersection.length > 0) {
            var rotationMatrix = new three__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]().makeRotationY(0.2);
            var instanceMatrix = new three__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]();
            var instanceId = intersection[0].instanceId;
            const matrix = new three__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]();
            this.mesh.getMatrixAt(intersection[0].instanceId, instanceMatrix);
            matrix.multiplyMatrices(instanceMatrix, rotationMatrix);
            this.mesh.setMatrixAt(intersection[0].instanceId, matrix);
            this.mesh.instanceMatrix.needsUpdate = true;
        }
        this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera);
        this.threeCommon.controls.update();
        this.stats.update();
        window.requestAnimationFrame(this.renderView.bind(this));
        this.renderCalls = this.threeCommon.renderer.info.render.calls;
    }
    clickHandler(event) {
        event.preventDefault();
        let canvasBounds = this.threeCommon.renderer.context.canvas.getBoundingClientRect();
        this.mouse = this.mouse || new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
        this.mouse.x =
            ((event.clientX - canvasBounds.left) /
                (canvasBounds.right - canvasBounds.left)) *
                2 -
                1;
        this.mouse.y =
            -((event.clientY - canvasBounds.top) /
                (canvasBounds.bottom - canvasBounds.top)) *
                2 +
                1;
    }
    ngOnDestroy() {
        this.threeService.cleanScene(this.threeCommon);
        this.statsEl.nativeElement.removeChild(this.stats.dom);
    }
}


/***/ }),

/***/ "./src/app/three-optimized/components/instanced-layout/instanced-layout.component.ngfactory.js":
/*!*****************************************************************************************************!*\
  !*** ./src/app/three-optimized/components/instanced-layout/instanced-layout.component.ngfactory.js ***!
  \*****************************************************************************************************/
/*! exports provided: RenderType_InstancedLayoutComponent, View_InstancedLayoutComponent_0, View_InstancedLayoutComponent_Host_0, InstancedLayoutComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_InstancedLayoutComponent", function() { return RenderType_InstancedLayoutComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_InstancedLayoutComponent_0", function() { return View_InstancedLayoutComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_InstancedLayoutComponent_Host_0", function() { return View_InstancedLayoutComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstancedLayoutComponentNgFactory", function() { return InstancedLayoutComponentNgFactory; });
/* harmony import */ var _instanced_layout_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanced-layout.component.scss.shim.ngstyle */ "./src/app/three-optimized/components/instanced-layout/instanced-layout.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _instanced_layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instanced-layout.component */ "./src/app/three-optimized/components/instanced-layout/instanced-layout.component.ts");
/* harmony import */ var _three_services_three_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../three/services/three.service */ "./src/app/three/services/three.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




var styles_InstancedLayoutComponent = [_instanced_layout_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_InstancedLayoutComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_InstancedLayoutComponent, data: {} });

function View_InstancedLayoutComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { canvasEl: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Instancing spheres as nodes in geometric layout"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](4, null, ["renderer calls count : ", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](6, null, ["Object Count :", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 1, "div", [["class", "app--margin__vertical object-range"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 0, "input", [["id", "points"], ["max", "100"], ["min", "3"], ["name", "points"], ["step", "1"], ["type", "range"]], [[8, "value", 0]], [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.objectCountChangeHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, [[1, 0], ["canvasEl", 1]], null, 0, "canvas", [["height", "500"], ["width", "860"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.clickHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.renderCalls; _ck(_v, 4, 0, currVal_0); var currVal_1 = _co.objectCount; _ck(_v, 6, 0, currVal_1); var currVal_2 = _co.objectCount; _ck(_v, 8, 0, currVal_2); }); }
function View_InstancedLayoutComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-instanced-layout", [], null, null, null, View_InstancedLayoutComponent_0, RenderType_InstancedLayoutComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _instanced_layout_component__WEBPACK_IMPORTED_MODULE_2__["InstancedLayoutComponent"], [_three_services_three_service__WEBPACK_IMPORTED_MODULE_3__["ThreeService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var InstancedLayoutComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-instanced-layout", _instanced_layout_component__WEBPACK_IMPORTED_MODULE_2__["InstancedLayoutComponent"], View_InstancedLayoutComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/three-optimized/components/instanced-layout/instanced-layout.component.scss.shim.ngstyle.js":
/*!*************************************************************************************************************!*\
  !*** ./src/app/three-optimized/components/instanced-layout/instanced-layout.component.scss.shim.ngstyle.js ***!
  \*************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RocmVlLW9wdGltaXplZC9jb21wb25lbnRzL2luc3RhbmNlZC1sYXlvdXQvaW5zdGFuY2VkLWxheW91dC5jb21wb25lbnQuc2NzcyJ9 */"];



/***/ }),

/***/ "./src/app/three-optimized/components/instanced-layout/instanced-layout.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/three-optimized/components/instanced-layout/instanced-layout.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: InstancedLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstancedLayoutComponent", function() { return InstancedLayoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/stats.js/build/stats.min.js */ "./node_modules/stats.js/build/stats.min.js");
/* harmony import */ var _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../../../node_modules/three/examples/jsm/loaders/OBJLoader */ "./node_modules/three/examples/jsm/loaders/OBJLoader.js");





class InstancedLayoutComponent {
    constructor(threeService) {
        this.threeService = threeService;
        this.objectCount = 3;
        this.vertices = [];
        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_1__["Raycaster"]();
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.threeCommon = this.threeService.getThreeCommon(this.canvasEl.nativeElement);
        this.setUpStats();
        this.threeCommon.camera.position.z = 25;
        this.constructLayout();
        this.loadGeometry();
    }
    constructLayout() {
        if (this.objectCount <= 6) {
            this.layoutGeometry = new three__WEBPACK_IMPORTED_MODULE_1__["ConeGeometry"](10, 10, this.objectCount - 1);
        }
        else if (this.objectCount <= 12) {
            this.layoutGeometry = new three__WEBPACK_IMPORTED_MODULE_1__["IcosahedronGeometry"](10, 0);
        }
        else {
            this.layoutGeometry = new three__WEBPACK_IMPORTED_MODULE_1__["SphereGeometry"](15, 12, 10);
        }
        const material = new three__WEBPACK_IMPORTED_MODULE_1__["MeshBasicMaterial"]({
            color: "red",
            wireframe: true,
        });
        const mesh = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](this.layoutGeometry, material);
        this.threeCommon.scene.add(mesh);
    }
    loadGeometry() {
        const objLoader = new _node_modules_three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_3__["OBJLoader"]();
        objLoader
            .loadAsync("assets/node-spheres/sphere.obj")
            .then((res) => {
            this.object = res;
            this.geometry = res.children[0].geometry;
            this.sceneController();
        })
            .catch((e) => console.log(e));
    }
    sceneController() {
        const material = new three__WEBPACK_IMPORTED_MODULE_1__["MeshNormalMaterial"]();
        this.geometry.computeVertexNormals();
        this.mesh = new three__WEBPACK_IMPORTED_MODULE_1__["InstancedMesh"](this.geometry, material, this.objectCount);
        for (var i = 0; i < this.objectCount; i++) {
            this.mesh.setMatrixAt(i, this.setPositionFromLayout(i));
        }
        this.threeCommon.scene.add(this.mesh);
        this.renderView();
    }
    setPositionFromLayout(i) {
        const matrix = new three__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]();
        var position = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
        var rotation = new three__WEBPACK_IMPORTED_MODULE_1__["Euler"]();
        var quaternion = new three__WEBPACK_IMPORTED_MODULE_1__["Quaternion"]();
        var scale = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
        if (!this.layoutGeometry.vertices[i]) {
            console.log("no vertex for index", i);
        }
        let step = Math.floor(this.layoutGeometry.vertices.length / this.objectCount);
        position = this.layoutGeometry.vertices[i];
        // rotation.x = Math.random() * 2 * Math.PI;
        // rotation.y = Math.random() * 2 * Math.PI;
        // rotation.z = Math.random() * 2 * Math.PI;
        quaternion.setFromEuler(rotation);
        scale.x = scale.y = scale.z = 1;
        matrix.compose(position, quaternion, scale);
        return matrix;
    }
    randomizeMatrix(matrix, i) {
        var position = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
        var rotation = new three__WEBPACK_IMPORTED_MODULE_1__["Euler"]();
        var quaternion = new three__WEBPACK_IMPORTED_MODULE_1__["Quaternion"]();
        var scale = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
        position.x = Math.random() * 40 - 20;
        position.y = Math.random() * 40 - 20;
        position.z = Math.random() * 40 - 20;
        rotation.x = Math.random() * 2 * Math.PI;
        rotation.y = Math.random() * 2 * Math.PI;
        rotation.z = Math.random() * 2 * Math.PI;
        quaternion.setFromEuler(rotation);
        scale.x = scale.y = scale.z = 1;
        matrix.compose(position, quaternion, scale);
    }
    destroyMesh() {
        var meshes = [];
        this.threeCommon.scene.traverse(function (object) {
            if (object.isMesh)
                meshes.push(object);
        });
        for (var i = 0; i < meshes.length; i++) {
            var mesh = meshes[i];
            mesh.material.dispose();
            mesh.geometry.dispose();
            this.threeCommon.scene.remove(mesh);
        }
    }
    objectCountChangeHandler($event) {
        this.objectCount = Number.parseInt($event.target.value, 10);
        this.destroyMesh();
        this.constructLayout();
        this.sceneController();
    }
    clickHandler(event) {
        event.preventDefault();
        let canvasBounds = this.threeCommon.renderer.context.canvas.getBoundingClientRect();
        this.mouse = this.mouse || new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
        this.mouse.x =
            ((event.clientX - canvasBounds.left) /
                (canvasBounds.right - canvasBounds.left)) *
                2 -
                1;
        this.mouse.y =
            -((event.clientY - canvasBounds.top) /
                (canvasBounds.bottom - canvasBounds.top)) *
                2 +
                1;
    }
    setUpStats() {
        this.stats = new _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_2__();
        this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);
    }
    renderView() {
        if (this.mouse) {
            this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);
        }
        var intersection = this.raycaster.intersectObject(this.mesh);
        if (intersection.length > 0) {
            var rotationMatrix = new three__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]().makeRotationY(0.3);
            var instanceMatrix = new three__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]();
            var instanceId = intersection[0].instanceId;
            const matrix = new three__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]();
            this.mesh.getMatrixAt(intersection[0].instanceId, instanceMatrix);
            matrix.multiplyMatrices(instanceMatrix, rotationMatrix);
            this.mesh.setMatrixAt(intersection[0].instanceId, matrix);
            this.mesh.instanceMatrix.needsUpdate = true;
        }
        this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera);
        this.threeCommon.controls.update();
        this.stats.update();
        this.renderCalls = this.threeService.getRendererCallCount(this.threeCommon.renderer);
        window.requestAnimationFrame(this.renderView.bind(this));
    }
    ngOnDestroy() {
        this.threeService.cleanScene(this.threeCommon);
    }
}


/***/ }),

/***/ "./src/app/three-optimized/components/instanced-spheres/instanced-spheres.component.ngfactory.js":
/*!*******************************************************************************************************!*\
  !*** ./src/app/three-optimized/components/instanced-spheres/instanced-spheres.component.ngfactory.js ***!
  \*******************************************************************************************************/
/*! exports provided: RenderType_InstancedSpheresComponent, View_InstancedSpheresComponent_0, View_InstancedSpheresComponent_Host_0, InstancedSpheresComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_InstancedSpheresComponent", function() { return RenderType_InstancedSpheresComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_InstancedSpheresComponent_0", function() { return View_InstancedSpheresComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_InstancedSpheresComponent_Host_0", function() { return View_InstancedSpheresComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstancedSpheresComponentNgFactory", function() { return InstancedSpheresComponentNgFactory; });
/* harmony import */ var _instanced_spheres_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanced-spheres.component.scss.shim.ngstyle */ "./src/app/three-optimized/components/instanced-spheres/instanced-spheres.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _instanced_spheres_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instanced-spheres.component */ "./src/app/three-optimized/components/instanced-spheres/instanced-spheres.component.ts");
/* harmony import */ var _three_services_three_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../three/services/three.service */ "./src/app/three/services/three.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




var styles_InstancedSpheresComponent = [_instanced_spheres_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_InstancedSpheresComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_InstancedSpheresComponent, data: {} });

function View_InstancedSpheresComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { canvasEl: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Instances using shaders without instance mesh"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, [[1, 0], ["canvasEl", 1]], null, 0, "canvas", [["height", "500"], ["width", "1000"]], null, null, null, null, null))], null, null); }
function View_InstancedSpheresComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-instanced-spheres", [], null, null, null, View_InstancedSpheresComponent_0, RenderType_InstancedSpheresComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _instanced_spheres_component__WEBPACK_IMPORTED_MODULE_2__["InstancedSpheresComponent"], [_three_services_three_service__WEBPACK_IMPORTED_MODULE_3__["ThreeService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var InstancedSpheresComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-instanced-spheres", _instanced_spheres_component__WEBPACK_IMPORTED_MODULE_2__["InstancedSpheresComponent"], View_InstancedSpheresComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/three-optimized/components/instanced-spheres/instanced-spheres.component.scss.shim.ngstyle.js":
/*!***************************************************************************************************************!*\
  !*** ./src/app/three-optimized/components/instanced-spheres/instanced-spheres.component.scss.shim.ngstyle.js ***!
  \***************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RocmVlLW9wdGltaXplZC9jb21wb25lbnRzL2luc3RhbmNlZC1zcGhlcmVzL2luc3RhbmNlZC1zcGhlcmVzLmNvbXBvbmVudC5zY3NzIn0= */"];



/***/ }),

/***/ "./src/app/three-optimized/components/instanced-spheres/instanced-spheres.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/three-optimized/components/instanced-spheres/instanced-spheres.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: InstancedSpheresComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstancedSpheresComponent", function() { return InstancedSpheresComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var random__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! random */ "./node_modules/random/index.js");
/* harmony import */ var random__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(random__WEBPACK_IMPORTED_MODULE_2__);



class InstancedSpheresComponent {
    constructor(threeService) {
        this.threeService = threeService;
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.threeCommon = this.threeService.getThreeCommon(this.canvasEl.nativeElement);
        this.threeCommon.camera.position.z = 50;
        this.sceneController();
    }
    sceneController() {
        this.configureShaders();
        let baseGeometry = new three__WEBPACK_IMPORTED_MODULE_1__["SphereBufferGeometry"](3);
        this.instancedGeometry = new three__WEBPACK_IMPORTED_MODULE_1__["InstancedBufferGeometry"]().copy(baseGeometry);
        this.instanceCount = 7000;
        this.instancedGeometry.instanceCount = this.instanceCount;
        let material = new three__WEBPACK_IMPORTED_MODULE_1__["ShaderMaterial"]({
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader,
            uniforms: {
                uTime: new three__WEBPACK_IMPORTED_MODULE_1__["Uniform"](0),
            },
        });
        let mesh = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](this.instancedGeometry, material);
        this.threeCommon.scene.add(mesh);
        this.configureInstanceAttributes();
        this.renderView();
    }
    configureShaders() {
        this.vertexShader = `
    #define PI (3.14159265358979323846)
    attribute vec4 aCurve;
    uniform float uTime;

    attribute vec3 aColor;
    varying vec3 vColor;

    vec3 getCurvePosition(float progress, float radius, float offset){
      vec3 pos = vec3(0.);
      pos.x += cos(progress *PI *8.) * radius ;
      pos.y += sin(progress *PI *8.) * radius + sin(progress * PI *2.) * 30.;
      pos.z += progress *200. - 200./2. + offset;
      return pos;
    }
    void main(){
      vec3 transformed = position;
      
      // 2. Extract values from attribute
      float aRadius = aCurve.x;
      float aZOffset = aCurve.z;
      float aSpeed = aCurve.w;
      float aProgress = mod(aCurve.y + uTime * aSpeed, 1.);
      
      // 3. Get position and add it to the final position
      vec3 curvePosition = getCurvePosition(aProgress, aRadius, aZOffset);
      transformed += curvePosition;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.);
      vColor = aColor;
    }
    `;
        this.fragmentShader = `
    varying vec3 vColor;
    void main(){
      gl_FragColor = vec4(vColor, 1.);
    }
    `;
    }
    configureInstanceAttributes() {
        let aColor = [];
        let colors = [
            new three__WEBPACK_IMPORTED_MODULE_1__["Color"]("#ff3030"),
            new three__WEBPACK_IMPORTED_MODULE_1__["Color"]("#0000ff"),
            new three__WEBPACK_IMPORTED_MODULE_1__["Color"]("#00ff99"),
        ];
        let aCurve = [];
        for (let i = 0; i < this.instanceCount; i++) {
            let radius = random__WEBPACK_IMPORTED_MODULE_2__["float"](10, 20);
            let zOffset = random__WEBPACK_IMPORTED_MODULE_2__["float"](-5, 5);
            let progress = random__WEBPACK_IMPORTED_MODULE_2__["float"]();
            let speed = random__WEBPACK_IMPORTED_MODULE_2__["float"](0.02, 0.07);
            aCurve.push(radius, progress, zOffset, speed);
            let color = colors[random__WEBPACK_IMPORTED_MODULE_2__["int"](0, colors.length - 1)];
            aColor.push(color.r, color.g, color.b);
        }
        let aCurveFloat32 = new Float32Array(aCurve);
        this.instancedGeometry.setAttribute("aCurve", new three__WEBPACK_IMPORTED_MODULE_1__["InstancedBufferAttribute"](aCurveFloat32, 4, false));
        const f32 = new Float32Array(aColor);
        this.instancedGeometry.setAttribute("aColor", new three__WEBPACK_IMPORTED_MODULE_1__["InstancedBufferAttribute"](f32, 3, false));
        // sphere props.
    }
    renderView() {
        this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera);
        window.requestAnimationFrame(this.renderView.bind(this));
    }
    ngOnDestroy() {
        this.threeService.cleanScene(this.threeCommon);
    }
}


/***/ }),

/***/ "./src/app/three-optimized/components/optimized-cubes/optimized-cubes.component.ngfactory.js":
/*!***************************************************************************************************!*\
  !*** ./src/app/three-optimized/components/optimized-cubes/optimized-cubes.component.ngfactory.js ***!
  \***************************************************************************************************/
/*! exports provided: RenderType_OptimizedCubesComponent, View_OptimizedCubesComponent_0, View_OptimizedCubesComponent_Host_0, OptimizedCubesComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_OptimizedCubesComponent", function() { return RenderType_OptimizedCubesComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_OptimizedCubesComponent_0", function() { return View_OptimizedCubesComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_OptimizedCubesComponent_Host_0", function() { return View_OptimizedCubesComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptimizedCubesComponentNgFactory", function() { return OptimizedCubesComponentNgFactory; });
/* harmony import */ var _optimized_cubes_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./optimized-cubes.component.scss.shim.ngstyle */ "./src/app/three-optimized/components/optimized-cubes/optimized-cubes.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _optimized_cubes_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./optimized-cubes.component */ "./src/app/three-optimized/components/optimized-cubes/optimized-cubes.component.ts");
/* harmony import */ var _three_services_three_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../three/services/three.service */ "./src/app/three/services/three.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




var styles_OptimizedCubesComponent = [_optimized_cubes_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_OptimizedCubesComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_OptimizedCubesComponent, data: {} });

function View_OptimizedCubesComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { canvasEl: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Instances using instance mesh and geometry loader."])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, [[1, 0], ["canvasEl", 1]], null, 0, "canvas", [["height", "500"], ["width", "1000"]], null, [[null, "mousemove"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("mousemove" === en)) {
        var pd_0 = (_co.mouseMoveHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, null); }
function View_OptimizedCubesComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-optimized-cubes", [], null, [[null, "resize"]], function (_v, en, $event) { var ad = true; if (("resize" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).resizeEvent() !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_OptimizedCubesComponent_0, RenderType_OptimizedCubesComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _optimized_cubes_component__WEBPACK_IMPORTED_MODULE_2__["OptimizedCubesComponent"], [_three_services_three_service__WEBPACK_IMPORTED_MODULE_3__["ThreeService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var OptimizedCubesComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-optimized-cubes", _optimized_cubes_component__WEBPACK_IMPORTED_MODULE_2__["OptimizedCubesComponent"], View_OptimizedCubesComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/three-optimized/components/optimized-cubes/optimized-cubes.component.scss.shim.ngstyle.js":
/*!***********************************************************************************************************!*\
  !*** ./src/app/three-optimized/components/optimized-cubes/optimized-cubes.component.scss.shim.ngstyle.js ***!
  \***********************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RocmVlLW9wdGltaXplZC9jb21wb25lbnRzL29wdGltaXplZC1jdWJlcy9vcHRpbWl6ZWQtY3ViZXMuY29tcG9uZW50LnNjc3MifQ== */"];



/***/ }),

/***/ "./src/app/three-optimized/components/optimized-cubes/optimized-cubes.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/three-optimized/components/optimized-cubes/optimized-cubes.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: OptimizedCubesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptimizedCubesComponent", function() { return OptimizedCubesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");



class OptimizedCubesComponent {
    constructor(threeService) {
        this.threeService = threeService;
        this.mouse = new three__WEBPACK_IMPORTED_MODULE_1__["Vector2"]();
        this.objectCount = 20;
        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_1__["Raycaster"]();
        this.theta = 0;
        this.radius = 1000;
    }
    resizeEvent() {
        this.threeCommon.camera.aspect =
            this.canvasEl.nativeElement.offsetWidth /
                this.canvasEl.nativeElement.offsetHeight;
        this.threeCommon.camera.updateProjectionMatrix();
        this.threeCommon.renderer.setSize(this.canvasEl.nativeElement.offsetWidth, this.canvasEl.nativeElement.offsetHeight);
    }
    ngOnInit() {
        this.loadGeometry();
    }
    loadGeometry() {
        const loader = new three__WEBPACK_IMPORTED_MODULE_1__["BufferGeometryLoader"]();
        loader.load("assets/custom/geometry2.json", (geometry) => {
            this.geometry = geometry;
            // this.drawByMesh();
            this.drawByInstancing();
            this.renderView();
        });
    }
    ngAfterViewInit() {
        this.setUpStats();
        this.threeCommon = this.threeService.getThreeCommon(this.canvasEl.nativeElement);
        this.threeCommon.camera.position.z = 10;
        this.threeCommon.camera.aspect =
            this.canvasEl.nativeElement.offsetWidth /
                this.canvasEl.nativeElement.offsetHeight;
        this.threeCommon.renderer.setPixelRatio(window.devicePixelRatio);
        this.threeCommon.camera.updateProjectionMatrix();
        this.drawByMesh();
    }
    drawByMesh() {
        const mesh = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](this.geometry, new three__WEBPACK_IMPORTED_MODULE_1__["MeshNormalMaterial"]({}));
        mesh.position.set(15, 0, 0);
        this.threeCommon.scene.add(mesh);
    }
    drawByInstancing() {
        const material = new three__WEBPACK_IMPORTED_MODULE_1__["MeshNormalMaterial"]();
        this.instancedMesh = new three__WEBPACK_IMPORTED_MODULE_1__["InstancedMesh"](this.geometry, material, this.objectCount);
        this.instancedMesh.instanceMatrix.setUsage(three__WEBPACK_IMPORTED_MODULE_1__["DynamicDrawUsage"]);
        this.threeCommon.scene.add(this.instancedMesh);
    }
    mouseMoveHandler(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    setUpStats() {
        // this.stats = new Stats();
        // this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
        // document.body.appendChild(this.stats.dom);
        // this.stats.domElement.style.position = 'absolute';
        // this.stats.domElement.style.left = '0px';
        // this.stats.domElement.style.top = '0px';
    }
    renderView() {
        const time = Date.now() * 0.001;
        this.instancedMesh.rotation.x = Math.sin(time / 4);
        this.instancedMesh.rotation.y = Math.sin(time / 2);
        let i = 0;
        const offset = (this.objectCount - 1) / 2;
        const dummy = new three__WEBPACK_IMPORTED_MODULE_1__["Object3D"]();
        for (var x = 0; x < this.objectCount; x++) {
            for (var y = 0; y < this.objectCount; y++) {
                for (var z = 0; z < this.objectCount; z++) {
                    dummy.position.set(offset - x, offset - y, offset - z);
                    dummy.rotation.y =
                        Math.sin(x / 4 + time) +
                            Math.sin(y / 4 + time) +
                            Math.sin(z / 4 + time);
                    dummy.rotation.z = dummy.rotation.y * 2;
                    dummy.updateMatrix();
                    this.instancedMesh.setMatrixAt(i++, dummy.matrix);
                }
            }
        }
        this.instancedMesh.instanceMatrix.needsUpdate = true;
        this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera);
        window.requestAnimationFrame(this.renderView.bind(this));
    }
    ngOnDestroy() {
        this.threeService.cleanScene(this.threeCommon);
    }
}


/***/ }),

/***/ "./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.ngfactory.js":
/*!*******************************************************************************************************!*\
  !*** ./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.ngfactory.js ***!
  \*******************************************************************************************************/
/*! exports provided: RenderType_UnoptimizedCubesComponent, View_UnoptimizedCubesComponent_0, View_UnoptimizedCubesComponent_Host_0, UnoptimizedCubesComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_UnoptimizedCubesComponent", function() { return RenderType_UnoptimizedCubesComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_UnoptimizedCubesComponent_0", function() { return View_UnoptimizedCubesComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_UnoptimizedCubesComponent_Host_0", function() { return View_UnoptimizedCubesComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnoptimizedCubesComponentNgFactory", function() { return UnoptimizedCubesComponentNgFactory; });
/* harmony import */ var _unoptimized_cubes_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unoptimized-cubes.component.scss.shim.ngstyle */ "./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _unoptimized_cubes_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unoptimized-cubes.component */ "./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.ts");
/* harmony import */ var _three_services_three_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../three/services/three.service */ "./src/app/three/services/three.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




var styles_UnoptimizedCubesComponent = [_unoptimized_cubes_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_UnoptimizedCubesComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_UnoptimizedCubesComponent, data: {} });

function View_UnoptimizedCubesComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { canvasEl: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["UnOptimized cubes"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, [[1, 0], ["canvasEl", 1]], null, 0, "canvas", [["height", "500"], ["width", "1000"]], null, [[null, "mousemove"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("mousemove" === en)) {
        var pd_0 = (_co.mouseMoveHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, null); }
function View_UnoptimizedCubesComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-unoptimized-cubes", [], null, [[null, "resize"]], function (_v, en, $event) { var ad = true; if (("resize" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).resizeEvent() !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_UnoptimizedCubesComponent_0, RenderType_UnoptimizedCubesComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _unoptimized_cubes_component__WEBPACK_IMPORTED_MODULE_2__["UnoptimizedCubesComponent"], [_three_services_three_service__WEBPACK_IMPORTED_MODULE_3__["ThreeService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var UnoptimizedCubesComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-unoptimized-cubes", _unoptimized_cubes_component__WEBPACK_IMPORTED_MODULE_2__["UnoptimizedCubesComponent"], View_UnoptimizedCubesComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.scss.shim.ngstyle.js":
/*!***************************************************************************************************************!*\
  !*** ./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.scss.shim.ngstyle.js ***!
  \***************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RocmVlLW9wdGltaXplZC9jb21wb25lbnRzL3Vub3B0aW1pemVkLWN1YmVzL3Vub3B0aW1pemVkLWN1YmVzLmNvbXBvbmVudC5zY3NzIn0= */"];



/***/ }),

/***/ "./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: UnoptimizedCubesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnoptimizedCubesComponent", function() { return UnoptimizedCubesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


class UnoptimizedCubesComponent {
    constructor(threeService) {
        this.threeService = threeService;
        this.mouse = new three__WEBPACK_IMPORTED_MODULE_1__["Vector2"]();
        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_1__["Raycaster"]();
        this.theta = 0;
        this.radius = 1000;
    }
    resizeEvent() {
        this.threeCommon.camera.aspect =
            this.canvasEl.nativeElement.offsetWidth /
                this.canvasEl.nativeElement.offsetHeight;
        this.threeCommon.camera.updateProjectionMatrix();
        this.threeCommon.renderer.setSize(this.canvasEl.nativeElement.offsetWidth, this.canvasEl.nativeElement.offsetHeight);
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.setUpStats();
        this.threeCommon = this.threeService.getThreeCommon(this.canvasEl.nativeElement);
        this.threeCommon.camera.position.z = 0;
        this.threeCommon.camera.aspect =
            this.canvasEl.nativeElement.offsetWidth /
                this.canvasEl.nativeElement.offsetHeight;
        this.threeCommon.renderer.setPixelRatio(window.devicePixelRatio);
        this.threeCommon.camera.updateProjectionMatrix();
        this.threeCommon.scene.background = new three__WEBPACK_IMPORTED_MODULE_1__["Color"](0xf0f0f0);
        this.viewController();
    }
    mouseMoveHandler(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    setUpStats() {
        // this.stats = new Stats();
        // this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
        // document.body.appendChild(this.stats.dom);
        // this.stats.domElement.style.position = 'absolute';
        // this.stats.domElement.style.left = '0px';
        // this.stats.domElement.style.top = '0px';
    }
    viewController() {
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__["BoxBufferGeometry"](20, 20, 20);
        for (var i = 0; i < 2000; i++) {
            var object = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](geometry, new three__WEBPACK_IMPORTED_MODULE_1__["MeshLambertMaterial"]({ color: Math.random() * 0xffffff }));
            object.position.x =
                Math.random() * this.canvasEl.nativeElement.offsetWidth -
                    this.canvasEl.nativeElement.offsetHeight;
            object.position.y =
                Math.random() * this.canvasEl.nativeElement.offsetWidth -
                    this.canvasEl.nativeElement.offsetHeight;
            object.position.z =
                Math.random() * this.canvasEl.nativeElement.offsetWidth -
                    this.canvasEl.nativeElement.offsetHeight;
            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;
            object.scale.x = Math.random() + 0.5;
            object.scale.y = Math.random() + 0.5;
            object.scale.z = Math.random() + 0.5;
            this.threeCommon.scene.add(object);
        }
        this.renderView();
    }
    renderView(calleeAnimationFrame) {
        this.theta += 0.01;
        this.threeCommon.camera.position.x =
            this.radius * Math.sin(three__WEBPACK_IMPORTED_MODULE_1__["MathUtils"].degToRad(this.theta));
        this.threeCommon.camera.position.y =
            this.radius * Math.sin(three__WEBPACK_IMPORTED_MODULE_1__["MathUtils"].degToRad(this.theta));
        this.threeCommon.camera.position.z =
            this.radius * Math.cos(three__WEBPACK_IMPORTED_MODULE_1__["MathUtils"].degToRad(this.theta));
        this.threeCommon.camera.lookAt(this.threeCommon.scene.position);
        this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);
        var intersects = this.raycaster.intersectObjects(this.threeCommon.scene.children);
        if (intersects.length > 0) {
            if (this.intersected != intersects[0].object) {
                if (this.intersected)
                    this.intersected.material.emissive.setHex(this.intersected.currentHex);
                this.intersected = intersects[0].object;
                this.intersected.currentHex = this.intersected.material.emissive.getHex();
                this.intersected.material.emissive.setHex(0xff0000);
            }
        }
        else {
            if (this.intersected)
                this.intersected.material.emissive.setHex(this.intersected.currentHex);
            this.intersected = null;
        }
        // console.log(this.threeCommon.renderer.info.render.calls)
        this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera);
        window.requestAnimationFrame(this.renderView.bind(this));
    }
    ngOnDestroy() {
        this.threeService.cleanScene(this.threeCommon);
    }
}


/***/ }),

/***/ "./src/app/three-optimized/three-optimized-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/three-optimized/three-optimized-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: ThreeOptimizedRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeOptimizedRoutingModule", function() { return ThreeOptimizedRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _common_enums_three_optimized_routes_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/enums/three-optimized-routes.enum */ "./src/app/common/enums/three-optimized-routes.enum.ts");
/* harmony import */ var _components_instance_optimized_instance_optimized_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/instance-optimized/instance-optimized.component */ "./src/app/three-optimized/components/instance-optimized/instance-optimized.component.ts");
/* harmony import */ var _components_instanced_layout_instanced_layout_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/instanced-layout/instanced-layout.component */ "./src/app/three-optimized/components/instanced-layout/instanced-layout.component.ts");
/* harmony import */ var _components_instanced_spheres_instanced_spheres_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/instanced-spheres/instanced-spheres.component */ "./src/app/three-optimized/components/instanced-spheres/instanced-spheres.component.ts");
/* harmony import */ var _components_optimized_cubes_optimized_cubes_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/optimized-cubes/optimized-cubes.component */ "./src/app/three-optimized/components/optimized-cubes/optimized-cubes.component.ts");
/* harmony import */ var _components_unoptimized_cubes_unoptimized_cubes_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/unoptimized-cubes/unoptimized-cubes.component */ "./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.ts");







const routes = [
    {
        path: `${_common_enums_three_optimized_routes_enum__WEBPACK_IMPORTED_MODULE_1__["ThreeOptimizedRoutes"].instancingRaycast}`,
        component: _components_instance_optimized_instance_optimized_component__WEBPACK_IMPORTED_MODULE_2__["InstanceOptimizedComponent"],
    },
    {
        path: `${_common_enums_three_optimized_routes_enum__WEBPACK_IMPORTED_MODULE_1__["ThreeOptimizedRoutes"].instancingBasic}`,
        component: _components_optimized_cubes_optimized_cubes_component__WEBPACK_IMPORTED_MODULE_5__["OptimizedCubesComponent"],
    },
    {
        path: `${_common_enums_three_optimized_routes_enum__WEBPACK_IMPORTED_MODULE_1__["ThreeOptimizedRoutes"].webglShaders}`,
        component: _components_instanced_spheres_instanced_spheres_component__WEBPACK_IMPORTED_MODULE_4__["InstancedSpheresComponent"],
    },
    {
        path: `${_common_enums_three_optimized_routes_enum__WEBPACK_IMPORTED_MODULE_1__["ThreeOptimizedRoutes"].unoptimizedCubes}`,
        component: _components_unoptimized_cubes_unoptimized_cubes_component__WEBPACK_IMPORTED_MODULE_6__["UnoptimizedCubesComponent"],
    },
    {
        path: `${_common_enums_three_optimized_routes_enum__WEBPACK_IMPORTED_MODULE_1__["ThreeOptimizedRoutes"].instancingLayout}`,
        component: _components_instanced_layout_instanced_layout_component__WEBPACK_IMPORTED_MODULE_3__["InstancedLayoutComponent"],
    },
    {
        path: "",
        redirectTo: `${_common_enums_three_optimized_routes_enum__WEBPACK_IMPORTED_MODULE_1__["ThreeOptimizedRoutes"].instancingLayout}`,
    },
];
class ThreeOptimizedRoutingModule {
}


/***/ }),

/***/ "./src/app/three-optimized/three-optimized.module.ngfactory.js":
/*!*********************************************************************!*\
  !*** ./src/app/three-optimized/three-optimized.module.ngfactory.js ***!
  \*********************************************************************/
/*! exports provided: ThreeOptimizedModuleNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeOptimizedModuleNgFactory", function() { return ThreeOptimizedModuleNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _three_optimized_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./three-optimized.module */ "./src/app/three-optimized/three-optimized.module.ts");
/* harmony import */ var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/@angular/router/router.ngfactory */ "./node_modules/@angular/router/router.ngfactory.js");
/* harmony import */ var _components_instance_optimized_instance_optimized_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/instance-optimized/instance-optimized.component.ngfactory */ "./src/app/three-optimized/components/instance-optimized/instance-optimized.component.ngfactory.js");
/* harmony import */ var _components_optimized_cubes_optimized_cubes_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/optimized-cubes/optimized-cubes.component.ngfactory */ "./src/app/three-optimized/components/optimized-cubes/optimized-cubes.component.ngfactory.js");
/* harmony import */ var _components_instanced_spheres_instanced_spheres_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/instanced-spheres/instanced-spheres.component.ngfactory */ "./src/app/three-optimized/components/instanced-spheres/instanced-spheres.component.ngfactory.js");
/* harmony import */ var _components_unoptimized_cubes_unoptimized_cubes_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/unoptimized-cubes/unoptimized-cubes.component.ngfactory */ "./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.ngfactory.js");
/* harmony import */ var _components_instanced_layout_instanced_layout_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/instanced-layout/instanced-layout.component.ngfactory */ "./src/app/three-optimized/components/instanced-layout/instanced-layout.component.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _three_optimized_routing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./three-optimized-routing.module */ "./src/app/three-optimized/three-optimized-routing.module.ts");
/* harmony import */ var _components_instance_optimized_instance_optimized_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/instance-optimized/instance-optimized.component */ "./src/app/three-optimized/components/instance-optimized/instance-optimized.component.ts");
/* harmony import */ var _components_optimized_cubes_optimized_cubes_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/optimized-cubes/optimized-cubes.component */ "./src/app/three-optimized/components/optimized-cubes/optimized-cubes.component.ts");
/* harmony import */ var _components_instanced_spheres_instanced_spheres_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/instanced-spheres/instanced-spheres.component */ "./src/app/three-optimized/components/instanced-spheres/instanced-spheres.component.ts");
/* harmony import */ var _components_unoptimized_cubes_unoptimized_cubes_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/unoptimized-cubes/unoptimized-cubes.component */ "./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.ts");
/* harmony import */ var _components_instanced_layout_instanced_layout_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/instanced-layout/instanced-layout.component */ "./src/app/three-optimized/components/instanced-layout/instanced-layout.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
















var ThreeOptimizedModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_three_optimized_module__WEBPACK_IMPORTED_MODULE_1__["ThreeOptimizedModule"], [], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_router_router_lNgFactory"], _components_instance_optimized_instance_optimized_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__["InstanceOptimizedComponentNgFactory"], _components_optimized_cubes_optimized_cubes_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__["OptimizedCubesComponentNgFactory"], _components_instanced_spheres_instanced_spheres_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__["InstancedSpheresComponentNgFactory"], _components_unoptimized_cubes_unoptimized_cubes_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__["UnoptimizedCubesComponentNgFactory"], _components_instanced_layout_instanced_layout_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__["InstancedLayoutComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_8__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _three_optimized_routing_module__WEBPACK_IMPORTED_MODULE_10__["ThreeOptimizedRoutingModule"], _three_optimized_routing_module__WEBPACK_IMPORTED_MODULE_10__["ThreeOptimizedRoutingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _three_optimized_module__WEBPACK_IMPORTED_MODULE_1__["ThreeOptimizedModule"], _three_optimized_module__WEBPACK_IMPORTED_MODULE_1__["ThreeOptimizedModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_9__["ROUTES"], function () { return [[{ path: "instancing-raycast", component: _components_instance_optimized_instance_optimized_component__WEBPACK_IMPORTED_MODULE_11__["InstanceOptimizedComponent"] }, { path: "instancing-basic", component: _components_optimized_cubes_optimized_cubes_component__WEBPACK_IMPORTED_MODULE_12__["OptimizedCubesComponent"] }, { path: "webgl-shaders", component: _components_instanced_spheres_instanced_spheres_component__WEBPACK_IMPORTED_MODULE_13__["InstancedSpheresComponent"] }, { path: "unoptimized-cubes", component: _components_unoptimized_cubes_unoptimized_cubes_component__WEBPACK_IMPORTED_MODULE_14__["UnoptimizedCubesComponent"] }, { path: "instancing-layout", component: _components_instanced_layout_instanced_layout_component__WEBPACK_IMPORTED_MODULE_15__["InstancedLayoutComponent"] }, { path: "", redirectTo: "instancing-layout" }]]; }, [])]); });



/***/ }),

/***/ "./src/app/three-optimized/three-optimized.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/three-optimized/three-optimized.module.ts ***!
  \***********************************************************/
/*! exports provided: ThreeOptimizedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeOptimizedModule", function() { return ThreeOptimizedModule; });
class ThreeOptimizedModule {
}


/***/ }),

/***/ 3:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=three-optimized-three-optimized-module-ngfactory-es2015.js.map