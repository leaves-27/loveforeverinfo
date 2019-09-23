import request from "../../request";
import { apiPrefix } from "../../config/index";

export default (id)=>{
	return new Promise((resolve, reject)=>{
		request.request({
			// isMock: true,
			// isSuccess: true,
			url: `${apiPrefix}/account/getConsumers`,
			method: 'post',
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
