import { apiPrefix } from '../../config/index';
import request from "../../request";

// const getMock = (phone)=>{
// 	const arr = [{
// 		"token": "ae111",
// 		"uid": "1006",
// 		"phone":"15800001111",
// 		"role": "consumer"
// 	},
// 	{
// 		"token": "ae222",
// 		"uid": "1007",
// 		"phone":"15857106968",
// 		"role": "specialist"
// 	},
// 	{
// 		"token": "ae333",
// 		"uid": "1008",
// 		"phone":"15800001113",
// 		"role": "comissioner"
// 	},
// 	{
// 		"token": "ae444",
// 		"uid": "1009",
// 		"phone":"15800001114",
// 		"role": "deliverer"
// 	}];
// 	const code = 1;
//
// 	if (phone === "18857152332"){ //专员
// 		return {
// 			code,
// 			data: arr[2]
// 		};
// 	} else if(phone === "18857152331"){ // 专家
// 		return {
// 			code,
// 			data: arr[1]
// 		};
// 	} else {
// 		return {
// 			code,
// 			data: arr[0]
// 		};
// 	}
// };

// 通过微信的临时code来登录我们的服务器
export const loginByWxTempCode = (code, inviteCode, role)=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrefix}/account/isLogin`,
		method: 'post',
		data: {
			jsCode: code,
			inviteCode,
			asRole: role,
		},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success (res) { //
			resolve(res);
			// 拿不到角色，说明没有绑定手机号。去绑定手机号
			// resolve(getMock("18857152338"));
		},
		fail(error){
			console.log('test:', error);
			reject(error);
		}
	});
});

// 通过微信的临时code来登录我们的服务器
export const loginByPhone = (phone, validationCode, role)=> new Promise( (resolve, reject)=>{
	const query = {"uid":"1", "token":"xxtoken", "phone":"15558011663"};
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrefix}/account/phonelogin`,
		method: 'post',
		data: {
			phone,
			role,
			code: validationCode,
		},
		// data: query,
		header: {
			'content-type': 'application/json' // 默认值
		},
		success (res) {
			// resolve(res);
			resolve(getMock(phone));
		},
		fail(error){
			reject(error);
		},
	})
});

export default loginByPhone;
