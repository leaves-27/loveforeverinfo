import {request} from "../../utils/util";
import { apiPrifix } from "../../config/index";

export default (id)=>{
	return new Promise(async (resolve, reject)=>{
		request.request({
			// isMock: true,
			// isSuccess: true,
			url: `${apiPrifix}/applet/order/confirmOrder`,
			data: {
				id
			},
			success: (res)=>{
				resolve(res);
				// resolve({
				// 	code: 1,
				// 	data: {}
				// });
			},
			fail: (error)=>{
				reject(error);
			}
		});
	})
}
