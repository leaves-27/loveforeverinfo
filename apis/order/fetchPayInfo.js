import request from "../../request";
import { apiPrefix } from "../../config/index";

export default ({ orderId = '' })=> new Promise( (resolve, reject)=>{
	request.request({
		// isMock: true,
		// isSuccess: true,
		url: `${apiPrefix}/pay/prepare`,
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
