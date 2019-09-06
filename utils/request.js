import Request from '../lib/Request';
import { getCurrentRoute } from './wx';

const request = new Request();
/**
 * 请求拦截器
 * */
request.beforeRequest = ({
	url = '',
	method,
	data,
	header,
	success = ()=>{},
	fail = ()=>{},
	isMock = false,
	isSuccess = true
}, next) => {
	if (isMock){
		setTimeout(()=>{
			if (isSuccess){
				success({});
			} else {
				fail({});
			}
		}, 1000);
		return;
	}
	next();
};

request.afterRequest = ({ code = 0, data = {} }, next) => {
	if(code === 'token_expire'){ // 是token过期的话，跳转到登录页面
		const { route = '' } = getCurrentRoute();
		const query = {
			url: `/${route}`
		};
		wx.navigateTo({
			url: `pages/login/login?$${qs.stringify(query, {encode: false })}`
		});
	} else if (code * 1 === 1) {
		next();
	}
};

