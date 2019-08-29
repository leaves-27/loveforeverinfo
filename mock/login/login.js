import { apiPrifix } from '../../config/index';
import { request } from '../../utils/util'

// 通过微信的临时code来登录我们的服务器
export const loginByWxTempCode = (code, validationCode)=> new Promise( (resolve, reject)=>{
	request({
		url: `${apiPrifix}/login`,
		method: 'get',
		data: {
			code,
			validationCode
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
export const loginByPhone = (phone, validationCode)=> new Promise( (resolve, reject)=>{
	request({
		url: `${apiPrifix}/login`,
		method: 'get',
		data: {
			phone,
			validationCode
		},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success (res) {
			// resolve(res.data)
			const type = phone === "18857152332" ? 1 : 2;
			resolve({
				code: 1,
				data: {
					token: `xxxxxxx_${phone}_xxxxxxx`,
					type,
					phone
				}
			})
		},
		fail(){
			reject(res.errMsg);
		},
	})
});

export default loginByPhone;
