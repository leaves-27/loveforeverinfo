import {request} from "../utils/util";
import {apiPrefix, staticPrefix} from "../config/index";

export default ()=> new Promise( (resolve, reject)=>{
	request.request({
		isMock: false,
		isSuccess: false,
		url: `${apiPrefix}/order/getPayWays`,
		method: 'get',
		success: (res)=>{
			resolve(res);
			// resolve({
			// 	code: 1,
			// 	data: [{
			// 		id: '01',
			// 		iconUrl: `${staticPrefix}/wxpay.png`,
			// 		name: '微信支付'
			// 	}, {
			// 		id: '02',
			// 		iconUrl: `${staticPrefix}/offlinepay.png`,
			// 		name: '线下支付'
			// 	}]
			// })
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
