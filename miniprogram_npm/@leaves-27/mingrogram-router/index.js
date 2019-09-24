module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1569332279480, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = class Router {
	constructor(routes){
		this.routes = routes;
	}
	beforeCreate(url, next){
		next();
	}

	afterCreate(next){
		next();
	}

	switchTab({ url, success = ()=>{} }){
		this.beforeCreate(url, ()=>{
			wx.switchTab({
				url,
				success:()=>{
					this.afterCreate(success);
				}
			});
		});
	}

	redirectTo({ url, success = ()=>{} }){
		this.beforeCreate(url, ()=>{
			wx.redirectTo({
				url,
				success:()=>{
					this.afterCreate(success);
				}
			});
		});
	}

	navigateTo({ url, success = ()=>{} }){
		this.beforeCreate(url, ()=>{
			wx.navigateTo({
				url,
				success:()=>{
					this.afterCreate(success);
				}
			});
		});
	}
};;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1569332279480);
})()
//# sourceMappingURL=index.js.map