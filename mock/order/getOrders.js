import { apiPrefix } from "../../config/index";
import request from "../../request";

// 这里根据传给服务端的用户token返回对应的的订单列表。可选的有消费者订单列表、专员订单列表
export default (status = '' )=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrefix}/order/getOrders`,
		method: 'post',
		data: {
			status
		},
		success: (res)=>{
			resolve(res);
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
