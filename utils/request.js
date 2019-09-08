import Request from '../lib/Request';
import { getCurrentRoute } from './wx';
import router from './router';

const request = new Request();
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

request.afterRequest  = function ({ code = 0, data = {} }, next){
	if(code === 'token_expire'){ // 是token过期的话，跳转到登录页面
		const { route = '' } = getCurrentRoute();
		const query = {
			url: `/${route}`
		};
		router.navigateTo({
			url: `pages/login/login?$${qs.stringify(query, {encode: false })}`
		});
	} else if (code * 1 === 1) {
		next();
	}
};

export default request;

