import {request} from "../../utils/util";
import { apiPrefix } from "../../config/index";

export default ({
	id
})=>{
	return new Promise((resolve, reject)=>{
		request.request({
			// isMock: true,
			// isSuccess: true,
			url: `${apiPrefix}/order/confirmOrder`,
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
