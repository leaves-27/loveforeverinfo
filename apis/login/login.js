import { apiPrifix } from '../../config/index';
import { request } from '../../utils/util';
import UserRole from "../../utils/userRole";

// 通过微信的临时code来登录我们的服务器
export const loginByWxTempCode = (code)=> new Promise( (resolve, reject)=>{
	request.request({
		isMock: true,
		isSuccess: true,
		url: `${apiPrifix}/login`,
		method: 'get',
		data: {
			jsCode: code
		},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success (res) {
			// resolve(res.data)
			// 拿不到角色，说明没有绑定手机号。去绑定手机号
			const arr = [{
				"token": "ae111",
				"uid": "1006",
				"phone":"15800001111",
				"type": "消费者"
			},
				{
					"token": "ae222",
					"uid": "1007",
					"phone":"15857106968",
					"type": "专家"
				},
				{
					"token": "ae333",
					"uid": "1008",
					"phone":"15800001113",
					"type": "专员"
				},
				{
					"token": "ae444",
					"uid": "1009",
					"phone":"15800001114",
					"type": "递送员"
				}, {
					"token": '',
					"type": ""
				}];
			const role = wx.getStorageSync('userRole');
			let data;
			if (role === UserRole['medical']){ // 医药代表
				data = arr[2]
			} else if(role === UserRole['doctor']){ // 医生
				data = arr[1];
			} else if(role === UserRole['customer']){ // 消费者
				data = arr[0];
			} else {
				data = arr[4];
			}
			resolve({
				code: 1,
				data: data
			});
		},
		fail(){
			reject(res.errMsg);
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
			// resolve(res);

			const arr = [{
				"token": "ae111",
				"uid": "1006",
				"phone":"15800001111",
				"type": "消费者"
			},
			{
				"token": "ae222",
				"uid": "1007",
				"phone":"15857106968",
				"type": "专家"
			},
			{
				"token": "ae333",
				"uid": "1008",
				"phone":"15800001113",
				"type": "专员"
			},
			{
				"token": "ae444",
				"uid": "1009",
				"phone":"15800001114",
				"type": "递送员"
			}];
			let data;
			if (phone === "18857152332"){ //医药代表
				data = arr[2]
			} else if(phone === "18857152331"){ // 医生
				data = arr[1];
			} else{
				data = arr[0];
			}
			resolve({
				code: 1,
				data: data
			})
		},
		fail(res){
			console.log('=======failure:');
			reject(res);
		},
	})
});

export default loginByPhone;
