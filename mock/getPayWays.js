import {request} from "../utils/util";
import {apiPrifix} from "../config/index";

export default ()=> new Promise( (resolve, reject)=>{
	request({
		isMock: true,
		url: `${apiPrifix}/getPayWays`,
		method: 'get',
		success: (res)=>{
			// resolve(res);
			resolve({
				code: 1,
				data: [{
					id: '01',
					name: "微信支付",
				}, {
					id: '02',
					name: "线下支付",
				}]
			})
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
