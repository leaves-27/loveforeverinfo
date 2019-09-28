import request from "../../request";
import {apiPrefix} from "../../config/index";

export const postUserInfo = (userInfo)=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrefix}/account/authuserinfo`,
		method: 'post',
		data: {
			...userInfo
		},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success (res) {
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
