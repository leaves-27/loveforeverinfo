import { apiPrifix } from '../../config/index';
import { request } from '../../utils/util';

const getMock = (phone)=>{
	const arr = [{
		"token": "ae111",
		"uid": "1006",
		"phone":"15800001111",
		"type": "consumer"
	},
	{
		"token": "ae222",
		"uid": "1007",
		"phone":"15857106968",
		"type": "specialist"
	},
	{
		"token": "ae333",
		"uid": "1008",
		"phone":"15800001113",
		"type": "comissioner"
	},
	{
		"token": "ae444",
		"uid": "1009",
		"phone":"15800001114",
		"type": "deliverer"
	}];
	const code = 1;

	if (phone === "18857152332"){ //医药代表
		return {
			code,
			data: arr[2]
		};
	} else if(phone === "18857152331"){ // 医生
		return {
			code,
			data: arr[1]
		};
	} else {
		return {
			code,
			data: arr[0]
		};
	}
};
// 通过微信的临时code来登录我们的服务器
export const loginByWxTempCode = (code, userInfo)=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrifix}/account/isLogin`,
		method: 'get',
		data: {
			jsCode: code,
			...userInfo
		},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success (res) {
			resolve(res);
			// 拿不到角色，说明没有绑定手机号。去绑定手机号
			// resolve(getMock(phone));
		},
		fail(error){
			reject(error);
		}
	});
});

// 通过微信的临时code来登录我们的服务器
export const loginByPhone = (phone, validationCode)=> new Promise( (resolve, reject)=>{
	const query = {"uid":"1", "token":"xxtoken", "phone":"15558011663"};
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrifix}/account/phonelogin`,
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
			// resolve(res);
			resolve(getMock(phone));
		},
		fail(error){
			console.log('=======failure:');
			reject(error);
		},
	})
});

export default loginByPhone;
