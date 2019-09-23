import request from "../../request";
import {apiPrefix} from "../../config/index";

export default ({
  name = '',
  phone = '',
	address = {
		province: '',
		city: '',
		area: '',
		desc: ''
	}
})=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: false,
		url: `${apiPrefix}/delivery/setaddress`,
		method: 'post',
		data: {
			name,
			phone,
			address
		},
		success: (res)=>{
			resolve(res);
			// resolve({
			// 	code: 1,
			// 	data: {
			// 		id: ''
			// 	}
			// })
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
