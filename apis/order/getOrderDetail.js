import {request} from "../../utils/util";
import { apiPrifix } from "../../config/index";

export default (id)=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrifix}/order/getOrderDetail`,
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
