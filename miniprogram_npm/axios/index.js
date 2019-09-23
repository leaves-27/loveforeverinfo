module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1569248834618, function(require, module, exports) {
module.exports = require('./lib/axios');
}, function(modId) {var map = {"./lib/axios":1569248834619}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834619, function(require, module, exports) {


var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

}, function(modId) { var map = {"./utils":1569248834620,"./helpers/bind":1569248834621,"./core/Axios":1569248834622,"./core/mergeConfig":1569248834641,"./defaults":1569248834628,"./cancel/Cancel":1569248834642,"./cancel/CancelToken":1569248834643,"./cancel/isCancel":1569248834627,"./helpers/spread":1569248834644}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834620, function(require, module, exports) {


var bind = require('./helpers/bind');
var isBuffer = require('is-buffer');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

}, function(modId) { var map = {"./helpers/bind":1569248834621}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834621, function(require, module, exports) {


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834622, function(require, module, exports) {


var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

}, function(modId) { var map = {"./../utils":1569248834620,"../helpers/buildURL":1569248834623,"./InterceptorManager":1569248834624,"./dispatchRequest":1569248834625,"./mergeConfig":1569248834641}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834623, function(require, module, exports) {


var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

}, function(modId) { var map = {"./../utils":1569248834620}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834624, function(require, module, exports) {


var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

}, function(modId) { var map = {"./../utils":1569248834620}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834625, function(require, module, exports) {


var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');
var isAbsoluteURL = require('./../helpers/isAbsoluteURL');
var combineURLs = require('./../helpers/combineURLs');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

}, function(modId) { var map = {"./../utils":1569248834620,"./transformData":1569248834626,"../cancel/isCancel":1569248834627,"../defaults":1569248834628,"./../helpers/isAbsoluteURL":1569248834639,"./../helpers/combineURLs":1569248834640}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834626, function(require, module, exports) {


var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

}, function(modId) { var map = {"./../utils":1569248834620}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834627, function(require, module, exports) {


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834628, function(require, module, exports) {


var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}, function(modId) { var map = {"./utils":1569248834620,"./helpers/normalizeHeaderName":1569248834629,"./adapters/http":1569248834630,"./adapters/xhr":1569248834635}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834629, function(require, module, exports) {


var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

}, function(modId) { var map = {"../utils":1569248834620}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834630, function(require, module, exports) {


var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var http = require('http');
var https = require('https');
var httpFollow = require('follow-redirects').http;
var httpsFollow = require('follow-redirects').https;
var url = require('url');
var zlib = require('zlib');
var pkg = require('./../../package.json');
var createError = require('../core/createError');
var enhanceError = require('../core/enhanceError');

var isHttps = /https:?/;

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var timer;
    var resolve = function resolve(value) {
      clearTimeout(timer);
      resolvePromise(value);
    };
    var reject = function reject(value) {
      clearTimeout(timer);
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var parsed = url.parse(config.url);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement &&
                proxyElement.match(/\./g).length === parsed.hostname.match(/\./g).length) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }


        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxContentLength && config.maxContentLength > -1) {
      options.maxBodyLength = config.maxContentLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;
      switch (res.headers['content-encoding']) {
      /*eslint default-case:0*/
      case 'gzip':
      case 'compress':
      case 'deflate':
        // add the unzipper to the body stream processing pipeline
        stream = (res.statusCode === 204) ? stream : stream.pipe(zlib.createUnzip());

        // remove the content-encoding in order to not confuse downstream operations
        delete res.headers['content-encoding'];
        break;
      }

      // return the last request in case of redirects
      var lastRequest = res.req || req;

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted) return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      timer = setTimeout(function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      }, config.timeout);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};

}, function(modId) { var map = {"./../utils":1569248834620,"./../core/settle":1569248834631,"./../helpers/buildURL":1569248834623,"http":1569248834630,"./../../package.json":1569248834634,"../core/createError":1569248834632,"../core/enhanceError":1569248834633}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834631, function(require, module, exports) {


var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

}, function(modId) { var map = {"./createError":1569248834632}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834632, function(require, module, exports) {


var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

}, function(modId) { var map = {"./enhanceError":1569248834633}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834633, function(require, module, exports) {


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834634, function(require, module, exports) {
module.exports = {
  "_args": [
    [
      {
        "raw": "axios",
        "scope": null,
        "escapedName": "axios",
        "name": "axios",
        "rawSpec": "",
        "spec": "latest",
        "type": "tag"
      },
      "/Users/leaves/Documents/workspace3/loveforeverinfo"
    ]
  ],
  "_cnpm_publish_time": 1559232796930,
  "_from": "axios",
  "_hasShrinkwrap": false,
  "_id": "axios@0.19.0",
  "_location": "/axios",
  "_nodeVersion": "10.14.1",
  "_npmOperationalInternal": {
    "host": "s3://npm-registry-packages",
    "tmp": "tmp/axios_0.19.0_1559232796730_0.8176323141298978"
  },
  "_npmUser": {
    "name": "emilyemorehouse",
    "email": "emilyemorehouse@gmail.com"
  },
  "_npmVersion": "6.4.1",
  "_phantomChildren": {},
  "_requested": {
    "raw": "axios",
    "scope": null,
    "escapedName": "axios",
    "name": "axios",
    "rawSpec": "",
    "spec": "latest",
    "type": "tag"
  },
  "_requiredBy": [
    "#USER",
    "/"
  ],
  "_resolved": "https://registry.npm.taobao.org/axios/download/axios-0.19.0.tgz",
  "_shasum": "8e09bff3d9122e133f7b8101c8fbdd00ed3d2ab8",
  "_shrinkwrap": null,
  "_spec": "axios",
  "_where": "/Users/leaves/Documents/workspace3/loveforeverinfo",
  "author": {
    "name": "Matt Zabriskie"
  },
  "browser": {
    "./lib/adapters/http.js": "./lib/adapters/xhr.js"
  },
  "bugs": {
    "url": "https://github.com/axios/axios/issues"
  },
  "bundlesize": [
    {
      "path": "./dist/axios.min.js",
      "threshold": "5kB"
    }
  ],
  "dependencies": {
    "follow-redirects": "1.5.10",
    "is-buffer": "^2.0.2"
  },
  "description": "Promise based HTTP client for the browser and node.js",
  "devDependencies": {
    "bundlesize": "^0.17.0",
    "coveralls": "^3.0.0",
    "es6-promise": "^4.2.4",
    "grunt": "^1.0.2",
    "grunt-banner": "^0.6.0",
    "grunt-cli": "^1.2.0",
    "grunt-contrib-clean": "^1.1.0",
    "grunt-contrib-watch": "^1.0.0",
    "grunt-eslint": "^20.1.0",
    "grunt-karma": "^2.0.0",
    "grunt-mocha-test": "^0.13.3",
    "grunt-ts": "^6.0.0-beta.19",
    "grunt-webpack": "^1.0.18",
    "istanbul-instrumenter-loader": "^1.0.0",
    "jasmine-core": "^2.4.1",
    "karma": "^1.3.0",
    "karma-chrome-launcher": "^2.2.0",
    "karma-coverage": "^1.1.1",
    "karma-firefox-launcher": "^1.1.0",
    "karma-jasmine": "^1.1.1",
    "karma-jasmine-ajax": "^0.1.13",
    "karma-opera-launcher": "^1.0.0",
    "karma-safari-launcher": "^1.0.0",
    "karma-sauce-launcher": "^1.2.0",
    "karma-sinon": "^1.0.5",
    "karma-sourcemap-loader": "^0.3.7",
    "karma-webpack": "^1.7.0",
    "load-grunt-tasks": "^3.5.2",
    "minimist": "^1.2.0",
    "mocha": "^5.2.0",
    "sinon": "^4.5.0",
    "typescript": "^2.8.1",
    "url-search-params": "^0.10.0",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
  },
  "directories": {},
  "dist": {
    "shasum": "8e09bff3d9122e133f7b8101c8fbdd00ed3d2ab8",
    "size": 84224,
    "noattachment": false,
    "tarball": "https://registry.npm.taobao.org/axios/download/axios-0.19.0.tgz"
  },
  "gitHead": "8d0b92b2678d96770304dd767cd05a59d37f12cf",
  "homepage": "https://github.com/axios/axios",
  "keywords": [
    "xhr",
    "http",
    "ajax",
    "promise",
    "node"
  ],
  "license": "MIT",
  "main": "index.js",
  "maintainers": [
    {
      "name": "mzabriskie",
      "email": "mzabriskie@gmail.com"
    },
    {
      "name": "nickuraltsev",
      "email": "nick.uraltsev@gmail.com"
    }
  ],
  "name": "axios",
  "optionalDependencies": {},
  "publish_time": 1559232796930,
  "readme": "# axios\n\n[![npm version](https://img.shields.io/npm/v/axios.svg?style=flat-square)](https://www.npmjs.org/package/axios)\n[![build status](https://img.shields.io/travis/axios/axios.svg?style=flat-square)](https://travis-ci.org/axios/axios)\n[![code coverage](https://img.shields.io/coveralls/mzabriskie/axios.svg?style=flat-square)](https://coveralls.io/r/mzabriskie/axios)\n[![install size](https://packagephobia.now.sh/badge?p=axios)](https://packagephobia.now.sh/result?p=axios)\n[![npm downloads](https://img.shields.io/npm/dm/axios.svg?style=flat-square)](http://npm-stat.com/charts.html?package=axios)\n[![gitter chat](https://img.shields.io/gitter/room/mzabriskie/axios.svg?style=flat-square)](https://gitter.im/mzabriskie/axios)\n[![code helpers](https://www.codetriage.com/axios/axios/badges/users.svg)](https://www.codetriage.com/axios/axios)\n\nPromise based HTTP client for the browser and node.js\n\n## Features\n\n- Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser\n- Make [http](http://nodejs.org/api/http.html) requests from node.js\n- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API\n- Intercept request and response\n- Transform request and response data\n- Cancel requests\n- Automatic transforms for JSON data\n- Client side support for protecting against [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)\n\n## Browser Support\n\n![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |\n--- | --- | --- | --- | --- | --- |\nLatest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |\n\n[![Browser Matrix](https://saucelabs.com/open_sauce/build_matrix/axios.svg)](https://saucelabs.com/u/axios)\n\n## Installing\n\nUsing npm:\n\n```bash\n$ npm install axios\n```\n\nUsing bower:\n\n```bash\n$ bower install axios\n```\n\nUsing yarn:\n\n```bash\n$ yarn add axios\n```\n\nUsing cdn:\n\n```html\n<script src=\"https://unpkg.com/axios/dist/axios.min.js\"></script>\n```\n\n## Example\n\nPerforming a `GET` request\n\n```js\nconst axios = require('axios');\n\n// Make a request for a user with a given ID\naxios.get('/user?ID=12345')\n  .then(function (response) {\n    // handle success\n    console.log(response);\n  })\n  .catch(function (error) {\n    // handle error\n    console.log(error);\n  })\n  .finally(function () {\n    // always executed\n  });\n\n// Optionally the request above could also be done as\naxios.get('/user', {\n    params: {\n      ID: 12345\n    }\n  })\n  .then(function (response) {\n    console.log(response);\n  })\n  .catch(function (error) {\n    console.log(error);\n  })\n  .then(function () {\n    // always executed\n  });  \n\n// Want to use async/await? Add the `async` keyword to your outer function/method.\nasync function getUser() {\n  try {\n    const response = await axios.get('/user?ID=12345');\n    console.log(response);\n  } catch (error) {\n    console.error(error);\n  }\n}\n```\n\n> **NOTE:** `async/await` is part of ECMAScript 2017 and is not supported in Internet\n> Explorer and older browsers, so use with caution.\n\nPerforming a `POST` request\n\n```js\naxios.post('/user', {\n    firstName: 'Fred',\n    lastName: 'Flintstone'\n  })\n  .then(function (response) {\n    console.log(response);\n  })\n  .catch(function (error) {\n    console.log(error);\n  });\n```\n\nPerforming multiple concurrent requests\n\n```js\nfunction getUserAccount() {\n  return axios.get('/user/12345');\n}\n\nfunction getUserPermissions() {\n  return axios.get('/user/12345/permissions');\n}\n\naxios.all([getUserAccount(), getUserPermissions()])\n  .then(axios.spread(function (acct, perms) {\n    // Both requests are now complete\n  }));\n```\n\n## axios API\n\nRequests can be made by passing the relevant config to `axios`.\n\n##### axios(config)\n\n```js\n// Send a POST request\naxios({\n  method: 'post',\n  url: '/user/12345',\n  data: {\n    firstName: 'Fred',\n    lastName: 'Flintstone'\n  }\n});\n```\n\n```js\n// GET request for remote image\naxios({\n  method: 'get',\n  url: 'http://bit.ly/2mTM3nY',\n  responseType: 'stream'\n})\n  .then(function (response) {\n    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))\n  });\n```\n\n##### axios(url[, config])\n\n```js\n// Send a GET request (default method)\naxios('/user/12345');\n```\n\n### Request method aliases\n\nFor convenience aliases have been provided for all supported request methods.\n\n##### axios.request(config)\n##### axios.get(url[, config])\n##### axios.delete(url[, config])\n##### axios.head(url[, config])\n##### axios.options(url[, config])\n##### axios.post(url[, data[, config]])\n##### axios.put(url[, data[, config]])\n##### axios.patch(url[, data[, config]])\n\n###### NOTE\nWhen using the alias methods `url`, `method`, and `data` properties don't need to be specified in config.\n\n### Concurrency\n\nHelper functions for dealing with concurrent requests.\n\n##### axios.all(iterable)\n##### axios.spread(callback)\n\n### Creating an instance\n\nYou can create a new instance of axios with a custom config.\n\n##### axios.create([config])\n\n```js\nconst instance = axios.create({\n  baseURL: 'https://some-domain.com/api/',\n  timeout: 1000,\n  headers: {'X-Custom-Header': 'foobar'}\n});\n```\n\n### Instance methods\n\nThe available instance methods are listed below. The specified config will be merged with the instance config.\n\n##### axios#request(config)\n##### axios#get(url[, config])\n##### axios#delete(url[, config])\n##### axios#head(url[, config])\n##### axios#options(url[, config])\n##### axios#post(url[, data[, config]])\n##### axios#put(url[, data[, config]])\n##### axios#patch(url[, data[, config]])\n##### axios#getUri([config])\n\n## Request Config\n\nThese are the available config options for making requests. Only the `url` is required. Requests will default to `GET` if `method` is not specified.\n\n```js\n{\n  // `url` is the server URL that will be used for the request\n  url: '/user',\n\n  // `method` is the request method to be used when making the request\n  method: 'get', // default\n\n  // `baseURL` will be prepended to `url` unless `url` is absolute.\n  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs\n  // to methods of that instance.\n  baseURL: 'https://some-domain.com/api/',\n\n  // `transformRequest` allows changes to the request data before it is sent to the server\n  // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'\n  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,\n  // FormData or Stream\n  // You may modify the headers object.\n  transformRequest: [function (data, headers) {\n    // Do whatever you want to transform the data\n\n    return data;\n  }],\n\n  // `transformResponse` allows changes to the response data to be made before\n  // it is passed to then/catch\n  transformResponse: [function (data) {\n    // Do whatever you want to transform the data\n\n    return data;\n  }],\n\n  // `headers` are custom headers to be sent\n  headers: {'X-Requested-With': 'XMLHttpRequest'},\n\n  // `params` are the URL parameters to be sent with the request\n  // Must be a plain object or a URLSearchParams object\n  params: {\n    ID: 12345\n  },\n\n  // `paramsSerializer` is an optional function in charge of serializing `params`\n  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)\n  paramsSerializer: function (params) {\n    return Qs.stringify(params, {arrayFormat: 'brackets'})\n  },\n\n  // `data` is the data to be sent as the request body\n  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'\n  // When no `transformRequest` is set, must be of one of the following types:\n  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams\n  // - Browser only: FormData, File, Blob\n  // - Node only: Stream, Buffer\n  data: {\n    firstName: 'Fred'\n  },\n\n  // `timeout` specifies the number of milliseconds before the request times out.\n  // If the request takes longer than `timeout`, the request will be aborted.\n  timeout: 1000, // default is `0` (no timeout)\n\n  // `withCredentials` indicates whether or not cross-site Access-Control requests\n  // should be made using credentials\n  withCredentials: false, // default\n\n  // `adapter` allows custom handling of requests which makes testing easier.\n  // Return a promise and supply a valid response (see lib/adapters/README.md).\n  adapter: function (config) {\n    /* ... */\n  },\n\n  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.\n  // This will set an `Authorization` header, overwriting any existing\n  // `Authorization` custom headers you have set using `headers`.\n  // Please note that only HTTP Basic auth is configurable through this parameter.\n  // For Bearer tokens and such, use `Authorization` custom headers instead.\n  auth: {\n    username: 'janedoe',\n    password: 's00pers3cret'\n  },\n\n  // `responseType` indicates the type of data that the server will respond with\n  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'\n  //   browser only: 'blob'\n  responseType: 'json', // default\n\n  // `responseEncoding` indicates encoding to use for decoding responses\n  // Note: Ignored for `responseType` of 'stream' or client-side requests\n  responseEncoding: 'utf8', // default\n\n  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token\n  xsrfCookieName: 'XSRF-TOKEN', // default\n\n  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value\n  xsrfHeaderName: 'X-XSRF-TOKEN', // default\n\n  // `onUploadProgress` allows handling of progress events for uploads\n  onUploadProgress: function (progressEvent) {\n    // Do whatever you want with the native progress event\n  },\n\n  // `onDownloadProgress` allows handling of progress events for downloads\n  onDownloadProgress: function (progressEvent) {\n    // Do whatever you want with the native progress event\n  },\n\n  // `maxContentLength` defines the max size of the http response content in bytes allowed\n  maxContentLength: 2000,\n\n  // `validateStatus` defines whether to resolve or reject the promise for a given\n  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`\n  // or `undefined`), the promise will be resolved; otherwise, the promise will be\n  // rejected.\n  validateStatus: function (status) {\n    return status >= 200 && status < 300; // default\n  },\n\n  // `maxRedirects` defines the maximum number of redirects to follow in node.js.\n  // If set to 0, no redirects will be followed.\n  maxRedirects: 5, // default\n\n  // `socketPath` defines a UNIX Socket to be used in node.js.\n  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.\n  // Only either `socketPath` or `proxy` can be specified.\n  // If both are specified, `socketPath` is used.\n  socketPath: null, // default\n\n  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http\n  // and https requests, respectively, in node.js. This allows options to be added like\n  // `keepAlive` that are not enabled by default.\n  httpAgent: new http.Agent({ keepAlive: true }),\n  httpsAgent: new https.Agent({ keepAlive: true }),\n\n  // 'proxy' defines the hostname and port of the proxy server.\n  // You can also define your proxy using the conventional `http_proxy` and\n  // `https_proxy` environment variables. If you are using environment variables\n  // for your proxy configuration, you can also define a `no_proxy` environment\n  // variable as a comma-separated list of domains that should not be proxied.\n  // Use `false` to disable proxies, ignoring environment variables.\n  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and\n  // supplies credentials.\n  // This will set an `Proxy-Authorization` header, overwriting any existing\n  // `Proxy-Authorization` custom headers you have set using `headers`.\n  proxy: {\n    host: '127.0.0.1',\n    port: 9000,\n    auth: {\n      username: 'mikeymike',\n      password: 'rapunz3l'\n    }\n  },\n\n  // `cancelToken` specifies a cancel token that can be used to cancel the request\n  // (see Cancellation section below for details)\n  cancelToken: new CancelToken(function (cancel) {\n  })\n}\n```\n\n## Response Schema\n\nThe response for a request contains the following information.\n\n```js\n{\n  // `data` is the response that was provided by the server\n  data: {},\n\n  // `status` is the HTTP status code from the server response\n  status: 200,\n\n  // `statusText` is the HTTP status message from the server response\n  statusText: 'OK',\n\n  // `headers` the headers that the server responded with\n  // All header names are lower cased\n  headers: {},\n\n  // `config` is the config that was provided to `axios` for the request\n  config: {},\n\n  // `request` is the request that generated this response\n  // It is the last ClientRequest instance in node.js (in redirects)\n  // and an XMLHttpRequest instance the browser\n  request: {}\n}\n```\n\nWhen using `then`, you will receive the response as follows:\n\n```js\naxios.get('/user/12345')\n  .then(function (response) {\n    console.log(response.data);\n    console.log(response.status);\n    console.log(response.statusText);\n    console.log(response.headers);\n    console.log(response.config);\n  });\n```\n\nWhen using `catch`, or passing a [rejection callback](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) as second parameter of `then`, the response will be available through the `error` object as explained in the [Handling Errors](#handling-errors) section.\n\n## Config Defaults\n\nYou can specify config defaults that will be applied to every request.\n\n### Global axios defaults\n\n```js\naxios.defaults.baseURL = 'https://api.example.com';\naxios.defaults.headers.common['Authorization'] = AUTH_TOKEN;\naxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';\n```\n\n### Custom instance defaults\n\n```js\n// Set config defaults when creating the instance\nconst instance = axios.create({\n  baseURL: 'https://api.example.com'\n});\n\n// Alter defaults after instance has been created\ninstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;\n```\n\n### Config order of precedence\n\nConfig will be merged with an order of precedence. The order is library defaults found in [lib/defaults.js](https://github.com/axios/axios/blob/master/lib/defaults.js#L28), then `defaults` property of the instance, and finally `config` argument for the request. The latter will take precedence over the former. Here's an example.\n\n```js\n// Create an instance using the config defaults provided by the library\n// At this point the timeout config value is `0` as is the default for the library\nconst instance = axios.create();\n\n// Override timeout default for the library\n// Now all requests using this instance will wait 2.5 seconds before timing out\ninstance.defaults.timeout = 2500;\n\n// Override timeout for this request as it's known to take a long time\ninstance.get('/longRequest', {\n  timeout: 5000\n});\n```\n\n## Interceptors\n\nYou can intercept requests or responses before they are handled by `then` or `catch`.\n\n```js\n// Add a request interceptor\naxios.interceptors.request.use(function (config) {\n    // Do something before request is sent\n    return config;\n  }, function (error) {\n    // Do something with request error\n    return Promise.reject(error);\n  });\n\n// Add a response interceptor\naxios.interceptors.response.use(function (response) {\n    // Do something with response data\n    return response;\n  }, function (error) {\n    // Do something with response error\n    return Promise.reject(error);\n  });\n```\n\nIf you may need to remove an interceptor later you can.\n\n```js\nconst myInterceptor = axios.interceptors.request.use(function () {/*...*/});\naxios.interceptors.request.eject(myInterceptor);\n```\n\nYou can add interceptors to a custom instance of axios.\n\n```js\nconst instance = axios.create();\ninstance.interceptors.request.use(function () {/*...*/});\n```\n\n## Handling Errors\n\n```js\naxios.get('/user/12345')\n  .catch(function (error) {\n    if (error.response) {\n      // The request was made and the server responded with a status code\n      // that falls out of the range of 2xx\n      console.log(error.response.data);\n      console.log(error.response.status);\n      console.log(error.response.headers);\n    } else if (error.request) {\n      // The request was made but no response was received\n      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of\n      // http.ClientRequest in node.js\n      console.log(error.request);\n    } else {\n      // Something happened in setting up the request that triggered an Error\n      console.log('Error', error.message);\n    }\n    console.log(error.config);\n  });\n```\n\nYou can define a custom HTTP status code error range using the `validateStatus` config option.\n\n```js\naxios.get('/user/12345', {\n  validateStatus: function (status) {\n    return status < 500; // Reject only if the status code is greater than or equal to 500\n  }\n})\n```\n\n## Cancellation\n\nYou can cancel a request using a *cancel token*.\n\n> The axios cancel token API is based on the withdrawn [cancelable promises proposal](https://github.com/tc39/proposal-cancelable-promises).\n\nYou can create a cancel token using the `CancelToken.source` factory as shown below:\n\n```js\nconst CancelToken = axios.CancelToken;\nconst source = CancelToken.source();\n\naxios.get('/user/12345', {\n  cancelToken: source.token\n}).catch(function (thrown) {\n  if (axios.isCancel(thrown)) {\n    console.log('Request canceled', thrown.message);\n  } else {\n    // handle error\n  }\n});\n\naxios.post('/user/12345', {\n  name: 'new name'\n}, {\n  cancelToken: source.token\n})\n\n// cancel the request (the message parameter is optional)\nsource.cancel('Operation canceled by the user.');\n```\n\nYou can also create a cancel token by passing an executor function to the `CancelToken` constructor:\n\n```js\nconst CancelToken = axios.CancelToken;\nlet cancel;\n\naxios.get('/user/12345', {\n  cancelToken: new CancelToken(function executor(c) {\n    // An executor function receives a cancel function as a parameter\n    cancel = c;\n  })\n});\n\n// cancel the request\ncancel();\n```\n\n> Note: you can cancel several requests with the same cancel token.\n\n## Using application/x-www-form-urlencoded format\n\nBy default, axios serializes JavaScript objects to `JSON`. To send data in the `application/x-www-form-urlencoded` format instead, you can use one of the following options.\n\n### Browser\n\nIn a browser, you can use the [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) API as follows:\n\n```js\nconst params = new URLSearchParams();\nparams.append('param1', 'value1');\nparams.append('param2', 'value2');\naxios.post('/foo', params);\n```\n\n> Note that `URLSearchParams` is not supported by all browsers (see [caniuse.com](http://www.caniuse.com/#feat=urlsearchparams)), but there is a [polyfill](https://github.com/WebReflection/url-search-params) available (make sure to polyfill the global environment).\n\nAlternatively, you can encode data using the [`qs`](https://github.com/ljharb/qs) library:\n\n```js\nconst qs = require('qs');\naxios.post('/foo', qs.stringify({ 'bar': 123 }));\n```\n\nOr in another way (ES6),\n\n```js\nimport qs from 'qs';\nconst data = { 'bar': 123 };\nconst options = {\n  method: 'POST',\n  headers: { 'content-type': 'application/x-www-form-urlencoded' },\n  data: qs.stringify(data),\n  url,\n};\naxios(options);\n```\n\n### Node.js\n\nIn node.js, you can use the [`querystring`](https://nodejs.org/api/querystring.html) module as follows:\n\n```js\nconst querystring = require('querystring');\naxios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));\n```\n\nYou can also use the [`qs`](https://github.com/ljharb/qs) library.\n\n###### NOTE\nThe `qs` library is preferable if you need to stringify nested objects, as the `querystring` method has known issues with that use case (https://github.com/nodejs/node-v0.x-archive/issues/1665).\n\n## Semver\n\nUntil axios reaches a `1.0` release, breaking changes will be released with a new minor version. For example `0.5.1`, and `0.5.4` will have the same API, but `0.6.0` will have breaking changes.\n\n## Promises\n\naxios depends on a native ES6 Promise implementation to be [supported](http://caniuse.com/promises).\nIf your environment doesn't support ES6 Promises, you can [polyfill](https://github.com/jakearchibald/es6-promise).\n\n## TypeScript\naxios includes [TypeScript](http://typescriptlang.org) definitions.\n```typescript\nimport axios from 'axios';\naxios.get('/user?ID=12345');\n```\n\n## Resources\n\n* [Changelog](https://github.com/axios/axios/blob/master/CHANGELOG.md)\n* [Upgrade Guide](https://github.com/axios/axios/blob/master/UPGRADE_GUIDE.md)\n* [Ecosystem](https://github.com/axios/axios/blob/master/ECOSYSTEM.md)\n* [Contributing Guide](https://github.com/axios/axios/blob/master/CONTRIBUTING.md)\n* [Code of Conduct](https://github.com/axios/axios/blob/master/CODE_OF_CONDUCT.md)\n\n## Credits\n\naxios is heavily inspired by the [$http service](https://docs.angularjs.org/api/ng/service/$http) provided in [Angular](https://angularjs.org/). Ultimately axios is an effort to provide a standalone `$http`-like service for use outside of Angular.\n\n## License\n\nMIT\n",
  "readmeFilename": "README.md",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/axios/axios.git"
  },
  "scripts": {
    "build": "NODE_ENV=production grunt build",
    "coveralls": "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
    "examples": "node ./examples/server.js",
    "fix": "eslint --fix lib/**/*.js",
    "postversion": "git push && git push --tags",
    "preversion": "npm test",
    "start": "node ./sandbox/server.js",
    "test": "grunt test && bundlesize",
    "version": "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"
  },
  "typings": "./index.d.ts",
  "version": "0.19.0"
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834635, function(require, module, exports) {


var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

}, function(modId) { var map = {"./../utils":1569248834620,"./../core/settle":1569248834631,"./../helpers/buildURL":1569248834623,"./../helpers/parseHeaders":1569248834636,"./../helpers/isURLSameOrigin":1569248834637,"../core/createError":1569248834632,"./../helpers/cookies":1569248834638}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834636, function(require, module, exports) {


var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

}, function(modId) { var map = {"./../utils":1569248834620}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834637, function(require, module, exports) {


var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

}, function(modId) { var map = {"./../utils":1569248834620}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834638, function(require, module, exports) {


var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

}, function(modId) { var map = {"./../utils":1569248834620}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834639, function(require, module, exports) {


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834640, function(require, module, exports) {


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834641, function(require, module, exports) {


var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

}, function(modId) { var map = {"../utils":1569248834620}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834642, function(require, module, exports) {


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834643, function(require, module, exports) {


var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

}, function(modId) { var map = {"./Cancel":1569248834642}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569248834644, function(require, module, exports) {


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1569248834618);
})()
//# sourceMappingURL=index.js.map