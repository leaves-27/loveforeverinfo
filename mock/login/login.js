import { apiPrifix } from '../../config/index';
import { request } from '../../utils/util';

// 通过微信的临时code来登录我们的服务器
export const loginByWxTempCode = (code, validationCode)=> new Promise( (resolve, reject)=>{
	request.request({
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
			// resolve(res.data)
			// const type = phone === "18857152332" ? 1 : 2;
			resolve({
				code: 1,
				data: {
					token: `xxxxxxxxxxxxxx`,
					type:'',
					phone:''
				}
			})
		},
		fail(){
			reject(res.errMsg);
		},
		isMock: true
	})
});

// 通过微信的临时code来登录我们的服务器
export const loginByPhone = (phone, validationCode)=> new Promise( (resolve, reject)=>{
	const query = {"uid":"1", "token":"xxtoken", "phone":"15558011663"};

	request.request({
		isMock: false,
		isSuccess: true,
		url: `${apiPrifix}/account/phonelogin`,
		// url: 'http://fapi.oneshell.cn/loveforever/applet/account/getUserRole',
		method: 'post',
		data: {
			phone,
			code: validationCode
		},
		// data: query,
		header: {
			'content-type': 'application/json' // 默认值
		},
		success (res) {
			resolve(res);
			// let type;
			// if (phone === "18857152332"){ //医药代表
			// 		type = 3
			// } else if(phone === "18857152331"){ // 医生
			// 		type = 2;
			// } else{
			// 	  type = 1;
			// }
			//
			// resolve({
			// 	code: 1,
			// 	data: {
			// 		token: `xxxxxxx_${phone}_xxxxxxx`,
			// 		type,
			// 		phone
			// 	}
			// })
		},
		fail(res){
			console.log('=======failure:');
			reject(res);
		},
	})
});

export default loginByPhone;
