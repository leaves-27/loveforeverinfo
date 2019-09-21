import {request} from "../../utils/util";
import { apiPrifix } from "../../config/index";

export default ({
	id
})=>{
	return new Promise((resolve, reject)=>{
		request.request({
			// isMock: true,
			// isSuccess: true,
			url: `${apiPrifix}/order/confirmOrder`,
			data: {
				orderId: id
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
