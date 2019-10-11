import request from "../../request";
import {apiPrefix} from "../../config/index";

export default ({
  id
})=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: false,
		url: `${apiPrefix}/delivery/deladdress`,
		method: 'post',
		data: {
			addressId: id
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
