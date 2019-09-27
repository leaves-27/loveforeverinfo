import request from "../../request";
import { apiPrefix } from "../../config/index";

// 取消订单又分为专员取消订单和消费者取消订单
export default (id)=>{
	return new Promise((resolve, reject)=>{
		request.request({
			// isMock: true,
			// isSuccess: true,
			url: `${apiPrefix}/order/cancelOrder`,
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
