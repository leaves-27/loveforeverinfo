import Request from '@leaves-27/mingrogram-request';
import Routes from "./routes/index";
import router from './router';
import { getCurrentRoute } from './utils/util';
import {getQuery} from "@leaves-27/miniprogram";

const request = new Request();
// const count = 0; // 自动登录尝试请求的次数
// const MAX_COUNT = 6; // 自动登录最大尝试请求次数
/**
 * 请求拦截器
 * */
request.beforeRequest = function({
	url = '',
	method,
	data,
	header,
	isMock,
	isSuccess,
  success,
  fail
}, next){
	const token = wx.getStorageSync('token');
	const params = {
		url,
		method,
		data,
		header: {
			'content-type': 'application/json',
			'token': token,
			...header
		},
	};

	if (isMock){
		if (isSuccess){
			success({});
		} else {
			fail({});
		}
		return;
	}
	next(params);
};

request.afterRequest  = function (result, next){
	const { request, response, errMsg = '' } = result;

	if(!!errMsg){ // 请求失败
		// 若请求超时，则给用户提示让其稍后再试
		if (errMsg === 'request:fail timeout'){
			wx.showToast({
				icon:'none',
				title: '响应超时，请重新操作'
			});
			return;
		}
	} else { // 请求成功
		const { data } = response;
		const { code, statusCode } = data;
		// 若token过期，则跳转到授权登录页重新授权登录
		if(code === 'session_out'){
			const count = wx.getStorageSync('tokenCount') || 1;
			if(count * 1 === 6){
				wx.setStorageSync('tokenCount', 0);
				return;
			}
			wx.setStorageSync('token', '');
			wx.setStorageSync('userRole', '');
			wx.setStorageSync('tokenCount', count + 1);
			const { redirect } = Routes;
			// const { route = '' } = getCurrentRoute();
			// const query = getQuery();
			// const url = `/${route}?${qs.stringify(query, { encode: true })}`;
			// router.navigateTo({
			// 	url: `${redirect}?url=${url}`
			// });

			router.navigateTo({
				url: `${redirect}`
			});
			return;
		}
	}

	next();
};

export default request;

