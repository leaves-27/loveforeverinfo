import request from "../../request";
import { apiPrefix } from "../../config/index";

export default (id, toQueryWxOrder = false)=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrefix}/order/getOrderDetail`,
		method: 'post',
		data: {
			orderId: id,
			toQueryWxOrder
		},
		success: (res)=>{
			resolve(res);
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
