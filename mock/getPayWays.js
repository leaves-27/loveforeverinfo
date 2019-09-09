import {request} from "../utils/util";
import {apiPrifix, staticPrifix} from "../config/index";

export default ()=> new Promise( (resolve, reject)=>{
	request.request({
		isMock: false,
		isSuccess: false,
		url: `${apiPrifix}/order/getPayWays`,
		method: 'get',
		success: (res)=>{
			resolve(res);
			// resolve({
			// 	code: 1,
			// 	data: [{
			// 		id: '01',
			// 		iconUrl: `${staticPrifix}/wxpay.png`,
			// 		name: '微信支付'
			// 	}, {
			// 		id: '02',
			// 		iconUrl: `${staticPrifix}/offlinepay.png`,
			// 		name: '线下支付'
			// 	}]
			// })
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
