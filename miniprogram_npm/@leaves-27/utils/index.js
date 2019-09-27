module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1569596793614, function(require, module, exports) {
var __TEMP__ = require('qs');var qs = __REQUIRE_DEFAULT__(__TEMP__);

/**
 * 生成键值对渲染数据列表。类似:[{ key: '手机号', value: '13854152631' }]
 * */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var getKvs = exports.getKvs = (ORDER = {}, order = {}) => {
	const kvs = [];
	Object.keys(ORDER).forEach((item)=>{
		let value = '';
		if(item.indexOf('_') > -1){
			const keys = item.split('_');
			value = order[keys[0]][keys[1]];
		} else {
			value = order[item];
		};

		if(value !== undefined){
			kvs.push({
				key: ORDER[item],
				value
			});
		}
	});

	return kvs;
};

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var getUrlQuery = exports.getUrlQuery = (url) => {
	if (url.indexOf('?') > -1) {
		const urls = url.split('?');
		return qs.parse(urls[1]);
	}
	return {};
};

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = {
	getKvs,
	getUrlQuery
};
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1569596793614);
})()
//# sourceMappingURL=index.js.map