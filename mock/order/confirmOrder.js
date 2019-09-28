import request from "../../request";
import { apiPrefix } from "../../config/index";

export default ({
	id
})=>{
	return new Promise((resolve, reject)=>{
		request.request({
			// isMock: true,
			// isSuccess: true,
			url: `${apiPrefix}/order/confirmOrder`,
			method: 'post',
			data: {
				orderId: id
			},
			success: (res)=>{
				resolve(res);
			},
			fail: (error)=>{
				reject(error);
			}
		});
	})
}
