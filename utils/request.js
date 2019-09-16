import Request from '../lib/Request';
import { redirect } from "./route/index";
import router from './router';

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
	if(code === 'session_out'){ // 是token过期的话，跳转到授权登录页重新授权登录
		router.navigateTo({
			url: redirect
		})
	} else {
		next();
	}
};

export default request;

