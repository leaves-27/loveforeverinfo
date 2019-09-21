import {request} from "../../utils/util";
import { apiPrifix } from "../../config/index";

// 取消订单又分为医药代表取消订单和消费者取消订单
export default (id)=>{
	return new Promise((resolve, reject)=>{
		request.request({
			// isMock: true,
			// isSuccess: true,
			url: `${apiPrifix}/order/cancelOrder`,
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
