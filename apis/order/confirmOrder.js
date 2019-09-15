import {request} from "../../utils/util";
import { apiPrifix } from "../../config/index";

export default ({
	goodId,
	deliveryWayId,
	payWayId,
	receiveAddressId,
	count,
	memo
})=>{
	return new Promise((resolve, reject)=>{
		request.request({
			// isMock: true,
			// isSuccess: true,
			url: `${apiPrifix}/order/confirmOrder`,
			data: {
				goodId,
				deliveryWayId,
				payWayId,
				receiveAddressId,
				count,
				memo
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
