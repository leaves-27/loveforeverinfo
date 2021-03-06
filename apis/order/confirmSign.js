import { apiPrefix } from "../../config/index";
import request from "../../request";

export default ({
  orderId
})=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrefix}/order/receiveconfirmOrder`,
		method: 'post',
		data: {
			orderId
		},
		success: (res)=>{
			resolve(res);
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
