import request from "../../request";
import { apiPrefix } from "../../config/index";

export default (id)=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrefix}/order/getOrderDetail`,
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
});
