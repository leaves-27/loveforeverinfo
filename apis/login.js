import { apiPrifix } from '../../config/index';
import { request } from '../utils/util'

// 通过微信的临时code来登录我们的服务器
export const loginByWxTempCode = (code)=> new Promise( (resolve, reject)=>{
	request({
		url: `${apiPrifix}/login`,
		method: 'get',
		data: {
			code,
		},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success (res) {
			resolve(res.data)
		},
		fail(){
			reject(res.errMsg);
		},
	})
});

// 通过微信的临时code来登录我们的服务器
export const loginByPhone = (phone)=> new Promise( (resolve, reject)=>{
	request({
		url: `${apiPrifix}/login`,
		method: 'get',
		data: {
			phone,
		},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success (res) {
			resolve(res.data)
		},
		fail(){
			reject(res.errMsg);
		},
	})
});

export default loginByPhone;
