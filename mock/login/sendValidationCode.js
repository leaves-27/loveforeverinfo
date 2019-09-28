import request from "../../request";
import {apiPrefix} from "../../config/index";

export default (phone)=> new Promise( (resolve, reject)=>{
	request.request({
		isMock: false,
		isSuccess: true,
		url: `${apiPrefix}/account/sendValidationCode`,
		// url: 'http://fapi.oneshell.cn/loveforever/applet/account/getUserRole',
		method: 'post',
		data: {
			phone,
		},
		// data: query,
		header: {
			'content-type': 'application/json' // 默认值
		},
		success (res) {
			resolve(res.data)
			// resolve({
			// 	code: 1,
			// 	data: {}
			// })
		},
		fail(res){
			reject(res);
		},
	})
});
