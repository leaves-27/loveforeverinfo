// 通过微信的临时code来登录我们的服务器
import {request} from "../../utils/util";
import {apiPrifix} from "../../config/index";

export default (phone)=> new Promise( (resolve, reject)=>{
	request.request({
		isMock: false,
		isSuccess: true,
		url: `${apiPrifix}/account/validationCode`,
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
			console.log('=========res:', res);
			resolve(res.data)
			// resolve({
			// 	code: 1,
			// 	data: {}
			// })
		},
		fail(res){
			console.log('=======failure:');
			reject(res);
		},
	})
});
