import {request} from "../../utils/util";
import {apiPrifix} from "../../config/index";

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
		url: `${apiPrifix}/delivery/setaddress`,
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
