import Request from '../lib/Request';
// import { autoLogin } from "./util";

const request = new Request();
const count = 0; // 自动登录尝试请求的次数
const MAX_COUNT = 6; // 自动登录最大尝试请求次数
/**
 * 请求拦截器
 * */
request.beforeRequest = function({
	url = '',
	method,
	data,
	header,
	success,
	fail,
	isMock,
	isSuccess,
}, next){
	if (isMock){
		if (isSuccess){
			success({});
		} else {
			fail({});
		}
		return;
	}
	next();
};

request.afterRequest  = function (result, next){
	const { request, response } = result;
	const { code } = response;
	if(code === 'session_out'){ // 是token过期的话，自动登录重新获取授权
		// autoLogin().then(({ token })=>{
		// 	wx.setStorageSync('token', token);
		// 	if (count < MAX_COUNT){
		// 		this.request(request);
		// 	}
		// });
	} else if(code === '1'){
		next();
	}
};

export default request;

